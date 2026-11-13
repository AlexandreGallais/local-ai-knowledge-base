---
title: "Background Tasks API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/background_tasks_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Background Tasks API (part 2 of 3)

## Example

In this example, we'll take a look at how you can use `requestIdleCallback()` to run time-consuming, low-priority tasks during time the browser would otherwise be idle. In addition, this example demonstrates how to schedule updates to the document content using `requestAnimationFrame()`.

Below you'll find only the HTML and JavaScript for this example. The CSS is not shown, since it's not particularly crucial to understanding this functionality.

### HTML

In order to be oriented about what we're trying to accomplish, let's have a look at the HTML. This establishes a box (`id="container"`) that's used to present the progress of an operation (because you never know how long decoding "quantum filament tachyon emissions" will take, after all) as well as a second main box (`id="logBox"`), which is used to display textual output.

```html
<p>
  Demonstration of using cooperatively scheduled background tasks using the
  <code>requestIdleCallback()</code> method.
</p>

<div id="container">
  <div class="label">Decoding quantum filament tachyon emissions…</div>

  <progress id="progress" value="0"></progress>

  <button class="button" id="startButton">Start</button>

  <div class="label counter">
    Task <span id="currentTaskNumber">0</span> of
    <span id="totalTaskCount">0</span>
  </div>
</div>

<div id="logBox">
  <div class="logHeader">Log</div>
  <div id="log"></div>
</div>
```

The progress box uses a `<progress>` element to show the progress, along with a label with sections that are changed to present numeric information about the progress. In addition, there's a "Start" button (creatively given the ID "startButton"), which the user will use to start the data processing.

```css
body {
  font-family: "Open Sans", "Lucida Grande", "Arial", sans-serif;
  font-size: 16px;
}

#logBox {
  margin-top: 16px;
  width: 400px;
  height: 500px;
  border-radius: 6px;
  border: 1px solid black;
  box-shadow: 4px 4px 2px black;
}

.logHeader {
  margin: 0;
  padding: 0 6px 4px;
  height: 22px;
  background-color: lightblue;
  border-bottom: 1px solid black;
  border-radius: 6px 6px 0 0;
}

#log {
  font:
    12px "Courier",
    monospace;
  padding: 6px;
  overflow: auto;
  overflow-y: scroll;
  width: 388px;
  height: 460px;
}

#container {
  width: 400px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid black;
  box-shadow: 4px 4px 2px black;
  display: block;
  overflow: auto;
}

.label {
  display: inline-block;
}

.counter {
  text-align: right;
  padding-top: 4px;
  float: right;
}

.button {
  padding-top: 2px;
  padding-bottom: 4px;
  width: 100px;
  display: inline-block;
  float: left;
  border: 1px solid black;
  cursor: pointer;
  text-align: center;
  margin-top: 0;
  color: white;
  background-color: darkgreen;
}

#progress {
  width: 100%;
  padding-top: 6px;
}
```

### JavaScript

Now that the document structure is defined, construct the JavaScript code that will do the work. The goal: to be able to add requests to call functions to a queue, with an idle callback that runs those functions whenever the system is idle for long enough a time to make progress.

#### Variable declarations

```js
const taskList = [];
let totalTaskCount = 0;
let currentTaskNumber = 0;
let taskHandle = null;
```

These variables are used to manage the list of tasks that are waiting to be performed, as well as status information about the task queue and its execution:

- `taskList` is an `Array` of objects, each representing one task waiting to be run.
- `totalTaskCount` is a counter of the number of tasks that have been added to the queue; it will only go up, never down. We use this to do the math to present progress as a percentage of total work to do.
- `currentTaskNumber` is used to track how many tasks have been processed so far.
- `taskHandle` is a reference to the task currently being processed.

```js
const totalTaskCountElem = document.getElementById("totalTaskCount");
const currentTaskNumberElem = document.getElementById("currentTaskNumber");
const progressBarElem = document.getElementById("progress");
const startButtonElem = document.getElementById("startButton");
const logElem = document.getElementById("log");
```

