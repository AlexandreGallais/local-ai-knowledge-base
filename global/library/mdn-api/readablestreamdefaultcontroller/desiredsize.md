---
title: "ReadableStreamDefaultController: desiredSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreamdefaultcontroller/desiredsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamDefaultController: desiredSize property

The **`desiredSize`** read-only property of the
`ReadableStreamDefaultController` interface returns the desired size
required to fill the stream's internal queue.

## Value

A number, or `null`.

The number can be negative if the queue is over-full. When a custom queuing strategy is used, its chunk sizes can cause the number to have a fractional component. The value is `null` if the stream has errored and `0` if it is closed.

## Examples

The A readable stream with an underlying push source and backpressure support example in the spec
provides a good example of using `desiredSize` to manually detect when the
stream is full and apply backpressure, and also of using
`ReadableStreamDefaultController.error()` to manually trigger a stream
error if another part of the system it relies on fails.

## See also

- Using readable streams
- `ReadableStreamDefaultController`
