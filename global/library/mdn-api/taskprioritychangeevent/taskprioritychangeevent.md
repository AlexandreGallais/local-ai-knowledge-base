---
title: "TaskPriorityChangeEvent: TaskPriorityChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/taskprioritychangeevent/taskprioritychangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskPriorityChangeEvent: TaskPriorityChangeEvent() constructor

The **`TaskPriorityChangeEvent()`** constructor creates a new `TaskPriorityChangeEvent` object.

This object is created with a value indicating the previous priority of the task: the priority before it changed and this event was fired.

## Syntax

```js
new TaskPriorityChangeEvent(type, options)
```

### Parameters

- `type`
    A string with the case-sensitive name of the associated event.
    User agents set it to `"prioritychange"`.

- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `previousPriority`
        A string indicating the _previous_ priority of the task.
        One of: `"user-blocking"`, `"user-visible"`, `"background"`.
