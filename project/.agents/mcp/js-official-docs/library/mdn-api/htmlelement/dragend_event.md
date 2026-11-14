---
title: "HTMLElement: dragend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/dragend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: dragend event

The `dragend` event is fired when a drag operation ends (by releasing a mouse button or hitting the escape key).

This event is cancelable and may bubble up to the `Document` and `Window` objects.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("dragend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondragend = (event) => { }
```

## Event type

A `DragEvent`. Inherits from `Event`.

## Examples

### Resetting opacity on dragend

In this example, we have a draggable element inside a container. Try grabbing the element, dragging it, and then releasing it.

We make the element half-transparent while it is dragged, and listen for the `dragend` event to reset the element's opacity when it is released.

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
  - `dragstart`
  - `dragover`
  - `dragenter`
  - `dragleave`
  - `drop`
