---
title: "DataTransferItem: kind property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransferitem/kind/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransferItem: kind property

The **`kind`** read-only property of the `DataTransferItem` interface returns the kind–a string or a file–of the object representing the _drag data item_.

During a drag operation, this property can be read in any drag event handler, even when the drag data store is in protected mode. The item's kind remains accessible, but its data can only be read in the handlers for the `dragstart` and `drop` events. See Reading the drag data store for details.

## Value

A string representing the drag data item's kind.
It must be one of the following values:

- `'file'`
    If the drag data item is a file.
- `'string'`
    If the kind of drag data item is a _plain Unicode string_.

## Examples

This example shows the use of the `kind` property.

```js
function dropHandler(ev) {
  console.log("Drop");
  ev.preventDefault();
  for (const item of ev.dataTransfer.items) {
    if (item.kind === "string" && item.type === "text/plain") {
      // This item is the target node
      item.getAsString((s) => {
        ev.target.appendChild(document.getElementById(s));
      });
    } else if (item.kind === "string" && item.type === "text/html") {
      // Drag data item is HTML
      console.log("… Drop: HTML");
    } else if (item.kind === "file" && item.type.startsWith("image/")) {
      // Drag data item is an image file
      const f = item.getAsFile();
      console.log("… Drop: File");
    }
  }
}
```

## See also

- Drag and drop
- Drag Operations
- Working with the drag data store
