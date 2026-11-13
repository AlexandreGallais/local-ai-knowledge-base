---
title: "HTMLElement: drag event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/drag_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: drag event

The `drag` event is fired repeatedly as an element or text selection is being dragged by the user. The firing frequency depends on the browser, operating system, and pointer movement; do not rely on a fixed interval.

The firing frequency depends on the browser, operating system, and pointer movement. The `drag` event can continue to fire while the pointer is stationary, and can fire more frequently while it is moving. Do not rely on a fixed interval or expect an event for every pointer movement. The HTML specification uses a firing frequency of roughly 350 ms (±200 ms). In practice, browsers use native drag updates and platform-specific timers to dispatch these events, so this interval does not describe all browser behavior.

This event is cancelable and may bubble up to the `Document` and `Window` objects.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("drag", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondrag = (event) => { }
```

## Event type

A `DragEvent`. Inherits from `Event`.

## Examples

### Drag and drop example

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
  /* Prevent the user selecting text in the example */
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

.dropzone.dragover {
  background-color: purple;
}

.dragging {
  opacity: 0.5;
}
```

#### JavaScript

```js
let dragged;

/* events fired on the draggable target */
const source = document.getElementById("draggable");
source.addEventListener("drag", (event) => {
  console.log("dragging");
});

source.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.classList.add("dragging");
});

source.addEventListener("dragend", (event) => {
  // reset the transparency
  event.target.classList.remove("dragging");
});

/* events fired on the drop targets */
const target = document.getElementById("drop-target");
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
});

target.addEventListener("dragenter", (event) => {
  // highlight potential drop target when the draggable element enters it
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.add("dragover");
  }
});

target.addEventListener("dragleave", (event) => {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.remove("dragover");
  }
});

target.addEventListener("drop", (event) => {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.remove("dragover");
    event.target.appendChild(dragged);
  }
});
```

#### Result

## See also

- `dragstart`
- `dragend`
- `dragover`
- `dragenter`
- `dragleave`
- `drop`
