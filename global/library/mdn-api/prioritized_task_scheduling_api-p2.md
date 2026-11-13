---
title: "Prioritized Task Scheduling API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/prioritized_task_scheduling_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Prioritized Task Scheduling API (part 2 of 2)

## Examples

Note that the examples below use `myLog()` to write to a text area.
The code for the log area and method is generally hidden to not distract from more relevant code.

```html
<textarea id="log"></textarea>
```

```css
#log {
  min-height: 20px;
  width: 95%;
}
```

```js
// hidden logger code - simplifies example
let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
```

### Feature checking

Check whether prioritized task scheduling is supported by testing for the `scheduler` property in the global scope.

The code below prints "Feature: Supported" if the API is supported on this browser.

```html
<textarea id="log"></textarea>
```

```css
#log {
  min-height: 20px;
  width: 95%;
}
```

```js
// hidden logger code - simplifies example
let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
```

```js
// Check that feature is supported
if ("scheduler" in globalThis) {
  myLog("Feature: Supported");
} else {
  myLog("Feature: NOT Supported");
}
```

### Basic usage

Tasks are posted using `Scheduler.postTask()`, specifying a callback function (task) in the first argument, and an optional second argument that can be used to specify a task priority, signal, and/or delay.
The method returns a `Promise` that resolves with the return value of the callback function, or rejects with either an abort error or an error thrown in the function.

```html
<textarea id="log"></textarea>
```

```css
#log {
  min-height: 100px;
  width: 95%;
}
```

```js
let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
```

Because it returns a promise, `Scheduler.postTask()` can be chained with other promises.
Below we show how to wait on the promise to resolve using `then`.
This uses the default priority (`user-visible`).

```js
// A function that defines a task
function myTask() {
  return "Task 1: user-visible";
}

if ("scheduler" in this) {
  // Post task with default priority: 'user-visible' (no other options)
  // When the task resolves, Promise.then() logs the result.
  scheduler.postTask(myTask).then((taskResult) => myLog(`${taskResult}`));
}
```

The method can also be used with `await` inside an async function.
The code below shows how you might use this approach to wait on a `user-blocking` task.

```js
function myTask2() {
  return "Task 2: user-blocking";
}

async function runTask2() {
  const result = await scheduler.postTask(myTask2, {
    priority: "user-blocking",
  });
  myLog(result); // Logs 'Task 2: user-blocking'.
}
runTask2();
```

In some cases you might not need to wait on completion at all.
For simplicity many of the examples here simply log the result as the task executes.

```js
// A function that defines a task
function myTask3() {
  myLog("Task 3: user-visible");
}

if ("scheduler" in this) {
  // Post task and log result when it runs
  scheduler.postTask(myTask3);
}
```

The log below shows the output of the three tasks above.
Note that the order they are run depends on the priority first, and then the declaration order.

### Permanent priorities

Task priorities may be set using `priority` parameter in the optional second argument.
Priorities that are set in this way are immutable (cannot be changed).

Below we post two groups of three tasks, each member in reverse order of priority.
The final task has the default priority.
When run, each task simply logs its expected order (we're not waiting on the result because we don't need to in order to show execution order).

```js
let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
```

```js
if ("scheduler" in this) {
  // three tasks, in reverse order of priority
  scheduler.postTask(() => myLog("bkg 1"), { priority: "background" });
  scheduler.postTask(() => myLog("usr-vis 1"), { priority: "user-visible" });
  scheduler.postTask(() => myLog("usr-blk 1"), { priority: "user-blocking" });

  // three more tasks, in reverse order of priority
  scheduler.postTask(() => myLog("bkg 2"), { priority: "background" });
  scheduler.postTask(() => myLog("usr-vis 2"), { priority: "user-visible" });
  scheduler.postTask(() => myLog("usr-blk 2"), { priority: "user-blocking" });

  // Task with default priority: user-visible
  scheduler.postTask(() => myLog("usr-vis 3 (default)"));
}
```

```html
<textarea id="log"></textarea>
```

```css
#log {
  min-height: 120px;
  width: 95%;
}
```

The output below shows that the tasks are executed in priority order, and then declaration order.

### Changing task priorities

