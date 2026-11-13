---
title: "DataTransferItem"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransferitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransferItem

The **`DataTransferItem`** object represents one drag data item. During a _drag operation_, each `DragEvent` has a `dataTransfer` property which contains a `list` of drag data items. Each item in the list is a `DataTransferItem` object.

`DataTransferItem` was primarily designed for the HTML Drag and Drop API, and is still specified in the HTML drag-and-drop section, but it is now also used by other APIs, such as `ClipboardEvent.clipboardData` and `InputEvent.dataTransfer`. Documentation of `DataTransferItem` will primarily discuss its usage in drag-and-drop operations, and you should refer to the other APIs' documentation for usage of `DataTransferItem` in those contexts.

This interface has no constructor.

## Instance properties

- `DataTransferItem.kind` (read-only)
    The _kind_ of drag data item, `string` or `file`.
- `DataTransferItem.type` (read-only)
    The drag data item's type, typically a MIME type.

## Instance methods

- `DataTransferItem.getAsFile()`
    Returns the `File` object associated with the drag data item (or null if the drag item is not a file).
- `DataTransferItem.getAsFileSystemHandle()` (experimental)
    Returns a `Promise` that fulfills with a `FileSystemFileHandle` if the dragged item is a file, or fulfills with a `FileSystemDirectoryHandle` if the dragged item is a directory.
- `DataTransferItem.getAsString()`
    Invokes the specified callback with the drag data item string as its argument.
- `DataTransferItem.webkitGetAsEntry()`
    Returns an object based on `FileSystemEntry` representing the selected file's entry in its file system. This will generally be either a `FileSystemFileEntry` or `FileSystemDirectoryEntry` object.

## Example

All of this interface's methods and properties have their own reference page, and each reference page has an example of its usage.
