---
title: "TaskPriorityChangeEvent: previousPriority property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/taskprioritychangeevent/previouspriority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskPriorityChangeEvent: previousPriority property

The **`previousPriority`** read-only property of the `TaskPriorityChangeEvent` interface returns the priority of the corresponding `TaskSignal` before it was changed and this `prioritychange` event was emitted.

This is the value that was set in the `TaskPriorityChangeEvent` constructor argument `options.previous`.

The new priority of the task can be read from `event.target.priority`.

## Value

A string, indicating the associated task's priority before it was changed.
This will be one of: `"user-blocking"`, `"user-visible"`, `"background"`.

## Examples

The code below shows the `previousPriority` being obtained in a handler for a `prioritychange` event.

```js
// Listen for 'prioritychange' events on the controller's signal.
controller.signal.addEventListener("prioritychange", (event) => {
  const previousPriority = event.previousPriority;
  const newPriority = event.target.priority;
  console.log(
    `The priority changed from ${previousPriority} to ${newPriority}.`,
  );
});
```

A more complete live example can be found in `prioritychange` event > Examples.
