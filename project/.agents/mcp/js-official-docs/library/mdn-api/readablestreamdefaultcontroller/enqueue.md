---
title: "ReadableStreamDefaultController: enqueue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreamdefaultcontroller/enqueue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamDefaultController: enqueue() method

The **`enqueue()`** method of the
`ReadableStreamDefaultController` interface enqueues a given chunk in the associated stream.

## Syntax

```js
enqueue(chunk)
```

### Parameters

- `chunk`
    The chunk to enqueue.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if `enqueue()` is called when the stream is not readable — because it is already closed, canceled, or errored — or because it has been requested to close by the underlying source but it has not yet done so because there are still enqueued chunks to read.

## Examples

In the following simple example, a custom `ReadableStream` is created using
a constructor (see our Simple random stream example for the full code). The `start()` function generates a
random string of text every second and enqueues it into the stream — see
`controller.enqueue(string)`. A `cancel()` function is also
provided to stop the generation if `ReadableStream.cancel()` is called for
any reason.

When a button is pressed, the generation is stopped, the stream is closed using
`ReadableStreamDefaultController.close()`, and another function is run,
which reads the data back out of the stream.

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

- Using readable streams
- `ReadableStreamDefaultController`
