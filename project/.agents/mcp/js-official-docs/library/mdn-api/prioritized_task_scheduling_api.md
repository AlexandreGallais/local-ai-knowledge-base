---
title: "Prioritized Task Scheduling API (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/prioritized_task_scheduling_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Prioritized Task Scheduling API

The **Prioritized Task Scheduling API** provides a standardized way to prioritize all tasks belonging to an application, whether they are defined in a website developer's code or in third-party libraries and frameworks.

The task priorities are very coarse-grained and based around whether tasks block user interaction or otherwise impact the user experience, or can run in the background. Developers and frameworks may implement more fine-grained prioritization schemes within the broad categories defined by the API.

The API is promise-based and supports the ability to set and change task priorities, to delay tasks being added to the scheduler, to abort tasks, and to monitor for priority change and abort events.

## Concepts and usage

The Prioritized Task Scheduling API is available in both window and worker threads using the `scheduler` property on the global object.

The main API methods are `scheduler.postTask()` and `scheduler.yield()`. `scheduler.postTask()` takes a callback function (the task) and returns a promise that resolves with the return value of the function or rejects with an error. `scheduler.yield()` turns any `async` function into a task by yielding the main thread to the browser for other work, with execution continuing when the returned promise is resolved.

The two methods have similar functionality but different levels of control. `scheduler.postTask()` is more configurable — for example, it allows task priority to be explicitly set and task cancellation via an `AbortSignal`. `scheduler.yield()` on the other hand is simpler and can be `await`ed in any `async` function without having to provide a followup task in another function.

### `scheduler.yield()`

To break up long-running JavaScript tasks so they don't block the main thread, insert a `scheduler.yield()` call to temporarily yield the main thread back to the browser, which creates a task to continue execution where it left off.

```js
async function slowTask() {
  firstHalfOfWork();
  await scheduler.yield();
  secondHalfOfWork();
}
```

`scheduler.yield()` returns a promise that can be awaited to continue execution. This allows work belonging to the same function to be included there, without blocking the main thread when the function runs.

`scheduler.yield()` takes no arguments. The task that triggers its continuation has a default `user-visible` priority; however, if `scheduler.yield()` is called within a `scheduler.postTask()` callback, it will inherit the priority of the surrounding task.

### `scheduler.postTask()`

When `scheduler.postTask()` is called with no arguments, it creates a task with a default `user-visible` priority that cannot be aborted or have its priority changed.

```js
const promise = scheduler.postTask(myTask);
```

Because the method returns a promise, you can wait on its resolution asynchronously using `then()`, and catch errors thrown by the task callback function (or when the task is aborted) using `catch`. The callback function can be any kind of function (below we demonstrate an arrow function).

```js
scheduler
  .postTask(() => "Task executing")
  // Promise resolved: log task result when promise resolves
  .then((taskResult) => console.log(`${taskResult}`))
  // Promise rejected: log AbortError or errors thrown by task
  .catch((error) => console.error(`Error: ${error}`));
```

The same task might be waited on using `await`/`async` as shown below (note, this is run in an Immediately Invoked Function Expression (IIFE)):

```js
(async () => {
  try {
    const result = await scheduler.postTask(() => "Task executing");
    console.log(result);
  } catch (error) {
    // Log AbortError or error thrown in task function
    console.error(`Error: ${error}`);
  }
})();
```

You can also specify an options object to the `postTask()` method if you want to change the default behavior.
The options are:

- `priority` This allows you to specify a particular immutable priority.
  Once set, the priority cannot be changed.
- `signal` This allows you to specify a signal, which may be either a `TaskSignal` or `AbortSignal`
  The signal is associated with a controller, which can be used to abort the task.
  A `TaskSignal` can also be used to set and change the task priority if the task is mutable.
- `delay` This allows you to specify the delay before the task is added for scheduling, in milliseconds.

The same example as above with a priority option would look like this:

```js
scheduler
  .postTask(() => "Task executing", { priority: "user-blocking" })
  .then((taskResult) => console.log(`${taskResult}`)) // Log the task result
  .catch((error) => console.error(`Error: ${error}`)); // Log any errors
```

