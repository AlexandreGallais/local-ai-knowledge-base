---
title: "DataTransfer: items property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransfer/items/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransfer: items property

The **`items`** read-only property of the `DataTransfer` interface is a `DataTransferItemList` of the `DataTransferItem` objects in a drag operation. The list includes one item for each item in the operation, and if the operation had no items, the list is empty.

During a drag operation, this property can be used to enumerate the items and inspect their kinds and types in any drag event handler. However, the items' data can only be read in the handlers for the `dragstart` and `drop` events, and the list can only be modified in the `dragstart` handler. See Reading the drag data store and Modifying the drag data store for details.

## Value

A `DataTransferItemList` object containing `DataTransferItem`
objects representing the items being dragged in a drag operation, one list item for each
object being dragged. If the drag operation had no data, the list is empty.

## Examples

### Logging dragged items

This example uses `items` to log information about dragged items.

#### HTML

```html
<ul>
  <li id="source1" draggable="true">Drag Item 1 to the Drop Zone</li>
  <li id="source2" draggable="true">Drag Item 2 to the Drop Zone</li>
</ul>
<div id="target">Drop Zone</div>

<button id="reset">Reset</button>
```

#### CSS

```css
div {
  margin: 0em;
  padding: 2em;
}

#target {
  border: 1px solid black;
}
```

#### JavaScript

```js
function dragstartHandler(ev) {
  console.log(`dragstart: target.id = ${ev.target.id}`);
  // Add this element's id to the drag payload so the drop handler will
  // know which element to add to its tree
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
}

function dropHandler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  // Print each item's "kind" and "type"
  if (ev.dataTransfer.items) {
    for (const item of ev.dataTransfer.items) {
      console.log(`kind = ${item.kind}, type = ${item.type}`);
    }
  }
}

function dragoverHandler(ev) {
  ev.preventDefault();
  // Set the dropEffect to move
  ev.dataTransfer.dropEffect = "move";
}

const source1 = document.querySelector("#source1");
const source2 = document.querySelector("#source2");
const target = document.querySelector("#target");

source1.addEventListener("dragstart", dragstartHandler);
source2.addEventListener("dragstart", dragstartHandler);
target.addEventListener("dragover", dragoverHandler);
target.addEventListener("drop", dropHandler);

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => document.location.reload());
```

#### Result

## See also

- Drag and drop
- Drag Operations
- Working with the drag data store