Next we have variables which reference the DOM elements we need to interact with. These elements are:

- `totalTaskCountElem` is the `` we use to insert the total number of tasks created into the status display in the progress box.
- `currentTaskNumberElem` is the element used to display the number of tasks processed so far.
- `progressBarElem` is the `<progress>` element showing the percentage of the tasks processed so far.
- `startButtonElem` is the start button.
- `logElem` is the `` we'll insert logged text messages into.

```js
let logFragment = null;
let statusRefreshScheduled = false;
```

Finally, we set up a couple of variables for other items:

- `logFragment` will be used to store a `DocumentFragment` that's generated by our logging functions to create content to append to the log when the next animation frame is rendered.
- `statusRefreshScheduled` is used to track whether or not we've already scheduled an update of the status display box for the upcoming frame, so that we only do it once per frame

```js
window.requestIdleCallback ||= (handler) => {
  const startTime = Date.now();

  return setTimeout(() => {
    handler({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50.0 - (Date.now() - startTime));
      },
    });
  }, 1);
};

window.cancelIdleCallback ||= (id) => {
  clearTimeout(id);
};
```

#### Managing the task queue

Next, let's look at the way we manage the tasks that need to be performed. We're going to do this by creating a FIFO queue of tasks, which we'll run as time allows during the idle callback period.

##### Enqueueing tasks

First, we need a function that enqueues tasks for future execution. That function, `enqueueTask()`, looks like this:

```js
function enqueueTask(taskHandler, taskData) {
  taskList.push({
    handler: taskHandler,
    data: taskData,
  });

  totalTaskCount++;

  taskHandle ||= requestIdleCallback(runTaskQueue, { timeout: 1000 });

  scheduleStatusRefresh();
}
```

`enqueueTask()` accepts as input two parameters:

- `taskHandler` is a function which will be called to handle the task.
- `taskData` is an object which is passed into the task handler as an input parameter, to allow the task to receive custom data.

