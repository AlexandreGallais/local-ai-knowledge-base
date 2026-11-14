---
title: "TaskSignal"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/tasksignal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskSignal

The **`TaskSignal`** interface of the Prioritized Task Scheduling API represents a signal object that allows you to communicate with a prioritized task, and abort it or change the priority (if required) via a `TaskController` object.

An object of this type is created, and associated with, a `TaskController`.
The initial priority of the signal may be set by specifying it as an argument to the `TaskController()` constructor (by default it is `"user-visible"`).
The priority can be changed by calling `TaskController.setPriority()` on the controller.

The signal may be passed as the `options.signal` argument in `Scheduler.postTask()`, after which its associated controller can be used to abort the task.
If the task priority is mutable, the controller can also be used to change the task's priority.
Abortable tasks that do not need the priority to change may instead specify an `AbortSignal` as the `options.signal` argument.

## Instance properties

_The `TaskSignal` interface also inherits properties from its parent interface, `AbortSignal`._

- `TaskSignal.priority` (read-only)
    Returns the priority of the signal.

## Static methods

_The `TaskSignal` interface inherits methods from its parent interface, `AbortSignal`._

- `TaskSignal.any()`
    Returns a **`TaskSignal`** that aborts when any of the given abort signals abort.

## Instance methods

_The `TaskSignal` interface inherits methods from its parent interface, `AbortSignal`._

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `prioritychange`
    Fired when the priority is changed.
    This is triggered by calling `TaskController.setPriority()` on the associated controller.

## Examples

Examples for how the `TaskSignal` is created and used for prioritizing and aborting tasks can be found here:

- Prioritized Task Scheduling API > Examples
- `TaskController` > Examples
- `TaskSignal: prioritychange` event > Examples
