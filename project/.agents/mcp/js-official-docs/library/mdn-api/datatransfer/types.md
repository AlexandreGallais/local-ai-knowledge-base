---
title: "DataTransfer: types property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransfer/types/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransfer: types property

The **`types`** read-only property of the `DataTransfer` interface returns the available types that exist in the `items`.

During a drag operation, this property can be read in any drag event handler, even when the drag data store is in protected mode. The available formats remain accessible, but the data itself can only be read in the handlers for the `dragstart` and `drop` events. See Reading the drag data store for details.

## Value

An array of the data formats. Each format is a string
which is generally a MIME type such as `text/plain` or `text/html`. If the drag
operation included no data, this list will be empty. If any files are included in
the drag operation, then one of the types will be the string `Files`.

## Examples

This example shows the use of the `types` and
`items` properties.

```html
<ul>
  <li id="i1" draggable="true">Drag Item 1 to the Drop Zone</li>
  <li id="i2" draggable="true">Drag Item 2 to the Drop Zone</li>
</ul>
<div id="target">Drop Zone</div>
<pre id="output"></pre>
```

```css
div {
  margin: 0em;
  padding: 2em;
}
#target {
  border: 1px solid black;
}
```

```js
const output = document.getElementById("output");
function log(msg) {
  output.textContent += `${msg}\n`;
}

document.querySelectorAll("li").forEach((item) => {
  item.addEventListener("dragstart", dragstartHandler);
});

function dragstartHandler(ev) {
  log(`dragStart: target.id = ${ev.target.id}`);

  // Add this element's id to the drag payload so the drop handler will
  // know which element to add to its tree
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
}

const target = document.getElementById("target");

target.addEventListener("drop", (ev) => {
  log(`drop: target.id = ${ev.target.id}`);
  ev.preventDefault();

  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  // Print each format type
  for (let i = 0; i < ev.dataTransfer.types.length; i++) {
    log(`… types[${i}] = ${ev.dataTransfer.types[i]}`);
  }

  // Print each item's "kind" and "type"
  for (let i = 0; i < ev.dataTransfer.items.length; i++) {
    log(
      `… items[${i}].kind = ${ev.dataTransfer.items[i].kind}; type = ${ev.dataTransfer.items[i].type}`,
    );
  }
});

target.addEventListener("dragover", (ev) => {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
});
```

## See also

- Drag and drop
- Drag Operations
- Working with the drag data store
