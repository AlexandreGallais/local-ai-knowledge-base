---
title: "`:-moz-drag-over` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-drag-over/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-drag-over` CSS pseudo-class

The **`:-moz-drag-over`** CSS pseudo-class is a Mozilla extension that matches an element when a `dragover` event is called on it.

## Syntax

```css
:-moz-drag-over {
  /* ... */
}
```

## Examples

### HTML

```html
<div id="drop-target">
  <p>Drop target</p>
</div>

<div draggable="true">
  <p>Draggable</p>
</div>
```

### CSS

```css
body {
  font-family: "Arial";
}
div {
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 2px dotted black;
  background-color: aquamarine;
  margin: 1rem;
}
p {
  padding: 1rem;
}
```

The following CSS changes the drop target color to red when the draggable element overlays the drop area.

```css
#drop-target {
  background-color: cornflowerblue;
}
#drop-target:-moz-drag-over {
  background-color: red;
}
```

### JavaScript

Most elements are not valid places to drop data, so in order to allow a drop, you must prevent default behavior by canceling `dragenter` or `dragover` (or both) events.
In this example, we only need to cancel the `dragenter` event, which is the first event fired when the browser evaluates if an element can be a drop target.
For more information, see Drag operations: Specifying drop targets.

```js
const target = document.getElementById("drop-target");
/* dragenter event fired on the drop target */
target.addEventListener("dragenter", (event) => {
  // prevent default to allow drop
  event.preventDefault();
});
```

## Specifications

Not part of any standard.

## See also

- Mozilla CSS extensions
- HTML drag and drop
