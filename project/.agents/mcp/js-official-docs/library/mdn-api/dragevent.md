---
title: "DragEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dragevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DragEvent

The **`DragEvent`** interface is a DOM event that represents a drag and drop interaction. The user initiates a drag by placing a pointer device (such as a mouse) on the touch surface and then dragging the pointer to a new location (such as another DOM element). Applications are free to interpret a drag and drop interaction in an application-specific way.

This interface inherits properties from `MouseEvent` and `Event`.

## Constructors

Although this interface has a constructor, it is not possible to create a useful DataTransfer object from script, since `DataTransfer` objects have a processing and security model that is coordinated by the browser during drag-and-drops.

- `DragEvent()`
    Creates a synthetic and untrusted DragEvent.

## Instance properties

- `DragEvent.dataTransfer` (read-only)
    The data that is transferred during a drag and drop interaction.

## Event types

- `drag`
    This event is fired repeatedly when an element or text selection is being dragged. The firing frequency depends on the browser, operating system, and pointer movement; do not rely on a fixed interval.
- `dragend`
    This event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).
- `dragenter`
    This event is fired when a dragged element or text selection enters a valid drop target.
- `dragleave`
    This event is fired when a dragged element or text selection leaves a valid drop target.
- `dragover`
    This event is fired repeatedly while an element or text selection is being dragged over a potential drop target. The firing frequency depends on the browser, operating system, and pointer movement; do not rely on a fixed interval.
- `dragstart`
    This event is fired when the user starts dragging an element or text selection.
- `drop`
    This event is fired when an element or text selection is dropped on a valid drop target.

## Example

An Example of each property, constructor, event type and global event handlers is included in their respective reference page.

## See also

- Drag and drop
- Drag Operations
- Working with the drag data store
