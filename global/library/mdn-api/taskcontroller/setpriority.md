---
title: "TaskController: setPriority() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/taskcontroller/setpriority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskController: setPriority() method

The **`setPriority()`** method of the `TaskController` interface can be called to set a new priority for this controller's `signal`.
If a prioritized task is configured to use the signal, this will also change the task priority.

Observers are notified of priority changes by dispatching a `prioritychange` event.
The method will only notify if the priority actually changes (the event is not fired if the priority would not be changed by the call).

Note that task priority can only be changed for tasks with mutable priorities.
If the task is immutable, the function call is ignored.

## Syntax

```js
setPriority(priority)
```

### Parameters

- `priority`
    The priority of the task.
    One of: `"user-blocking"`, `"user-visible"`, `"background"`.

### Return value

None (`undefined`).

### Exceptions

- `NotAllowedError` `DOMException`
    A priority change has been started when one is already running.

## Examples

First we create a task controller.
In this case we don't specify a priority, so it will default to `user-visible`.

```js
// Create a TaskController with default priority: 'user-visible'
const controller = new TaskController();
```

Then we pass the controller's signal to the `Scheduler.postTask()` method.

```js
// Post task passing the controller's signal.
// The signal priority sets the initial priority of the task
scheduler
  .postTask(() => "Task execute", { signal: controller.signal })
  .then((taskResult) => {
    console.log(`${taskResult}`);
  }) // Run on success)
  .catch((error) => {
    console.log(`Catch error: ${error}`);
  }); // Run on fail
```

The controller can then be used to change the priority

```js
// Change the priority to 'background' using the controller
controller.setPriority("background");
```

Additional examples, including showing how to handle the event that results from changing the priority, can be found in: Prioritized Task Scheduling API > Examples.
