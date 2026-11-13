---
title: "HTMLElement: dragenter event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/dragenter_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: dragenter event

The `dragenter` event is fired when a dragged element or text selection enters a valid drop target. The target object is the _immediate user selection_ (the element directly indicated by the user as the drop target), or the `<body>` element.

This event is cancelable and may bubble up to the `Document` and `Window` objects.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("dragenter", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondragenter = (event) => { }
```

## Event type

A `DragEvent`. Inherits from `Event`.

## Examples

### Styling drop zones on dragenter

In this example, we have a draggable element inside a container. Try grabbing the element, dragging it over the other container, and releasing it.

We listen for the `dragenter` event to give the other container a purple background while the draggable element is over it to signal that the draggable element could be dropped onto the container.

However, in this partial example, we haven't implemented dropping: for a complete example of drag and drop, see the page for the `drag` event.

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

.dropzone.dragover {
  background-color: purple;
}
```

#### JavaScript

```js
const target = document.getElementById("drop-target");
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
```

#### Result

## See also

- Other drag and drop events:
  - `drag`
  - `dragstart`
  - `dragend`
  - `dragover`
  - `dragleave`
  - `drop`
