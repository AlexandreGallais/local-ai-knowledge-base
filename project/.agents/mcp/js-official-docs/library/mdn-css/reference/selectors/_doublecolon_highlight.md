---
title: "`::highlight()` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_highlight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::highlight()` CSS pseudo-element

The **`::highlight()`** CSS pseudo-element applies styles to a custom highlight.

A custom highlight is a collection of `AbstractRange` objects and is registered on a webpage using the `HighlightRegistry`.

The `::highlight()` pseudo-element follows a special inheritance model common to all highlight pseudo-elements. For more details on how this inheritance works, see the Highlight pseudo-elements inheritance section.

## Allowable properties

Only certain CSS properties can be used with `::highlight()`:

- `color`
- `background-color`
- `text-decoration` and its associated properties
- `text-shadow`
- `-webkit-text-stroke-color`, `-webkit-text-fill-color` and `-webkit-text-stroke-width`

In particular, `background-image` is ignored.

## Syntax

```css
::highlight(custom-highlight-name)
```

## Examples

### Highlighting characters

#### HTML

```html
<p id="rainbow-text">CSS Custom Highlight API rainbow</p>
```

#### CSS

```css
#rainbow-text {
  font-family: monospace;
  font-size: 1.5rem;
}

::highlight(rainbow-color-1) {
  color: violet;
  text-decoration: underline;
}
::highlight(rainbow-color-2) {
  color: purple;
  text-decoration: underline;
}
::highlight(rainbow-color-3) {
  color: blue;
  text-decoration: underline;
}
::highlight(rainbow-color-4) {
  color: green;
  text-decoration: underline;
}
::highlight(rainbow-color-5) {
  color: yellow;
  text-decoration: underline;
}
::highlight(rainbow-color-6) {
  color: orange;
  text-decoration: underline;
}
::highlight(rainbow-color-7) {
  color: red;
  text-decoration: underline;
}
```

#### JavaScript

```js
const textNode = document.getElementById("rainbow-text").firstChild;

if (!CSS.highlights) {
  textNode.textContent =
    "The CSS Custom Highlight API is not supported in this browser!";
}

// Create and register highlights for each color in the rainbow.
const highlights = [];
for (let i = 0; i < 7; i++) {
  // Create a new highlight for this color.
  const colorHighlight = new Highlight();
  highlights.push(colorHighlight);

  // Register this highlight under a custom name.
  CSS.highlights.set(`rainbow-color-${i + 1}`, colorHighlight);
}

// Iterate over the text, character by character.
for (let i = 0; i < textNode.textContent.length; i++) {
  // Create a new range just for this character.
  const range = new Range();
  range.setStart(textNode, i);
  range.setEnd(textNode, i + 1);

  // Add the range to the next available highlight,
  // looping back to the first one once we've reached the 7th.
  highlights[i % 7].add(range);
}
```

#### Result

## See also

- CSS custom highlight API module
- CSS custom highlight API
- CSS pseudo-elements module
