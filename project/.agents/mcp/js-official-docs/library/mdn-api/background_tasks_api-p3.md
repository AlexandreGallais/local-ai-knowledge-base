---
title: "Background Tasks API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/background_tasks_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Background Tasks API (part 3 of 3)

### Running tasks

Now that we've got the task management and display maintenance code done, we can actually start setting up code to run tasks that get work done.

#### The task handler

The function we'll be using as our task handler—that is, the function that will be used as the value of the task object's `handler` property—is `logTaskHandler()`. It's a simple function that outputs a bunch of stuff to the log for each task. In your own application, you'd replace this code with whatever task it is you wish to perform during idle time. Just remember that anything you want to do that changes the DOM needs to be handled through `requestAnimationFrame()`.

```js
function logTaskHandler(data) {
  log(`Running task #${currentTaskNumber}`);

  for (let i = 0; i < data.count; i += 1) {
    log(`${(i + 1).toString()}. ${data.text}`);
  }
}
```

#### The main program

Everything is triggered when the user clicks the Start button, which causes the `decodeTechnoStuff()` function to be called.

```js
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

```js
function decodeTechnoStuff() {
  totalTaskCount = 0;
  currentTaskNumber = 0;
  updateDisplay();

  const n = getRandomIntInclusive(100, 200);

  for (let i = 0; i < n; i++) {
    const taskData = {
      count: getRandomIntInclusive(75, 150),
      text: `This text is from task number ${i + 1} of ${n}`,
    };

    enqueueTask(logTaskHandler, taskData);
  }
}

document
  .getElementById("startButton")
  .addEventListener("click", decodeTechnoStuff);
```

`decodeTechnoStuff()` starts by zeroing the values of totalTaskCount (the number of tasks added to the queue so far) and currentTaskNumber (the task currently being run), and then calls `updateDisplay()` to reset the display to its "nothing's happened yet" state.

This example will create a random number of tasks (between 100 and 200 of them). To do so, we use the `getRandomIntInclusive()` function that's provided as an example in the documentation for `Math.random()` to get the number of tasks to create.

Then we start a loop to create the actual tasks. For each task, we create an object, `taskData`, which includes two properties:

- `count` is the number of strings to output into the log from the task.
- `text` is the text to output to the log the number of times specified by `count`.

Each task is then enqueued by calling `enqueueTask()`, passing in `logTaskHandler()` as the handler function and the `taskData` object as the object to pass into the function when it's called.

### Result

Below is the actual functioning result of the code above. Try it out, play with it in your browser's developer tools, and experiment with using it in your own code.

## See also

- `Window.requestIdleCallback()`
- `Window.cancelIdleCallback()`
- `IdleDeadline`
