---
title: "DataTransfer: addElement() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransfer/addelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransfer: addElement() method

The **`addElement()`** method of the `DataTransfer` interface sets the drag source to the given element. This element will be the element to which `drag` and `dragend` events are fired, and not the default target (the node that was dragged).

During a drag operation, this method can only be used in the handler for the `dragstart` event, because that's the only time the drag operation's data store is writable. Calling it from any other drag event throws a `NoModificationAllowedError` `DOMException`. See Modifying the drag data store for details.

## Syntax

```js
addElement(element)
```

### Parameters

- `element`
    The `Element` to set as the drag source.

### Return value

None (`undefined`).

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the drag data store is not in read/write mode.

## Examples

This example shows the use of the `addElement()` method

```js
function changeDragNode(event, node) {
  const dt = event.dataTransfer;
  dt.addElement(node);
}
```

## Specifications

This method is not defined in any Web standard.

## See also

- Drag and drop
- Drag Operations
- Working with the drag data store
