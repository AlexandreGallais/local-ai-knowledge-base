---
title: "HTMLElement: drop event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/drop_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: drop event

The **`drop`** event is fired when an element or text selection is dropped on a valid drop target. To ensure that the `drop` event always fires as expected, you should always include a `preventDefault()` call in the part of your code which handles the `dragover` event.

This event is cancelable and may bubble up to the `Document` and `Window` objects.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("drop", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondrop = (event) => { }
```

## Event type

A `DragEvent`. Inherits from `Event`.

## Examples

### A minimal drag-and-drop example

In this example, we have a draggable element inside a container. Try grabbing the element, dragging it over the other container, and releasing it.

We use three event handlers here:

- in the `dragstart` event handler, we get a reference to the element that the user dragged
- in the `dragover` event handler for the target container, we call `event.preventDefault()`, which enables it to receive `drop` events.
- in the `drop` event handler for the drop zone, we handle moving the draggable element from the original container to the drop zone.

For a more complete example of drag and drop, see the page for the `drag` event.

#### HTML

```html
<div class="dropzone">
  <div id="draggable" draggable="true">This div is draggable</div>
</div>
<div class="dropzone" id="drop-target"></div>
```

#### CSS

```css
body {
  /* Prevent the user from selecting text in the example */
  user-select: none;
}

#draggable {
  text-align: center;
  background: white;
}

.dropzone {
  width: 200px;
  height: 20px;
  background: blueviolet;
  margin: 10px;
  padding: 10px;
}
```

#### JavaScript

```js
let dragged = null;

const source = document.getElementById("draggable");
source.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
});

const target = document.getElementById("drop-target");
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
});

target.addEventListener("drop", (event) => {
  // prevent default action (open as a link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.className === "dropzone") {
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
});
```

#### Result

## See also

- Other drag and drop events:
  - `drag`
  - `dragstart`
  - `dragend`
  - `dragover`
  - `dragenter`
  - `dragleave`
