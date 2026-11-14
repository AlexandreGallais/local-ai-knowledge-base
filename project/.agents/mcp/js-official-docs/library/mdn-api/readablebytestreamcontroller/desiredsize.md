---
title: "ReadableByteStreamController: desiredSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablebytestreamcontroller/desiredsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableByteStreamController: desiredSize property

The **`desiredSize`** read-only property of the `ReadableByteStreamController` interface returns the number of bytes required to fill the stream's internal queue to its "desired size".

The value is used by the stream to indicate a preferred flow rate to the underlying source.
Sources that support throttling or pausing their inflow of data (not all do!) should control the inflow such that `desiredSize` of the stream buffer is kept positive and as close to zero as possible.

The `desiredSize` is used to apply backpressure from downstream consumers.

## Value

A number, or `null`.

The number can be negative if the queue is over-full. Although the queue size is measured in bytes, a fractional high water mark can cause the number to have a fractional component. The value is `null` if the stream has errored and `0` if it is closed.

## Examples

The A readable stream with an underlying push source and backpressure support example in the spec provides a good example of using `desiredSize` to manually detect when the stream is full and apply backpressure.

While the example uses a default source, the concepts are exactly the same as for readable byte sources.

## See also

- Using readable byte streams
- `ReadableByteStreamController`
