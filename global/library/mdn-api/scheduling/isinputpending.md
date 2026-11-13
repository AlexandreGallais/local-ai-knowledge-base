---
title: "Scheduling: isInputPending() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/scheduling/isinputpending/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Scheduling: isInputPending() method

The **`isInputPending()`** method of the `Scheduling` interface allows you to check whether there are pending input events in the event queue, indicating that the user is attempting to interact with the page.

This feature can be useful in situations where you have a queue of tasks to run, and you want to yield to the main thread regularly to allow user interaction to occur so that the app is kept as responsive and performant as possible. `isInputPending()` allows you to yield only when there is input pending, rather than having to do it at arbitrary intervals.

> **Warning:**
> The `isInputPending()` method has been superseded by features available on the `Scheduler` interface such as `yield()`, which are better designed for addressing scheduling tasks. See Don't use `isInputPending()` for more details.

`isInputPending()` is called using `navigator.scheduling.isInputPending()`.

## Syntax

```js
isInputPending()
isInputPending(options)
```

### Parameters

- `options` (optional)
    An object providing options. Currently, the only option is:
    - `includeContinuous` (optional)
        A boolean, which is `false` by default. If set to `true`, it indicates that continuous events should be considered when checking for pending input. Continuous events are trusted events (events dispatched by the browser) that are fired successively, such as `mousemove`, `wheel`, `touchmove`, `drag`, `pointermove`, and `pointerrawupdate`.

### Return value

A boolean that indicates whether there are pending input events in the event queue (`true`) or not (`false`).

## Examples

We can use `isInputPending()` inside a task runner structure to run the `yield()` function only when the user is attempting to interact with the page:

```js
function yield() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

async function main() {
  // Create an array of functions to run
  const tasks = [a, b, c, d, e];

  while (tasks.length > 0) {
    // Yield to a pending user input
    if (navigator.scheduling.isInputPending()) {
      await yield();
    } else {
      // Shift the first task off the tasks array
      const task = tasks.shift();

      // Run the task
      task();
    }
  }
}
```

This allows you to avoid blocking the main thread when the user is actively interacting with the page, potentially providing a smoother user experience. However, by only yielding when necessary, we can continue running the current task when there are no user inputs to process. This also avoids tasks being placed at the back of the queue behind other non-essential browser-initiated tasks that were scheduled after the current one.

## See also

- `Scheduler` interface
- `Prioritized Task Scheduling API`
- Faster input events with Facebook's first browser API contribution on engineering.fb.com (2019)
- Better JS scheduling with isInputPending() on developer.chrome.com (2020)
- Optimizing long tasks on web.dev (2022)
