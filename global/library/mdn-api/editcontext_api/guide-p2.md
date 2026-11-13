---
title: "Using the EditContext API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext_api/guide/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the EditContext API (part 2 of 2)

## Updating the selection state and selection bounds

As we saw earlier, the `render()` function handles rendering the current user selection in the editor element. But the demo app also needs to _update_ the selection state and bounds when the user changes the selection. The EditContext API doesn't do this automatically, again because the editor UI might be implemented in a different way, such as by using a `<canvas>` element.

To know when the user changes the selection, the demo app uses the `selectionchange` event and the `Document.getSelection()` method, which provide a `Selection` object, telling us where the user's selection is. Using this information the demo app updates the EditContext selection state and selection bounds by using the `EditContext.updateSelection()` and `EditContext.updateSelectionBounds()` methods. This is used by the OS to position the IME composition window correctly.

However, because the EditContext API uses character offsets to represent the selection, the demo app also uses a function, `fromSelectionToOffsets()` that converts DOM selection objects to character offsets.

```js
// Listen to selectionchange events to let the
// EditContext know where it is.
document.addEventListener("selectionchange", () => {
  const selection = document.getSelection();

  // Convert the DOM selection into character offsets.
  const offsets = fromSelectionToOffsets(selection, editorEl);
  if (offsets) {
    updateSelection(offsets.start, offsets.end);
  }
});

// Update the selection and selection bounds in the EditContext object.
// This helps the OS position the IME composition window correctly.
function updateSelection(start, end) {
  editContext.updateSelection(start, end);
  // Get the bounds of the selection.
  editContext.updateSelectionBounds(
    document.getSelection().getRangeAt(0).getBoundingClientRect(),
  );
}
```

You can see the code for the `fromSelectionToOffsets()` function in the converter.js file.

## Calculating character bounds

On top of using the `EditContext.updateControlBounds()` and `EditContext.updateSelectionBounds()` methods to help the OS position a text editing UI that the user might be using, there's one more bit of information that the OS requires: the position and size of certain characters within the editor element.

To do this, the demo app listens to the `characterboundsupdate` event, uses it to calculate the bounds of some of the characters in the editor element, and then uses the `EditContext.updateCharacterBounds()` method to update the character bounds.

As seen before, the EditContext API only knows about character offsets, which means that the `characterboundsupdate` event provides the start and end offsets for the characters it needs bounds for. The demo app uses another function, `fromOffsetsToRenderedTokenNodes()`, to find the DOM elements that these characters have been rendered in, and uses this information to calculate the required bounds.

```js
// Listen to the characterboundsupdate event to know when character bounds
// information is needed, and which characters need bounds.
editContext.addEventListener("characterboundsupdate", (e) => {
  // Retrieve information about the token nodes in the range.
  const tokenNodes = fromOffsetsToRenderedTokenNodes(
    currentTokens,
    e.rangeStart,
    e.rangeEnd,
  );

  // Convert this information into a list of DOMRect objects.
  const charBounds = tokenNodes.map(({ node, nodeOffset, charOffset }) => {
    const range = document.createRange();
    range.setStart(node.firstChild, charOffset - nodeOffset);
    range.setEnd(node.firstChild, charOffset - nodeOffset + 1);
    return range.getBoundingClientRect();
  });

  // Let the EditContext instance know about the character bounds.
  editContext.updateCharacterBounds(e.rangeStart, charBounds);
});
```

You can see the code for the `fromOffsetsToRenderedTokenNodes()` function in the converter.js file.

## Applying IME composition text formats

The demo app goes through a final step to fully support IME composition. When the user is composing text with an IME, the IME might decide that certain parts of the text being composed should be formatted differently to indicate the composition state. For example, the IME might decide to underline the text.

Because it's the demo app's responsibility to render the content in the editable text region, it's also its responsibility to apply the necessary IME formatting. The demo app achieves this by listening to the `textformatupdate` event to know when the IME wants to apply text formats, where, and what formats to apply.

As shown in the following code snippet, the demo app uses the `textformatupdate` event and the `fromOffsetsToSelection()` function again to find the text range that the IME composition wants to format:

```js
editContext.addEventListener("textformatupdate", (e) => {
  // Get the list of formats that the IME wants to apply.
  const formats = e.getTextFormats();

  for (const format of formats) {
    // Find the DOM selection that corresponds to the format's range.
    const selection = fromOffsetsToSelection(
      format.rangeStart,
      format.rangeEnd,
      editorEl,
    );

    // Highlight the selection with the right style and thickness.
    addHighlight(selection, format.underlineStyle, format.underlineThickness);
  }
});
```

The above event handler calls the function named `addHighlight()` to format text. This function uses the CSS Custom Highlight API to render the text formats. The CSS Custom Highlight API provides a mechanism for styling arbitrary text ranges by using JavaScript to create the ranges, and CSS to style them. To use this API, the `::highlight()` pseudo-element is used to define the highlight styles:

```css
::highlight(ime-solid-thin) {
  text-decoration: underline 1px;
}

::highlight(ime-solid-thick) {
  text-decoration: underline 2px;
}

::highlight(ime-dotted-thin) {
  text-decoration: underline dotted 1px;
}

::highlight(ime-dotted-thick) {
  text-decoration: underline dotted 2px;
}

/* Other highlights are omitted for brevity. */
```

`Highlight` instances are also created, stored in an object, and registered in the `HighlightRegistry` by using the `CSS.highlights` property:

```js
// Instances of CSS custom Highlight objects, used to render
// the IME composition text formats.
const imeHighlights = {
  "solid-thin": null,
  "solid-thick": null,
  "dotted-thin": null,
  "dotted-thick": null,
  "dashed-thin": null,
  "dashed-thick": null,
  "wavy-thin": null,
  "wavy-thick": null,
  "squiggle-thin": null,
  "squiggle-thick": null,
};
for (const [key, value] of Object.entries(imeHighlights)) {
  imeHighlights[key] = new Highlight();
  CSS.highlights.set(`ime-${key}`, imeHighlights[key]);
}
```

With this in place, the `addHighlight()` function uses `Range` objects for the ranges that need to be styled, and adds them to the `Highlight` object:

```js
function addHighlight(selection, underlineStyle, underlineThickness) {
  // Get the right CSS custom Highlight object depending on the
  // underline style and thickness.
  const highlight =
    imeHighlights[
      `${underlineStyle.toLowerCase()}-${underlineThickness.toLowerCase()}`
    ];

  if (highlight) {
    // Add a range to the Highlight object.
    const range = document.createRange();
    range.setStart(selection.anchorNode, selection.anchorOffset);
    range.setEnd(selection.extentNode, selection.extentOffset);
    highlight.add(range);
  }
}
```

## Summary

This article showed you how to use the EditContext API to build a simple HTML code editor that supports IME composition and syntax highlighting.

The final code and live demo can be found on GitHub: live demo and source code.

More importantly, this article showed you that the EditContext API provides a lot of flexibility when it comes to the user interface of your editor. Based on this demo, you could build a similar text editor that uses a `<canvas>` element to render the syntax-highlighted HTML code instead of the `` that the demo uses. You could also change how each token is rendered, or how the selection is rendered.

## See also

- EditContext API
- CSS Custom Highlight API
