---
title: "TaskSignal: prioritychange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/tasksignal/prioritychange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskSignal: prioritychange event

The **`prioritychange`** event is sent to a `TaskSignal` if its priority is changed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("prioritychange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onprioritychange = (event) => { }
```

## Event type

A `TaskPriorityChangeEvent`. Inherits from `Event`.

## Examples

The example below shows how to listen for the `prioritychange` event on a `TaskSignal`.

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

First we create a controller, and add an event listener to its signal.
When handling the event we use `previousPriority` on the event to get the original priority and `TaskSignal.priority` on the event target to get the new/current priority.

The task is then posted, passing in the signal, and then we immediately change the priority.

```js
if ("scheduler" in this) {
  // Declare a TaskController, setting its signal priority to 'user-blocking'
  const controller = new TaskController({ priority: "user-blocking" });

  // Listen for 'prioritychange' events on the controller's signal.
  controller.signal.addEventListener("prioritychange", (event) => {
    const previousPriority = event.previousPriority;
    const newPriority = event.target.priority;
    myLog(`Priority changed from ${previousPriority} to ${newPriority}.`);
  });

  // Post task using the controller's signal.
  // The signal priority sets the initial priority of the task
  scheduler.postTask(
    () => {
      myLog("Task 1");
    },
    { signal: controller.signal },
  );

  // Change the priority to 'background' using the controller
  controller.setPriority("background");
}
```

> **Note:**
> The code above uses a custom logging function `myLog()` to log to the text area below.
> This is hidden as it isn't relevant to the example.

The output below demonstrates shows that the task's priority changed from `user-blocking` to `background`.
This happens before the task is executed, but could also happen when the task is running.
