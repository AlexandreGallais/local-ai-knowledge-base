---
title: "HTMLElement: dragstart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/dragstart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: dragstart event

The `dragstart` event is fired when the user starts dragging an element or text selection.

This event is cancelable and may bubble up to the `Document` and `Window` objects.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("dragstart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondragstart = (event) => { }
```

## Event type

A `DragEvent`. Inherits from `Event`.

## Examples

### Setting opacity on drag start

In this example, we have a draggable element inside a container. Try grabbing the element, dragging it, and then releasing it.

We listen for the `dragstart` event to make the element half transparent while dragged.

For a complete example of drag and drop, see the page for the `drag` event.

#### HTML

```html
<div id="container">
  <div id="draggable" draggable="true">This div is draggable</div>
</div>
<div class="dropzone"></div>
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

#container {
  width: 200px;
  height: 20px;
  background: blueviolet;
  padding: 10px;
}

.dragging {
  opacity: 0.5;
}
```

#### JavaScript

```js
const source = document.getElementById("draggable");
source.addEventListener("dragstart", (event) => {
  // make it half transparent
  event.target.classList.add("dragging");
});

source.addEventListener("dragend", (event) => {
  // reset the transparency
  event.target.classList.remove("dragging");
});
```

#### Result

## See also

- Other drag and drop events:
  - `drag`
  - `dragend`
  - `dragover`
  - `dragenter`
  - `dragleave`
  - `drop`
