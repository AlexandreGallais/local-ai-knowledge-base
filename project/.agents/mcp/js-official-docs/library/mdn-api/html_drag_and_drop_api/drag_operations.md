---
title: "Drag operations (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/html_drag_and_drop_api/drag_operations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Drag operations

Central to the Drag and Drop API are the various drag events that fire in a specific order and are expected to be handled in a specific way. This document describes the steps that occur during a drag and drop operation, and what the application is supposed to do within each handler.

At a high level, here are the possible steps in a drag and drop operation:

- The user starts the drag on a source node; the `dragstart` event is fired on the source node. Within this event, the source node prepares the context for the drag operation, including the drag data, feedback image, and allowed drop effects.
- The user drags the item around: every time a new element is entered, the `dragenter` event is fired on that element, and the `dragleave` event is fired on the previous element. The `dragover` event fires repeatedly on the element the drag is currently inside, and the `drag` event fires repeatedly on the source node.
- The drag enters a valid drop target: the drop target cancels its `dragover` event to indicate that it is a valid drop target. Some form of drop feedback indicates the expected drop effect to the user.
- The user performs the drop: the `drop` event is fired on the drop target. Within this event, the target node reads the drag data.
- The drag operation ends: the `dragend` event is fired on the source node. This event is fired regardless of whether the drop was successful or not.

## Starting a drag

The drag starts on a draggable item, which can be a selection, a draggable element (including links, images, and any element with `draggable="true"`), a file from the operating system's file explorer, etc. First, the `dragstart` event is fired on the _source node_, which is the draggable element or, for selections, the text node that the drag started on. If this event is canceled, then the drag operation is aborted. Otherwise, the `pointercancel` event is also fired on the source node.

The `dragstart` event is the only time you can modify the `dataTransfer`. For a custom draggable element, you almost always want to modify the drag data, which is covered in detail in Modifying the drag data store. There are two other things you can change: the feedback image and the allowed drop effects.

In this example, we add a listener for the `dragstart` event by using the `addEventListener()` method.

```html
<p draggable="true">This text <strong>may</strong> be dragged.</p>
```

```js
const draggableElement = document.querySelector('p[draggable="true"]');
draggableElement.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", "This text may be dragged");
});
```

You could also listen to a higher ancestor as drag events bubble up as most other events do. For this reason, it is common to also check the event's target, so that dragging a selection contained within this element does not trigger the `setData` (although selecting text within the element is hard, it is not impossible):

```js
draggableElement.addEventListener("dragstart", (event) => {
  if (event.target === draggableElement) {
    event.dataTransfer.setData("text/plain", "This text may be dragged");
  }
});
```

### Setting the drag feedback image

When a drag occurs, a translucent image is generated from the source node, and follows the user's pointer during the drag. This image is created automatically, so you do not need to create it yourself. However, you can use `setDragImage()` to specify a custom drag feedback image.

```js
draggableElement.addEventListener("dragstart", (event) => {
  event.dataTransfer.setDragImage(image, xOffset, yOffset);
});
```

Three arguments are necessary. The first is a reference to an image. This reference will typically be to an `` element, but it can also be to a `<canvas>` or any other element. The feedback image will be generated from whatever the image looks like on screen, although for images, they will be drawn at their original size. The second and third arguments to the `setDragImage()` method are offsets where the image should appear relative to the mouse pointer.

You can also use images and canvases that are not in a document. This technique is useful when drawing custom drag images using the canvas element, as in the following example:

```js
draggableElement.addEventListener("dragstart", (event) => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 50;

  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 4;
  ctx.moveTo(0, 0);
  ctx.lineTo(50, 50);
  ctx.moveTo(0, 50);
  ctx.lineTo(50, 0);
  ctx.stroke();

  event.dataTransfer.setDragImage(canvas, 25, 25);
});
```

In this example, we make one canvas the drag image. As the canvas is 50×50 pixels, we use offsets of half of this (`25`) so that the image appears centered on the mouse pointer.

## Dragging over elements and specifying drop targets

For the entire course of the drag operation, all device input events (such as mouse or keyboard) are suppressed. The dragged data can be moved over various elements in the document, or even elements in other documents. Whenever a new element is entered, a `dragenter` event is fired on that element, and a `dragleave` event is fired on the previous element.

> **Note:**
> `dragleave` always fires _after_ `dragenter`, so conceptually, in between these two events, the target has entered a new element but has not exited the previous one yet.

During the drag, the `drag` event fires repeatedly at the source node, and the `dragover` event fires repeatedly at the element the drag is currently inside. Most areas of a web page or application are not valid places to drop data, so elements by default ignore any drop that happened on it. The element can elect itself to be a valid drop target by canceling the `dragover` event. If the element is an editable text field, such as a `<textarea>` or ``, and the data store contains one `text/plain` item, then the element is a valid drop target by default without canceling `dragover`.

```html
<div id="drop-target">You can drag and then drop a draggable item here</div>
```

```js
const dropElement = document.getElementById("drop-target");

dropElement.addEventListener("dragover", (event) => {
  event.preventDefault();
});
```

> **Note:**
> The spec requires the `dragenter` event to be canceled too for a drop target, otherwise the `dragover` or `dragleave` events won't even start firing on this element; in practice no browser implements this, and the "current element" changes every time a new element is entered.

> **Note:**
> The spec requires that canceling the `drag` event aborts the drag; in practice no browser implements this. See example below:
>
>

```html
<p draggable="true" id="draggable">Drag me for 1 second!</p>
<p id="output"></p>
```

```js
const draggableElement = document.getElementById("draggable");
const output = document.getElementById("output");
let time = null;
draggableElement.addEventListener("dragstart", (event) => {
  time = Date.now();
  output.textContent = "";
});
draggableElement.addEventListener("drag", (event) => {
  if (time !== null && Date.now() - time > 1000) {
    event.preventDefault();
    output.textContent =
      "Drag operation canceled; if you are still dragging the node, then your browser does not support canceling the drag programmatically.";
    time = null;
  }
});
```

### Conditional drop targets

You usually only want the drop target to accept drops in certain situations (for example, only if a link is being dragged). To do this, check a condition and only cancel the event when the condition is met. For example, you can check if the dragged data contains links:

```js
dropElement.addEventListener("dragover", (event) => {
  const isLink = event.dataTransfer.types.includes("text/uri-list");
  if (isLink) {
    event.preventDefault();
  }
});
```

In this example, we use the `includes` method to check if the type `text/uri-list` is present in the list of types. If it is, we will cancel the event so that a drop may be allowed. If the drag data does not contain a link, the event will not be canceled, and a drop cannot occur at that location.