Task priorities can also take their initial value from a `TaskSignal` passed to `postTask()` in the optional second argument.
If set in this way, the priority of the task can then be changed using the controller associated with the signal.

> **Note:**
> Setting and changing task priorities using a signal only works when the `options.priority` argument to `postTask()` is not set, and when the `options.signal` is a `TaskSignal` (and not an `AbortSignal`).

The code below first shows how to create a `TaskController`, setting the initial priority of its signal to `user-blocking` in the `TaskController()` constructor.

The code then uses `addEventListener()` to add an event listener to the controller's signal (we could alternatively use the `TaskSignal.onprioritychange` property to add an event handler).
The event handler uses `previousPriority` on the event to get the original priority and `TaskSignal.priority` on the event target to get the new/current priority.

The task is then posted, passing in the signal, and then we immediately change the priority to `background` by calling `TaskController.setPriority()` on the controller.

```html
<textarea id="log"></textarea>
```

```css
#log {
  min-height: 70px;
  width: 95%;
}
```

```js
let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
```

```js
if ("scheduler" in this) {
  // Create a TaskController, setting its signal priority to 'user-blocking'
  const controller = new TaskController({ priority: "user-blocking" });

  // Listen for 'prioritychange' events on the controller's signal.
  controller.signal.addEventListener("prioritychange", (event) => {
    const previousPriority = event.previousPriority;
    const newPriority = event.target.priority;
    myLog(`Priority changed from ${previousPriority} to ${newPriority}.`);
  });

  // Post task using the controller's signal.
  // The signal priority sets the initial priority of the task
  scheduler.postTask(() => myLog("Task 1"), { signal: controller.signal });

  // Change the priority to 'background' using the controller
  controller.setPriority("background");
}
```

The output below demonstrates that the priority was successfully changed to `background` from `user-blocking`.
Note that in this case the priority is changed before the task is executed, but it could equally have been changed while the task was running.

### Aborting tasks

Tasks can be aborted using either `TaskController` and `AbortController`, in exactly the same way.
The only difference is that you must use `TaskController` if you also want to set the task priority.

```html
<textarea id="log"></textarea>
```

```css
#log {
  min-height: 50px;
  width: 95%;
}
```

```js
let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
```

The code below creates a controller and passes its signal to the task.
The task is then immediately aborted.
This causes the promise to be rejected with an `AbortError`, which is caught in the `catch` block and logged.
Note that we could also have listened for the `abort` event fired on the `TaskSignal` or `AbortSignal` and logged the abort there.

```js
if ("scheduler" in this) {
  // Declare a TaskController with default priority
  const abortTaskController = new TaskController();
  // Post task passing the controller's signal
  scheduler
    .postTask(() => myLog("Task executing"), {
      signal: abortTaskController.signal,
    })
    .then((taskResult) => myLog(`${taskResult}`)) // This won't run!
    .catch((error) => myLog(`Error: ${error}`)); // Log the error

  // Abort the task
  abortTaskController.abort();
}
```

The log below shows the aborted task.

### Delaying tasks

Tasks can be delayed by specifying an integer number of milliseconds in the `options.delay` parameter to `postTask()`.
This effectively adds the task to the prioritized queue on a timeout, as might be created using `setTimeout()`.
The `delay` is the minimum amount of time before the task is added to the scheduler; it may be longer.

```html
<textarea id="log"></textarea>
```

```css
#log {
  min-height: 50px;
  width: 95%;
}
```

```js
let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
```

The code below shows two tasks added (as arrow functions) with a delay.

```js
if ("scheduler" in this) {
  // Post task as arrow function with delay of 2 seconds
  scheduler
    .postTask(() => "Task delayed by 2000ms", { delay: 2000 })
    .then((taskResult) => myLog(`${taskResult}`));
  scheduler
    .postTask(() => "Next task should complete in about 2000ms", { delay: 1 })
    .then((taskResult) => myLog(`${taskResult}`));
}
```

Refresh the page.
Note that the second string appears in log after about 2 seconds.

## See also

- Building a Faster Web Experience with the postTask Scheduler on the Airbnb blog (2021)
- Optimizing long tasks on web.dev (2022)
