---
title: "TaskPriorityChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/taskprioritychangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskPriorityChangeEvent

The **`TaskPriorityChangeEvent`** is the interface for the `prioritychange` event.

## Constructor

- `TaskPriorityChangeEvent()`
    Creates a new `TaskPriorityChangeEvent` object, setting an event name and previous priority.

## Instance properties

_This interface also inherits the properties of its parent, `Event`._

- `TaskPriorityChangeEvent.previousPriority` (read-only)
    Returns the priority of the corresponding `TaskSignal` _before_ this `prioritychange` event.

## Instance methods

_This interface has no methods of its own, but inherits the methods of its parent, `Event`._

## Examples

An object of this type is returned in the handler for a `prioritychange` event.
The code below shows a handler in which the `newPriority` and `previousPriority` are logged.

```js
// Listen for 'prioritychange' events on the controller's signal.
controller.signal.addEventListener("prioritychange", (event) => {
  const previousPriority = event.previousPriority;
  const newPriority = event.target.priority;
  console.log(`Priority changed from ${previousPriority} to ${newPriority}.`);
});
```

A more complete live example can be found in `prioritychange` event > Examples.

## See also

- `prioritychange` event