To enqueue the task, we push an object onto the `taskList` array; the object contains the `taskHandler` and `taskData` values under the names `handler` and `data`, respectively, then increment `totalTaskCount`, which reflects the total number of tasks which have ever been enqueued (we don't decrement it when tasks are removed from the queue).

Next, we check to see if we already have an idle callback created; if `taskHandle` is 0, we know there isn't an idle callback yet, so we call `requestIdleCallback()` to create one. It's configured to call a function called `runTaskQueue()`, which we'll look at shortly, and with a `timeout` of 1 second, so that it will be run at least once per second even if there isn't any actual idle time available.

##### Running tasks

Our idle callback handler, `runTaskQueue()`, gets called when the browser determines there's enough idle time available to let us do some work or our timeout of one second expires. This function's job is to run our enqueued tasks.

```js
function runTaskQueue(deadline) {
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    taskList.length
  ) {
    const task = taskList.shift();
    currentTaskNumber++;

    task.handler(task.data);
    scheduleStatusRefresh();
  }

  if (taskList.length) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  } else {
    taskHandle = 0;
  }
}
```

`runTaskQueue()`'s core is a loop which continues as long as there's time left (as determined by checking `deadline.timeRemaining`) to be sure it's more than 0 or if the timeout limit was reached (`deadline.didTimeout` is true), and as long as there are tasks in the task list.

For each task in the queue that we have time to execute, we do the following:

1. We remove the task object from the queue.
2. We increment `currentTaskNumber` to track how many tasks we've executed.
3. We call the task's handler, `task.handler`, passing into it the task's data object (`task.data`).
4. We call a function, `scheduleStatusRefresh()`, to handle scheduling a screen update to reflect changes to our progress.

When time runs out, if there are still tasks left in the list, we call `requestIdleCallback()` again so that we can continue to process the tasks the next time there's idle time available. If the queue is empty, we set taskHandle to 0 to indicate that we don't have a callback scheduled. That way, we'll know to request a callback next time `enqueueTask()` is called.

#### Updating the status display

One thing we want to be able to do is update our document with log output and progress information. However, you can't safely change the DOM from within an idle callback. Instead, we'll use `requestAnimationFrame()` to ask the browser to call us when it's safe to update the display.

##### Scheduling display updates

DOM changes are scheduled by calling the `scheduleStatusRefresh()` function.

```js
function scheduleStatusRefresh() {
  if (!statusRefreshScheduled) {
    requestAnimationFrame(updateDisplay);
    statusRefreshScheduled = true;
  }
}
```

This is a simple function. It checks to see if we've already scheduled a display refresh by checking the value of `statusRefreshScheduled`. If it's `false`, we call `requestAnimationFrame()` to schedule a refresh, providing the `updateDisplay()` function to be called to handle that work.

##### Updating the display

The `updateDisplay()` function is responsible for drawing the contents of the progress box and the log. It's called by the browser when the DOM is in a safe condition for us to apply changes during the process of rendering the next frame.

```js
function updateDisplay() {
  const scrolledToEnd =
    logElem.scrollHeight - logElem.clientHeight <= logElem.scrollTop + 1;

  if (totalTaskCount) {
    if (progressBarElem.max !== totalTaskCount) {
      totalTaskCountElem.textContent = totalTaskCount;
      progressBarElem.max = totalTaskCount;
    }

    if (progressBarElem.value !== currentTaskNumber) {
      currentTaskNumberElem.textContent = currentTaskNumber;
      progressBarElem.value = currentTaskNumber;
    }
  }

  if (logFragment) {
    logElem.appendChild(logFragment);
    logFragment = null;
  }

  if (scrolledToEnd) {
    logElem.scrollTop = logElem.scrollHeight - logElem.clientHeight;
  }

  statusRefreshScheduled = false;
}
```

First, `scrolledToEnd` is set to `true` if the text in the log is scrolled to the bottom; otherwise it's set to `false`. We'll use that to determine if we should update the scroll position to ensure that the log stays at the end when we're done adding content to it.

Next, we update the progress and status information if any tasks have been enqueued.

1. If the current maximum value of the progress bar is different from the current total number of enqueued tasks (`totalTaskCount`), then we update the contents of the displayed total number of tasks (`totalTaskCountElem`) and the maximum value of the progress bar, so that it scales properly.
2. We do the same thing with the number of tasks processed so far; if `progressBarElem.value` is different from the task number currently being processed (`currentTaskNumber`), then we update the displayed value of the currently-being-processed task and the current value of the progress bar.

Then, if there's text waiting to be added to the log (that is, if `logFragment` isn't `null`), we append it to the log element using `Element.appendChild()` and set `logFragment` to `null` so we don't add it again.

If the log was scrolled to the end when we started, we make sure it still is. Then we set `statusRefreshScheduled` to `false` to indicate that we've handled the refresh and that it's safe to request a new one.

#### Adding text to the log

The `log()` function adds the specified text to the log. Since we don't know at the time `log()` is called whether or not it's safe to immediately touch the DOM, we will cache the log text until it's safe to update. Above, in the code for `updateDisplay()`, you can find the code that actually adds the logged text to the log element when the animation frame is being updated.

```js
function log(text) {
  logFragment ??= document.createDocumentFragment();
  const el = document.createElement("div");
  el.textContent = text;
  logFragment.appendChild(el);
}
```

First, we create a `DocumentFragment` object named `logFragment` if one doesn't currently exist. This element is a pseudo-DOM into which we can insert elements without immediately changing the main DOM itself.

We then create a new `` element and set its contents to match the input `text`.
Then we append the new element to the end of the pseudo-DOM in `logFragment`.
`logFragment` will accumulate log entries until the next time `updateDisplay()` is called, once the DOM is ready for the changes.