### Task priorities

Scheduled tasks are run in priority order, followed by the order that they were added to the scheduler queue.

There are just three priorities, which are listed below (ordered from highest to lowest):

- `user-blocking`
    Tasks that stop users from interacting with the page.
    This includes rendering the page to the point where it can be used, or responding to user input.

- `user-visible`
    Tasks that are visible to the user but not necessarily blocking user actions.
    This might include rendering non-essential parts of the page, such as non-essential images or animations.

    This is the default priority for `scheduler.postTask()` and `scheduler.yield()`.

- `background`
    Tasks that are not time-critical.
    This might include log processing or initializing third-party libraries that aren't required for rendering.

### Mutable and immutable task priority

There are many use cases where the task priority never needs to change, while for others it does.
For example fetching an image might change from a `background` task to `user-visible` as a carousel is scrolled into the viewing area.

Task priorities can be set as static (immutable) or dynamic (modifiable) depending on the arguments passed to `Scheduler.postTask()`.

Task priority is immutable if a value is specified in the `options.priority` argument.
The given value will be used for the task priority and cannot be changed.

The priority is modifiable only if a `TaskSignal` is passed to the `options.signal` argument **and** `options.priority` is **not set**.
In this case the task will take its initial priority from the `signal` priority, and the priority can subsequently be changed by calling `TaskController.setPriority()` on the controller associated with the signal.

If the priority is not set with `options.priority` or by passing a `TaskSignal` to `options.signal` then it defaults to `user-visible` (and is by definition immutable).

Note that a task that needs to be aborted must set `options.signal` to either `TaskSignal` or `AbortSignal`.
However for a task with an immutable priority, `AbortSignal` more clearly indicates that the task priority cannot be changed using the signal.

Let's run through an example to demonstrate what we mean by this. When you have several tasks that are of roughly the same priority, it makes sense to break them down into separate functions to aid with maintenance, debugging, and many other reasons.

For example:

```js
function main() {
  a();
  b();
  c();
  d();
  e();
}
```

However, this kind of structure doesn't help with main thread blocking. Since all five of the tasks are being run inside one main function, the browser runs them all as a single task.

To handle this, we tend to run a function periodically to get the code to _yield to the main thread_. This means that our code is split into multiple tasks, between the execution of which the browser is given the opportunity to handle high-priority tasks such as updating the UI. A common pattern for this function uses `setTimeout()` to postpone execution into a separate task:

```js
function yield() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
```

This can be used inside a task runner pattern like so, to yield to the main thread after each task has been run:

```js
async function main() {
  // Create an array of functions to run
  const tasks = [a, b, c, d, e];

  // Loop over the tasks
  while (tasks.length > 0) {
    // Shift the first task off the tasks array
    const task = tasks.shift();

    // Run the task
    task();

    // Yield to the main thread
    await yield();
  }
}
```

To improve this further, we can use `Scheduler.yield` when available to allow this code to continue executing ahead of other less critical tasks in the queue:

```js
function yield() {
  // Use scheduler.yield if it exists:
  if ("scheduler" in window && "yield" in scheduler) {
    return scheduler.yield();
  }

  // Fall back to setTimeout:
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
```

## Interfaces

- `Scheduler`
    Contains the `postTask()` and `yield()` methods for adding prioritized tasks to be scheduled.
    An instance of this interface is available on the `Window` or `WorkerGlobalScope` global objects (`globalThis.scheduler`).
- `TaskController`
    Supports both aborting a task and changing its priority.
- `TaskSignal`
    A signal object that allows you to abort a task and change its priority, if required, using a `TaskController` object.
- `TaskPriorityChangeEvent`
    The interface for the `prioritychange` event, which is sent when the priority for a task is changed.

> **Note:**
> If the task priority never needs to be changed, you can use an `AbortController` and its associated `AbortSignal` instead of `TaskController` and `TaskSignal`.

### Extensions to other interfaces

- `Window.scheduler` and `WorkerGlobalScope.scheduler`
    These properties are the entry points for using the `Scheduler.postTask()` method in a window or a worker scope, respectively.
