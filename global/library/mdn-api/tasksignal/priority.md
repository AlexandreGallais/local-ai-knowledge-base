---
title: "TaskSignal: priority property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/tasksignal/priority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskSignal: priority property

The read-only **`priority`** property of the `TaskSignal` interface indicates the signal priority.

The initial value is set in the associated `TaskController` by specifying it as an argument to the `TaskController` constructor (by default it is `"user-visible"`).
The priority of the signal can be changed by calling `TaskController.setPriority()` on the associated controller.

For tasks with a mutable priority, this value is used to set the initial task priority and later to change it.
Tasks with an immutable priority will ignore the value.

## Value

A string indicating the signal priority.
This will be one of: `"user-blocking"`, `"user-visible"`, `"background"`.

## Examples

The `priority` is most commonly used by developers to determine the new priority following `prioritychange` events.
See TaskSignal: prioritychange event for a live example.
