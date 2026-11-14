---
title: "Using readable streams (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/streams_api/using_readable_streams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using readable streams

As a JavaScript developer, programmatically reading and manipulating streams of data received over the network, chunk by chunk, is very useful! But how do you use the Streams API's readable stream functionality? This article explains the basics.

> **Note:**
> This article assumes that you understand the use cases of readable streams, and are aware of the high-level concepts. If not, we suggest that you first read the Streams concepts and usage overview and dedicated Streams API concepts article, then come back.

> **Note:**
> If you are looking for information on writable streams try Using writable streams instead.

## Finding some examples

We will look at various examples in this article, taken from our dom-examples/streams repo. You can find the full source code there, as well as links to the examples.

## Consuming a fetch as a stream

The Fetch API allows you to fetch resources across the network, providing a modern alternative to XHR. It has a number of advantages, and what is really nice about it is that browsers have recently added the ability to consume a fetch response as a readable stream.

The `Request.body` and `Response.body` properties are available, which are getters exposing the body contents as a readable stream.

As our Simple stream pump example shows (see it live also), exposing it is a matter of just accessing the `body` property of the response:

```js
// Fetch the original image
fetch("./tortoise.png")
  // Retrieve its body as ReadableStream
  .then((response) => response.body);
```

This provides us with a `ReadableStream` object.

### Attaching a reader

Now we've got our streaming body, reading the stream requires attaching a reader to it. This is done using the `ReadableStream.getReader()` method:

```js
// Fetch the original image
fetch("./tortoise.png")
  // Retrieve its body as ReadableStream
  .then((response) => response.body)
  .then((body) => {
    const reader = body.getReader();
    // …
  });
```

Invoking this method creates a reader and locks it to the stream — no other reader may read this stream until this reader is released, e.g., by invoking `ReadableStreamDefaultReader.releaseLock()`.

Also note that the previous example can be reduced by one step, as `response.body` is synchronous and so doesn't need the promise:

```js
// Fetch the original image
fetch("./tortoise.png")
  // Retrieve its body as ReadableStream
  .then((response) => {
    const reader = response.body.getReader();
    // …
  });
```

### Reading the stream

Now you've got your reader attached, you can read data chunks out of the stream using the `ReadableStreamDefaultReader.read()` method. This reads one chunk out of the stream, which you can then do anything you like with. For example, our Simple stream pump example goes on to enqueue each chunk in a new, custom `ReadableStream` (we will find more about this in the next section), then create a new `Response` out of it, consume it as a `Blob`, create an object URL out of that blob using `URL.createObjectURL()`, and then display it on screen in an `` element, effectively creating a copy of the image we originally fetched.

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
  })
  // Create a new response out of the stream
  .then((stream) => new Response(stream))
  // Create an object URL for the response
  .then((response) => response.blob())
  .then((blob) => URL.createObjectURL(blob))
  // Update image
  .then((url) => console.log((image.src = url)))
  .catch((err) => console.error(err));
```

Let's look in detail at how `read()` is used. In the `pump()` function seen above we first invoke `read()`, which returns a promise containing a results object — this has the results of our read in it, in the form `{ done, value }`:

```js
reader.read().then(({ done, value }) => {
  /* … */
});
```

The results can be one of three different types:

- If a chunk is available to read, the promise will be fulfilled with an object of the form `{ value: theChunk, done: false }`.
- If the stream becomes closed, the promise will be fulfilled with an object of the form `{ value: undefined, done: true }`.
- If the stream becomes errored, the promise will be rejected with the relevant error.

Next, we check whether `done` is `true`. If so, there are no more chunks to read (the value is `undefined`) so we return out of the function and close the custom stream with `ReadableStreamDefaultController.close()`:

```js
if (done) {
  controller.close();
  return;
}
```

> **Note:**
> `close()` is part of the new custom stream, not the original stream we are discussing here. We'll explain more about the custom stream in the next section.

If `done` is not `true`, we process the new chunk we've read (contained in the `value` property of the results object) and then call the `pump()` function again to read the next chunk.

```js
// Enqueue the next data chunk into our target stream
controller.enqueue(value);
return pump();
```

This is the standard pattern you'll see when using stream readers:

1. You write a function that starts off by reading the stream.
2. If there is no more stream to read, you return out of the function.
3. If there is more stream to read, you process the current chunk then run the function again.
4. You keep chaining the `pump()` function until there is no more stream to read, in which case step 2 is followed.

Removing all the code to actually perform a "pump", the code might be generalized to something like this:

```js
fetch("http://example.com/somefile.txt")
  // Retrieve its body as ReadableStream
  .then((response) => {
    const reader = response.body.getReader();
    // read() returns a promise that resolves when a value has been received
    reader.read().then(function pump({ done, value }) {
      if (done) {
        // Do something with last chunk of data then exit reader
        return;
      }
      // Otherwise do something here to process current chunk

      // Read some more, and call this function again
      return reader.read().then(pump);
    });
  })
  .catch((err) => console.error(err));
