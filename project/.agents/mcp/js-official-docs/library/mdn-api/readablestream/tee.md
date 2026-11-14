---
title: "ReadableStream: tee() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestream/tee/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStream: tee() method

The **`tee()`** method of the
`ReadableStream` interface tees the current readable stream, returning a
two-element array containing the two resulting branches as
new `ReadableStream` instances.

This is useful for allowing two readers to read a stream sequentially or simultaneously,
perhaps at different speeds.
For example, you might do this in a ServiceWorker if you want to fetch
a response from the server and stream it to the browser, but also stream it to the
ServiceWorker cache. Since a response body cannot be consumed more than once, you'd need
two copies to do this.

A teed stream will partially signal backpressure at the rate of the _faster_ consumer
of the two `ReadableStream` branches,
and unread data is enqueued internally on the slower consumed `ReadableStream`
without any limit or backpressure.
That is, when _both_ branches have an unread element in their internal queue,
then the original `ReadableStream`'s controller's internal queue will start to fill up,
and once its `desiredSize` ≤ 0
or byte stream controller `desiredSize` ≤ 0,
then the controller will stop calling `pull(controller)` on the
underlying source passed to `ReadableStream()`.
If only one branch is consumed, then the entire body will be enqueued in memory.
Therefore, you should not use the built-in `tee()` to read very large streams
in parallel at different speeds.
Instead, search for an implementation that fully backpressures
to the speed of the _slower_ consumed branch.

To cancel the stream you then need to cancel both resulting branches. Teeing a stream
will generally lock it for the duration, preventing other readers from locking it.

## Syntax

```js
tee()
```

### Parameters

None.

### Return value

An `Array` containing two `ReadableStream` instances.

### Exceptions

- `TypeError`
    Thrown if the source stream is not a `ReadableStream`.

## Examples

In the following simple example, a previously-created stream is teed, then both
resulting streams (contained in two members of a generated array) are passed to a
function that reads the data out of the two streams and prints each stream's chunks
sequentially to a different part of the UI. See Simple tee example for the full code.

```js
function teeStream() {
  const teedOff = stream.tee();
  fetchStream(teedOff[0], list2);
  fetchStream(teedOff[1], list3);
}

function fetchStream(stream, list) {
  const reader = stream.getReader();
  let charsReceived = 0;

  // read() returns a promise that resolves
  // when a value has been received
  reader.read().then(function processText({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (done) {
      console.log("Stream complete");
      return;
    }

    // value for fetch streams is a Uint8Array
    charsReceived += value.length;
    const chunk = value;
    let listItem = document.createElement("li");
    listItem.textContent = `Read ${charsReceived} characters so far. Current chunk = ${chunk}`;
    list.appendChild(listItem);

    // Read some more, and call this function again
    return reader.read().then(processText);
  });
}
```

## See also

- `ReadableStream()` constructor
- Teeing a stream
