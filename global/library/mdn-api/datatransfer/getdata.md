---
title: "DataTransfer: getData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransfer/getdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransfer: getData() method

The **`getData()`** method of the `DataTransfer` interface retrieves drag data (as a string) for the specified type. If the drag operation does not include data, this method returns an empty string.

Example data types are `text/plain` and `text/uri-list`.

During a drag operation, this method can only read data in the handlers for the `dragstart` and `drop` events, because those are the only times the drag data store is readable. Calling it from any other drag event returns an empty string. See Reading the drag data store for details.

## Syntax

```js
getData(format)
```

### Parameters

- `format`
    A string representing the type of data to retrieve.

### Return value

A string representing the drag data for the specified `format`. If the drag operation has no data or the operation has no data for the specified `format`, this method returns an empty string.

The items and their formats can still be enumerated during other drag events using `DataTransfer.items` and `DataTransfer.types`.

## Examples

This example shows the use of the `DataTransfer` object's
`getData()` and
`setData()` methods.

### HTML

```html
<div id="div1">
  <span id="drag" draggable="true">drag me to the other box</span>
</div>
<div id="div2"></div>
```

### CSS

```css
#div1,
#div2 {
  width: 100px;
  height: 50px;
  padding: 10px;
  border: 1px solid #aaaaaa;
}
```

### JavaScript

```js
const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const dragElement = document.getElementById("drag");

dragElement.addEventListener("dragstart", drag);
div1.addEventListener("dragover", allowDrop);
div2.addEventListener("dragover", allowDrop);
div1.addEventListener("drop", drop);
div2.addEventListener("drop", drop);

function allowDrop(allowDropEvent) {
  allowDropEvent.target.style.color = "blue";
  allowDropEvent.preventDefault();
}

function drag(dragEvent) {
  dragEvent.dataTransfer.setData("text", dragEvent.target.id);
  dragEvent.target.style.color = "green";
}

function drop(dropEvent) {
  dropEvent.preventDefault();
  const data = dropEvent.dataTransfer.getData("text");
  dropEvent.target.appendChild(document.getElementById(data));
  dragElement.style.color = "black";
}
```

## See also

- Drag and drop
- Drag Operations
- Working with the drag data store