```

> **Note:**
> The function looks as if `pump()` calls itself and leads to a potentially deep recursion.
> However, because `pump` is asynchronous and each `pump()` call is at the end of the promise handler, it's actually analogous to a chain of promise handlers.

Reading the stream is even easier when written using async/await rather than promises:

```js
async function readData(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      // Do something with last chunk of data then exit reader
      return;
    }
    // Otherwise do something here to process current chunk
  }
}
```

## Consuming a fetch() using asynchronous iteration

There is another even simpler way to consume a `fetch()`, which is to iterate the returned `response.body` using the `for await...of` syntax.
This works because the `response.body` returns a `ReadableStream`, which is an async iterable.

Using this approach, the example code in the previous section can be rewritten as shown:

```js
async function readData(url) {
  const response = await fetch(url);
  for await (const chunk of response.body) {
    // Do something with each "chunk"
  }
  // Exit when done
}
```

If you want to stop iterating the stream you can cancel the `fetch()` operation using an `AbortController` and its associated `AbortSignal`:

```js
const aborter = new AbortController();
button.addEventListener("click", () => aborter.abort());
logChunks("http://example.com/somefile.txt", { signal: aborter.signal });

async function logChunks(url, { signal }) {
  const response = await fetch(url, { signal });
  for await (const chunk of response.body) {
    // Do something with the chunk
  }
}
```

Alternatively, you can exit the loop using `break`, as shown in the code below.
Note that code in the loop is only run when the stream has new data to process, so there may be some delay between the signal being aborted and `break` being called.

```js
const aborter = new AbortController();
button.addEventListener("click", () => aborter.abort());
logChunks("http://example.com/somefile.txt", { signal: aborter.signal });

async function logChunks(url, { signal }) {
  const response = await fetch(url);
  for await (const chunk of response.body) {
    if (signal.aborted) break; // just break out of loop
    // Do something with the chunk
  }
}
```

### Example async reader

```js
// A mock push source.
// Used to simulate some random data arriving
class MockPushSource {
  // total amount of data to stream from the push source
  static #maxData = 90;
  // total data read so far (capped to maxData)
  #dataRead = 0;

  // Method returning promise when this push source is readable.
  dataRequest() {
    const result = {
      bytesRead: 8,
      data: "",
    };

    return new Promise((resolve) => {
      if (this.#dataRead >= MockPushSource.#maxData) {
        // Out of data
        result.bytesRead = 0;
        result.data = "";
        resolve(result);
        return;
      }

      // Emulate slow read of data
      setTimeout(() => {
        const numberBytesReceived = 8;
        this.#dataRead += numberBytesReceived;
        result.data = MockPushSource.#randomChars();
        resolve(result);
      }, 500);
    });
  }

  // Dummy close function
  close() {}

  // Return random character string
  static #randomChars(length = 8) {
    let string = "";
    const choices =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      string += choices[Math.floor(Math.random() * choices.length)];
    }
    return string;
  }
}
```

```css
.input {
  float: left;
  width: 50%;
}
.output {
  float: right;
  width: 50%;
  overflow-wrap: break-word;
}
button {
  display: block;
}
```

```html
<button>Cancel stream</button>
<div class="input">
  <h2>Underlying source</h2>
  <ul></ul>
</div>
<div class="output">
  <h2>Consumer</h2>
  <ul></ul>
</div>
```

```js
// Store reference to lists, paragraph and button
const list1 = document.querySelector(".input ul");
const list2 = document.querySelector(".output ul");
const button = document.querySelector("button");

// Create empty string in which to store final result
let result = "";

// Function to log data from underlying source
function logSource(result) {
  const listItem = document.createElement("li");
  listItem.textContent = result;
  list1.appendChild(listItem);
}

// Function to log data from consumer
function logConsumer(result) {
  const listItem = document.createElement("li");
  listItem.textContent = result;
  list2.appendChild(listItem);
}
```

```js
const stream = makePushSourceStream();

function makePushSourceStream() {
  const pushSource = new MockPushSource();

  return new ReadableStream({
    start(controller) {
      readRepeatedly().catch((e) => controller.error(e));
      function readRepeatedly() {
        return pushSource.dataRequest().then((result) => {
          if (result.data.length === 0) {
            logSource(`No data from source: closing`);
            controller.close();
            return;
          }

          logSource(`Enqueue data: ${result.data}`);
          controller.enqueue(result.data);
          return readRepeatedly();
        });
      }
    },

    cancel() {
      logSource(`cancel() called on underlying source`);
      pushSource.close();
    },
  });
}
```

```js
// Monkey patch fetch() so it returns a response that is a mocked stream
window.fetch = async (...args) => ({ body: stream });
```

The code below shows a more complete example.
Here the fetch stream is consumed using the iterator inside a try/catch block.
On each iteration of the loop the code simply logs and counts the received bytes.
If there is an error it logs the issue.
The `fetch()` operation can be canceled using an `AbortSignal`, which would also be logged as an error.

```js
let bytes = 0;

const aborter = new AbortController();
button.addEventListener("click", () => aborter.abort());
logChunks("http://example.com/somefile.txt", { signal: aborter.signal });

async function logChunks(url, { signal }) {
  try {
    const response = await fetch(url, signal);
    for await (const chunk of response.body) {
      if (signal.aborted) throw signal.reason;
      bytes += chunk.length;
      logConsumer(`Chunk: ${chunk}. Read ${bytes} characters.`);
    }
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(e);
      logConsumer("TypeError: Browser may not support async iteration");
    } else {
      logConsumer(`Error in async iterator: ${e}.`);
    }
  }
}
```

The example log below shows the code running or reports that your browser does not support async iteration of `ReadableStream`.
The right-hand side shows the received chunks; you can press the cancel button to stop the fetch.

> **Note:**
> This fetch operation is _mocked_ for the purpose of demonstration, and just returns a `ReadableStream` that generates random chunks of text.
> The "Underlying source" on the left below is the data being generated in the mocked source, while the column on the right is log from the consumer.
> (The code for the mocked source is not displayed as it is not relevant to the example.)
