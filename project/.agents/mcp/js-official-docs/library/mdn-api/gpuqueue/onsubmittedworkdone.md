---
title: "GPUQueue: onSubmittedWorkDone() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueue/onsubmittedworkdone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQueue: onSubmittedWorkDone() method

The **`onSubmittedWorkDone()`** method of the
`GPUQueue` interface returns a `Promise` that resolves when all the work submitted to the GPU via this `GPUQueue` at the point the method is called has been processed.

This includes the completion of any `mapAsync()` calls made on `GPUBuffer`s used in commands submitted to the queue, before `onSubmittedWorkDone()` is called.

Note: In most cases, you do _not_ need to call `onSubmittedWorkDone()`. You do **_not_** need to call it for mapping a buffer. `mapAsync` guarantees work submitted to the queue before calling `mapAsync` happens before the `mapAsync` returns (see WebGPU spec).

The two use cases for `onSubmittedWorkDone`

1. Waiting for multiple buffer mapping (slow)

   ```js
   // good
   await Promise.all([
     buffer1.mapAsync(),
     buffer2.mapAsync(),
     buffer3.mapAsync(),
   ]);
   data1 = buffer1.getMappedRange();
   data2 = buffer2.getMappedRange();
   data3 = buffer3.getMappedRange();
   ```

   ```js
   // works but slow
   buffer1.mapAsync();
   buffer2.mapAsync();
   buffer3.mapAsync();
   await device.queue.onSubmittedWorkDone();
   data1 = buffer1.getMappedRange();
   data2 = buffer2.getMappedRange();
   data3 = buffer3.getMappedRange();
   ```

   The reason the second method is slow is, the implementation may be able to map the buffers before all the submitted work is done.
   For example, if all the buffers are finished being used, but more work (unrelated to the buffers) is already submitted, then
   you'll end up waiting longer using the second method than the first.

2. Throttling work

   If you are doing heavy compute work and you submit too much work at once, the browser may kill your work.
   You can throttle the work by only submitting more work when the work you've already submitted is done.

## Syntax

```js
onSubmittedWorkDone()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined`.

## Examples

```js
device.queue.submit([commandEncoder.finish()]);
device.queue.onSubmittedWorkDone().then(() => {
  console.log("All submitted commands processed.");
});
```

## See also

- The WebGPU API
