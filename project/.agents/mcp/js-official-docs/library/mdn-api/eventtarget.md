---
title: "EventTarget"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventtarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventTarget

The **`EventTarget`** interface is implemented by objects that can receive events and may have listeners for them.
In other words, any target of events implements the methods associated with this interface.

`Element`, and its children, as well as `Document` and `Window`, are the most common event targets,
but other objects can be event targets, too.
For example `IDBRequest`, `AudioNode`, and `AudioContext` are also event targets.

Many event targets (including elements, documents, and windows) also support registering event handlers via `onevent` properties and attributes.

## Constructor

- `EventTarget()`
    Creates a new `EventTarget` object instance.

## Instance methods

- `EventTarget.addEventListener()`
    Registers an event handler of a specific event type on the `EventTarget`.
- `EventTarget.removeEventListener()`
    Removes an event listener from the `EventTarget`.
- `EventTarget.dispatchEvent()`
    Dispatches an event to this `EventTarget`.
- `EventTarget.when()` (experimental)
    Returns an `Observable` object representing a stream of events fired on the event target it is called on.

## See also

- Event index
- Introduction to events
- `Event` interface
