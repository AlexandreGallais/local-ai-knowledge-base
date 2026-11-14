---
title: "Scheduler"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/scheduler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Scheduler

The **`Scheduler`** interface of the Prioritized Task Scheduling API provides methods for scheduling prioritized tasks.

A `Scheduler` can be accessed from the global object using `Window.scheduler` or `WorkerGlobalScope.scheduler` within a worker.

## Instance properties

None.

## Instance methods

- `Scheduler.postTask()`
    Adds a task to the scheduler as a callback, optionally specifying a priority, delay, and/or a signal for aborting the task.
- `Scheduler.yield()`
    Yields control of the main thread back to the browser, returning a promise that resolves to continue execution where it left off.

## Examples

If the feature is defined, an instance of this object is returned by the `globalThis` property in both workers and the main thread.

The code below shows a simple task that resolves with the text 'Task executing'.
This text is logged on success.
The code also shows a `catch` block, which would be required in more complex code to handle when a task is aborted or throws an error.

```js
if ("scheduler" in this) {
  // Post task with default priority: 'user-visible' (no other options)
  // When the task resolves, Promise.then() logs the result.
  scheduler
    .postTask(() => "Task executing")
    .then((taskResult) => console.log(`${taskResult}`)) // Log result
    .catch((error) => console.error(`Error: ${error}`)); // Log errors
}
```

For more comprehensive example code see Prioritized Task Scheduling API > Examples.
