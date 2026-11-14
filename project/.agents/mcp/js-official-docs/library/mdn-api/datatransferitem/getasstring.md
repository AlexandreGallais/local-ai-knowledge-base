---
title: "DataTransferItem: getAsString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransferitem/getasstring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransferItem: getAsString() method

The **`getAsString()`** method of the `DataTransferItem` interface invokes the given callback with the drag data item's string data as the argument if the item's `kind` is a _Plain unicode string_ (i.e., `kind` is `string`).

During a drag operation, this method can only read data in the handlers for the `dragstart` and `drop` events, because those are the only times the drag data store is readable. Calling it from any other drag event does not invoke the callback. The method must be called synchronously within the event handler, although the callback runs asynchronously. See Reading the drag data store for details.

## Syntax

```js
getAsString(callbackFn)
```

### Parameters

- `callbackFn`
    A callback function that receives following arguments:
    - `data`
        The `DataTransferItem`'s string data.

### Return value

None (`undefined`).

## Examples

This example shows the use of the `getAsString()` method as an _inline function_ in a `drop` event handler.

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
    } else if (item.kind === "string" && item.type === "text/uri-list") {
      // Drag data item is URI
      console.log("… Drop: URI");
    } else if (item.kind === "file" && item.type.startsWith("image/")) {
      // Drag data item is an image file
      const f = item.getAsFile();
      console.log("… Drop: File");
    }
  }
}
```

## See also

- `DataTransfer.getData()`
