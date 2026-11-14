---
title: "Using readable byte streams (part 1 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/streams_api/using_readable_byte_streams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using readable byte streams

Readable _byte streams_ are readable streams that have an underlying byte source of `type: "bytes"`, and which support efficient zero-copy transfer of data from the underlying source to a consumer (bypassing the stream's internal queues).
They are intended for use cases where data might be supplied or requested in arbitrary sized and potentially very large chunks, and hence where avoiding making copies is likely to improve efficiency.

This article explains how readable byte streams compare to normal "default" streams, and how you create and consume them.

> **Note:**
> Readable byte streams are almost identical to "normal" readable streams and almost all of the concepts are the same.
> This article assumes that you already understand those concepts and will only be covering them superficially (if at all).
> If you're not familiar with the relevant concepts, please first read: Using readable streams, Streams concepts and usage overview, and Streams API concepts.

## Overview

Readable streams provides a consistent interface for streaming data from some underlying source, such as a file or socket, to a consumer, such as a reader, transform stream or writable stream.
In a normal readable stream, data from the underlying source always passes to a consumer through the internal queues.
A readable byte stream differs in that if the internal queues are empty, the underlying source can write directly to the consumer (an efficient zero-copy transfer).

A readable byte stream is created by specifying `type: "bytes"` in the `underlyingSource` object that may be passed as the first parameter to the `ReadableStream()` constructor.
With this value set, the stream is created with a `ReadableByteStreamController`, and this is the object that is passed to the underlying source when the `start(controller)` and `pull(controller)` callback functions are invoked.

The main difference between `ReadableByteStreamController` and the default controller (`ReadableStreamDefaultController`) is that it has an additional property `ReadableByteStreamController.byobRequest` of type `ReadableStreamBYOBRequest`.
This represents a pending read request by a consumer that will be made as a zero-copy transfer from the underlying source.
The property will be `null` if there is no pending request.

A `byobRequest` is only made available when a read request is made on a readable byte stream and there is no data in the stream's internal queues (if there is data then the request is satisfied from those queues).

An underlying byte source that needs to transfer data must check the `byobRequest` property and, if it is available, use it to transfer data.
If the property is `null`, incoming data should instead be added to the stream's internal queues using `ReadableByteStreamController.enqueue()` (this is the only way to transfer data when using a "default" stream).

The `ReadableStreamBYOBRequest` has a `view` property, which is a view on the buffer allocated for transfer.
Data from an underlying source should be written into this property, and then the underlying source must call `respond()` indicating the number of bytes written.
This signals that the data should be transferred, and the pending read request by the consumer resolved.
After calling `respond()` the `view` can no longer be written.

There is also an additional method `ReadableStreamBYOBRequest.respondWithNewView()` to which an underlying source can pass a "new" view containing data to be transferred.
This new view must be over the _same_ memory buffer as the original, and from the same starting offset.
This method might be used if the underlying byte source needs to first transfer the view to a worker thread to populate (for example) and then get it back before responding to the `byobRequest`.
In most cases this method will not be needed.

Readable byte streams are normally read using a `ReadableStreamBYOBReader`, which can be obtained by calling `ReadableStream.getReader()` on the stream, specifying `mode: "byob"` in the options parameter.

A readable byte stream can also be read using a default reader (`ReadableStreamDefaultReader`), but in this case `byobRequest` objects are only created when automatic buffer allocation is enabled for the stream (`autoAllocateChunkSize` was set for the stream's `underlyingSource`).
Note that the size indicated by `autoAllocateChunkSize` is used for the buffer size in this case; for a byte reader the buffer used is supplied by the consumer.
If the property was not specified, the default reader will still "work" but the underlying source will never be offered a `byobRequest`, and all data will be transferred through the stream's internal queues.

Other than the differences outlined above, the controller and underlying source for bytes streams are very similar to those for default streams, and are used in much the same way.
