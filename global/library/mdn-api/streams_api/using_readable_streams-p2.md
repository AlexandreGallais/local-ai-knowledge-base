---
title: "Using readable streams (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/streams_api/using_readable_streams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using readable streams (part 2 of 2)

## Creating your own custom readable stream

The Simple stream pump example we've been studying throughout this article includes a second part — once we've read the image from the fetch body in chunks, we then enqueue them into another, custom stream of our own creation. How do we create this? The `ReadableStream()` constructor.

### The ReadableStream() constructor

It is easy to read from a stream when the browser provides it for you as in the case of Fetch, but sometimes you need to create a custom stream and populate it with your own chunks. The `ReadableStream()` constructor allows you to do this via a syntax that looks complex at first, but actually isn't too bad.

The generic syntax skeleton looks like this:

```js
const stream = new ReadableStream(
  {
    start(controller) {},
    pull(controller) {},
    cancel() {},
    type,
    autoAllocateChunkSize,
  },
  {
    highWaterMark: 3,
    size: () => 1,
  },
);
```

The constructor takes two objects as parameters. The first object is required, and creates a model in JavaScript of the underlying source the data is being read from. The second object is optional, and allows you to specify a custom queuing strategy to use for your stream. You'll rarely have to do this, so we'll just concentrate on the first one for now.

The first object can contain up to five members, only the first of which is required:

1. `start(controller)` — A method that is called once, immediately after the `ReadableStream` is constructed. Inside this method, you should include code that sets up the stream functionality, e.g., beginning generation of data or otherwise getting access to the source.
2. `pull(controller)` — A method that, when included, is called repeatedly until the stream's internal queue is full. This can be used to control the stream as more chunks are enqueued.
3. `cancel()` — A method that, when included, will be called if the app signals that the stream is to be canceled (e.g., if `ReadableStream.cancel()` is called). The contents should do whatever is necessary to release access to the stream source.
4. `type` and `autoAllocateChunkSize` — These are used — when included — to signify that the stream is to be a bytestream.
   Bytestreams are covered separately in Using readable byte streams, as they are somewhat different in purpose and use case to regular (default) streams.

Looking at our simple example code again, you can see that our `ReadableStream()` constructor only includes a single method — `start()`, which serves to read all the data out of our fetch stream.

```js
// Fetch the original image
fetch("./tortoise.png")
  // Retrieve its body as ReadableStream
  .then((response) => {
    const reader = response.body.getReader();
    return new ReadableStream({
      start(controller) {
        return pump();
        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          });
        }
      },
    });
  });
```

### ReadableStream controllers

You'll notice that the `start()` and `pull()` methods passed into the `ReadableStream()` constructor are given `controller` parameters — these are instances of the `ReadableStreamDefaultController` class, which can be used to control your stream.

In our example we are using the controller's `enqueue()` method to enqueue a value into the custom stream after it is read from the fetch body.

In addition, when we are done reading the fetch body we use the controller's `close()` method to close the custom stream — any previously-enqueued chunks can still be read from it, but no more can be enqueued, and the stream is closed when reading has finished.

### Reading from custom streams

In our Simple stream pump example, we consume the custom readable stream by passing it into a `Response` constructor call, after which we consume it as a `blob()`.

```js
readableStream
  .then((stream) => new Response(stream))
  .then((response) => response.blob())
  .then((blob) => URL.createObjectURL(blob))
  .then((url) => console.log((image.src = url)))
  .catch((err) => console.error(err));
```

But a custom stream is still a `ReadableStream` instance, meaning you can attach a reader to it. As an example, have a look at our Simple random stream demo (see it live also), which creates a custom stream, enqueues some random strings into it, and then reads the data out of the stream again once the _Stop string generation_ button is pressed.

> **Note:**
> In order to consume a stream using `FetchEvent.respondWith()`, the enqueued stream contents must be of type `Uint8Array`; for example, encoded using `TextEncoder`.

