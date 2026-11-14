---
title: "Window: scheduler property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/scheduler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: scheduler property

The **`scheduler`** read-only property of the `Window` interface is the entry point for using the Prioritized Task Scheduling API.

It returns a `Scheduler` object instance containing `postTask()` and `yield()` methods that can be used to schedule prioritized tasks.

## Value

A `Scheduler`.

## Examples

The code below shows a very basic use of the property and its associated interface.
It demonstrates how to check that the property exists and then posts a task that returns a promise.

```js
// Check if the prioritized task API is supported
if ("scheduler" in window) {
  // Callback function - "the task"
  const myTask = () => "Task 1: user-visible";

  // Post task with default priority: 'user-visible' (no other options)
  // When the task resolves, Promise.then() logs the result.
  window.scheduler
    .postTask(myTask)
    // Handle resolved value
    .then((taskResult) => console.log(`${taskResult}`))
    // Handle error or abort
    .catch((error) => console.log(`Error: ${error}`));
} else {
  console.log("Feature: NOT Supported");
}
```

For comprehensive example code showing to use the API see Prioritized Task Scheduling API > Examples.

## See also

- Prioritized Task Scheduling API
- `Scheduler.postTask()`
- `Scheduler.yield()`
- `TaskController`
- `WorkerGlobalScope.scheduler`
