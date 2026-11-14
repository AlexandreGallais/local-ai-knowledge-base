---
title: "CharacterBoundsUpdateEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterboundsupdateevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterBoundsUpdateEvent

The **`CharacterBoundsUpdateEvent`** interface is a DOM event that represents a request from the operating system to know the bounds of certain characters within an editable region that's attached to an `EditContext` instance.

This interface inherits properties from `Event`.

## Constructor

- `CharacterBoundsUpdateEvent()` (experimental)
    Creates a new `CharacterBoundsUpdateEvent` object.

## Instance properties

- `CharacterBoundsUpdateEvent.rangeStart` (read-only) (experimental)
    The offset of the first character within the editable region text for which the operating system needs the bounds.
- `CharacterBoundsUpdateEvent.rangeEnd` (read-only) (experimental)
    The offset of the last character within the editable region text for which the operating system needs the bounds.

## Examples

### Updating the character bounds when needed

This example shows how to use the `characterboundsupdate` event and the `updateCharacterBounds` method to inform the operating system of the character bounds it requires. Note that the event listener callback is only called when using an IME window, or other platform-specific editing UI surfaces, to compose text.

```html
<canvas id="editor-canvas"></canvas>
```

```js
const FONT_SIZE = 40;
const FONT = `${FONT_SIZE}px Arial`;

const canvas = document.getElementById("editor-canvas");
const ctx = canvas.getContext("2d");
ctx.font = FONT;

const editContext = new EditContext();
canvas.editContext = editContext;

function computeCharacterBound(offset) {
  // Measure the width from the start of the text to the character.
  const widthBeforeChar = ctx.measureText(
    editContext.text.substring(0, offset),
  ).width;

  // Measure the character width.
  const charWidth = ctx.measureText(editContext.text[offset]).width;

  const charX = canvas.offsetLeft + widthBeforeChar;
  const charY = canvas.offsetTop;

  // Return a DOMRect representing the character bounds.
  return DOMRect.fromRect({
    x: charX,
    y: charY - FONT_SIZE,
    width: charWidth,
    height: FONT_SIZE,
  });
}

editContext.addEventListener("characterboundsupdate", (e) => {
  const charBounds = [];
  for (let offset = e.rangeStart; offset < e.rangeEnd; offset++) {
    charBounds.push(computeCharacterBound(offset));
  }

  // Update the character bounds in the EditContext instance.
  editContext.updateCharacterBounds(e.rangeStart, charBounds);

  console.log(
    "The required character bounds are",
    charBounds
      .map(
        (bound) =>
          `(x: ${bound.x}, y: ${bound.y}, width: ${bound.width}, height: ${bound.height})`,
      )
      .join(", "),
  );
});
```
