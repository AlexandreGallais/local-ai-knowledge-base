---
title: "DataTransfer: clearData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransfer/cleardata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransfer: clearData() method

The **`clearData()`** method of the `DataTransfer` interface removes the drag operation's drag data for the given type. If data for the given type does not exist, this method does nothing.

If this method is called with no arguments or the format is an empty string, the data of all types will be removed.

This method does _not_ remove files from the drag operation, so it's possible for there still to be an entry with the type `"Files"` left in the object's `DataTransfer.types` list if there are any files included in the drag.

During a drag operation, this method can only be used in the handler for the `dragstart` event, because that's the only time the drag operation's data store is writable. Calling it from any other drag event does nothing. See Modifying the drag data store for details.

## Syntax

```js
clearData()
clearData(format)
```

### Parameters

- `format` (optional)
    A string which specifies the type of data to remove. If
    this parameter is an empty string or is not provided, the data for all types is
    removed.

### Return value

None (`undefined`).

## Examples

This example shows the use of the `DataTransfer` object's
`getData()`,
`setData()` and
`clearData()` methods.

### HTML

```html
<span class="tweaked" id="source" draggable="true">
  Select this element, drag it to the Drop Zone and then release the selection
  to move the element.
</span>
<span class="tweaked" id="target">Drop Zone</span>
<div>Status: <span id="status">Drag to start</span></div>
<div>Data is: <span id="data">uninitialized</span></div>
```

### CSS

```css
span.tweaked {
  display: inline-block;
  margin: 1em 0;
  padding: 1em 2em;
}

#source {
  color: blue;
  border: 1px solid black;
}

#target {
  border: 1px solid black;
}
```

### JavaScript

```js
// Select HTML elements
const draggable = document.getElementById("source");
const droppable = document.getElementById("target");
const status = document.getElementById("status");
const data = document.getElementById("data");
let dropped = false;

// Register event handlers
draggable.addEventListener("dragstart", dragStartHandler);
draggable.addEventListener("dragend", dragEndHandler);
droppable.addEventListener("dragover", dragOverHandler);
droppable.addEventListener("dragleave", dragLeaveHandler);
droppable.addEventListener("drop", dropHandler);

function dragStartHandler(event) {
  status.textContent = "Drag in process";

  // Change target element's border to signify drag has started
  event.currentTarget.style.border = "1px dashed blue";

  // Start by clearing existing clipboards; this will affect all types since we
  // don't give a specific type.

  event.dataTransfer.clearData();

  // Set the drag's format and data (use event target's id for data)
  event.dataTransfer.setData("text/plain", event.target.id);

  data.textContent = event.dataTransfer.getData("text/plain");
}

function dragEndHandler(event) {
  if (!dropped) {
    status.textContent = "Drag canceled";
  }

  data.textContent = event.dataTransfer.getData("text/plain") || "empty";

  // Change border to signify drag is no longer in process
  event.currentTarget.style.border = "1px solid black";

  if (dropped) {
    // Remove all event listeners
    draggable.removeEventListener("dragstart", dragStartHandler);
    draggable.removeEventListener("dragend", dragEndHandler);
    droppable.removeEventListener("dragover", dragOverHandler);
    droppable.removeEventListener("dragleave", dragLeaveHandler);
    droppable.removeEventListener("drop", dropHandler);
  }
}

function dragOverHandler(event) {
  status.textContent = "Drop available";

  event.preventDefault();
}

function dragLeaveHandler(event) {
  status.textContent = "Drag in process (drop was available)";

  event.preventDefault();
}

function dropHandler(event) {
  dropped = true;

  status.textContent = "Drop done";

  event.preventDefault();

  // Get data linked to event format « text »
  const _data = event.dataTransfer.getData("text/plain");
  const element = document.getElementById(_data);

  // Append drag source element to event's target element
  event.target.appendChild(element);

  // Change CSS styles and displayed text
  element.style.cssText = "border: 1px solid black;display: block; color: red";
  element.textContent = "I'm in the Drop Zone!";
}
```

## See also

- Drag and drop
- Drag Operations
- Working with the drag data store