The custom stream constructor has a `start()` method that uses a `setInterval()` call to generate a random string every second. `ReadableStreamDefaultController.enqueue()` is then used to enqueue it into the stream. When the button is pressed, the interval is canceled, and a function called `readStream()` is invoked to read the data back out of the stream again. We also close the stream, as we've stopped enqueuing chunks to it.

```js
let interval;
const stream = new ReadableStream({
  start(controller) {
    interval = setInterval(() => {
      const string = randomChars();
      // Add the string to the stream
      controller.enqueue(string);
      // show it on the screen
      const listItem = document.createElement("li");
      listItem.textContent = string;
      list1.appendChild(listItem);
    }, 1000);
    button.addEventListener("click", () => {
      clearInterval(interval);
      readStream();
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

In the `readStream()` function itself, we lock a reader to the stream using `ReadableStream.getReader()`, then follow the same kind of pattern we saw earlier — reading each chunk with `read()`, checking whether `done` is `true` and then ending the process if so, and reading the next chunk and processing it if not, before running the `read()` method again.

```js
function readStream() {
  const reader = stream.getReader();
  let charsReceived = 0;
  let result = "";

  // read() returns a promise that resolves
  // when a value has been received
  reader.read().then(function processText({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (done) {
      console.log("Stream complete");
      para.textContent = result;
      return;
    }

    charsReceived += value.length;
    const chunk = value;
    const listItem = document.createElement("li");
    listItem.textContent = `Read ${charsReceived} characters so far. Current chunk = ${chunk}`;
    list2.appendChild(listItem);

    result += chunk;

    // Read some more, and call this function again
    return reader.read().then(processText);
  });
}
```

### Closing and canceling streams

We've already shown examples of using `ReadableStreamDefaultController.close()` to close a reader. As we said before, any previously enqueued chunks will still be read, but no more can be enqueued because it is closed.

If you wanted to completely get rid of the stream and discard any enqueued chunks, you'd use `ReadableStream.cancel()` or `ReadableStreamDefaultReader.cancel()`.

## Teeing a stream

Sometimes you might want to read a stream twice, simultaneously. This is achieved via the `ReadableStream.tee()` method — it outputs an array containing two identical copies of the original readable stream, which can then be read independently by two separate readers.

You might do this for example in a ServiceWorker if you want to fetch a response from the server and stream it to the browser, but also stream it to the Service Worker cache. Since a response body cannot be consumed more than once, and a stream can't be read by more than one reader at once, you'd need two copies to do this.

We provide an example of this in our Simple tee example (see it live also). This example works much the same way as our Simple random stream, except that when the button is pressed to stop generating random strings, the custom stream is taken and teed, and both resulting streams are then read:

```js
function teeStream() {
  const teedOff = stream.tee();
  readStream(teedOff[0], list2);
  readStream(teedOff[1], list3);
}
```

## Pipe chains

Another feature of streams is the ability to pipe streams into one another (called a pipe chain). This involves two methods — `ReadableStream.pipeThrough()`, which pipes a readable stream through a writer/reader pair to transform one data format into another, and `ReadableStream.pipeTo()`, which pipes a readable stream to a writer acting as an end point for the pipe chain.

We do have an example called Unpack Chunks of a PNG (see it live also) that fetches an image as a stream, then pipes it through to a custom PNG transform stream that retrieves PNG chunks out of a binary data stream.

```js
// Fetch the original image
fetch("png-logo.png")
  // Retrieve its body as ReadableStream
  .then((response) => response.body)
  // Create a gray-scaled PNG stream out of the original
  .then((rs) => logReadableStream("Fetch Response Stream", rs))
  .then((body) => body.pipeThrough(new PNGTransformStream()))
  .then((rs) => logReadableStream("PNG Chunk Stream", rs));
```

We don't yet have an example that uses `TransformStream`.

## Summary

That explains the basics of "default" readable streams.

See Using readable byte streams for information about how to use readable _byte_ streams: streams with an underlying byte source that can perform efficient zero-copy transfers to a consumer, bypassing the stream's internal queues.
