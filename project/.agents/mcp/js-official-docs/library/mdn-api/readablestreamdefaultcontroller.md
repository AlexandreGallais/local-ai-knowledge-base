---
title: "ReadableStreamDefaultController"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreamdefaultcontroller/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamDefaultController

The **`ReadableStreamDefaultController`** interface of the Streams API represents a controller allowing control of a `ReadableStream`'s state and internal queue. Default controllers are for streams that are not byte streams.

## Constructor

None. `ReadableStreamDefaultController` instances are created automatically during `ReadableStream` construction.

## Instance properties

- `ReadableStreamDefaultController.desiredSize` (read-only)
    Returns the desired size required to fill the stream's internal queue.

## Instance methods

- `ReadableStreamDefaultController.close()`
    Closes the associated stream.
- `ReadableStreamDefaultController.enqueue()`
    Enqueues a given chunk in the associated stream.
- `ReadableStreamDefaultController.error()`
    Causes any future interactions with the associated stream to error.

## Examples

In the following simple example, a custom `ReadableStream` is created using a constructor (see our Simple random stream example for the full code). The `start()` function generates a random string of text every second and enqueues it into the stream. A `cancel()` function is also provided to stop the generation if `ReadableStream.cancel()` is called for any reason.

Note that a `ReadableStreamDefaultController` object is provided as the parameter of the `start()` and `pull()` functions.

When a button is pressed, the generation is stopped, the stream is closed using `ReadableStreamDefaultController.close()`, and another function is run, which reads the data back out of the stream.

```js
let interval;
const stream = new ReadableStream({
  start(controller) {
    interval = setInterval(() => {
      let string = randomChars();

      // Add the string to the stream
      controller.enqueue(string);

      // show it on the screen
      let listItem = document.createElement("li");
      listItem.textContent = string;
      list1.appendChild(listItem);
    }, 1000);

    button.addEventListener("click", () => {
      clearInterval(interval);
      fetchStream();
      controller.close();
    });
  },
  pull(controller) {
    // We don't really need a pull in this example
  },
  cancel() {
    // This is called if the reader cancels,
    // so we should stop generating strings
    clearInterval(interval);
  },
});
```

## See also

- Streams API concepts
- Using readable streams
- `ReadableStream`
