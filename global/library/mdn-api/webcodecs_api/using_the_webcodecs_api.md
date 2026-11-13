---
title: "Using the WebCodecs API (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webcodecs_api/using_the_webcodecs_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the WebCodecs API

This guide covers the basic usage patterns of the WebCodecs API, including how to encode and decode video and audio, as well as how to use `VideoFrame` and `AudioData`.

## Encoding video

The basic usage pattern for `VideoEncoder` starts with instantiation, where you define the `output` and `error` callback functions. The `output` callback receives an `EncodedVideoChunk` and a `metadata` parameter — an `EncodedVideoChunkMetadata` dictionary which contains an optional decoderConfig property. This metadata is needed by muxing libraries when muxing to a video file.

```js
const encoder = new VideoEncoder({
  output(chunk, meta) {
    // Do something with chunk, typically send to muxing library
  },
  error(e) {
    // Handle the error
  },
});
```

You then need to configure the encoder with the codec parameter and various other encoding parameters such as width, height, bitrate and framerate. See the Codec selection guide for guidance on choosing a codec.

```js
encoder.configure({
  codec: "vp09.00.40.08.00", // See codec selection guide
  width: 1280,
  height: 720,
  bitrate: 1_000_000, // 1 Mbps
  framerate: 30,
});
```

You would then start encoding `VideoFrame` objects, where you would not only specify the `VideoFrame` to be encoded, but also the `keyFrame` parameter indicating whether or not the frame should be encoded as a key frame.

```js
for (let i = 0; i < 60; i++) {
  const timestamp = (i * 1e6) / 30; // 30 fps, in microseconds
  const frame = new VideoFrame(canvas, { timestamp });
  encoder.encode(frame, { keyFrame: i % 60 === 0 });
  frame.close();
}
```

The first frame encoded should be a key frame — while `VideoEncoder` will automatically force the first frame to be a key frame even if not explicitly flagged, it is good practice to set it explicitly. Typical key frame intervals are once every 30 or 60 frames. Using more key <example-value> increases video file size, while using fewer key <example-value> can result in unstable video playback by some video players.

It is important to close `VideoFrame` objects as soon as they are sent for encoding to avoid memory leaks. `VideoFrame` objects are large enough that applications can crash with fewer than 100 active frames in memory.

Note that `VideoEncoder` also has a queue of frames to encode called the `encodeQueue`. If you are rendering an animation at 30 fps, run `encoder.encode(frame)` on each render, but the encoder is only able to encode at 10 fps, the encoder queue will eventually grow until it runs out of video memory and the process crashes.

You therefore need to manage how and when you send frames to the encoder, checking `VideoEncoder.encodeQueueSize` within your render loop, and ensuring that it does not grow unbounded.

It is possible to use the `dequeue` event to detect when the encode queue is reduced, to avoid the need to poll `encodeQueueSize`.

```js
encoder.addEventListener("dequeue", (event) => {
  // Queue up more encoding work
});
```

Once you are done sending all frames for encoding, you should call the `flush()` method.

```js
await encoder.flush();
```

Depending on the device/browser, the encoder may not return the last few `EncodedVideoChunk` objects until `flush()` is called. Once you are done using the `VideoEncoder` completely, you should call the `close()` method to free up system resources.

```js
encoder.close();
```

A `VideoEncoder` may throw an error during the process of encoding for a number of different reasons, such as if the user switches tabs and the browser reclaims the resources. When an error occurs, the encoder transitions permanently to the `"closed"` state. It is not possible to reconfigure a closed encoder — a new `VideoEncoder` instance must be created. The first frame encoded by the new encoder must be a key frame.

```js
if (encoder.state === "closed") {
  // Close the old encoder, instantiate and configure a new encoder
}

encoder.encode(frame, { keyFrame: true });
```

## Decoding video

Likewise, for decoding video, you start by instantiating the `VideoDecoder` with the `output` and `error` callback functions, where the `output` callback receives `VideoFrame` objects returned by the decoder.

```js
const decoder = new VideoDecoder({
  output(frame) {
    // Do something with the VideoFrame
  },
  error(e) {
    /** Handle the error */
  },
});
```

You then need to configure the decoder. If you are decoding a video file, a demuxing library can provide the correct decoder config (see Muxing and Demuxing). If streaming video between a WebCodecs sender and receiver, the decoder config would be identical to the meta returned by the `VideoEncoder` which generated the encoded chunks.

```js
decoder.configure(/* config */);
```

If you are decoding a video file, you will need a demuxing library to extract video chunks. You can then submit the chunks for decoding. Keep in mind that you should not send just one chunk for decoding and wait for the frame to be output before feeding the next chunk. Depending on the browser/device and video itself, you may need to send multiple chunks before the decoder begins returning frames, and the minimum number of chunks will depend on the device.

```js
let chunkIndex = 0;
// Process chunks in batches, not one at a time nor all at once
for (let i = 0; i < BATCH_LENGTH; i++) {
  decoder.decode(chunks[chunkIndex]);
  chunkIndex++;
}
```

Similar to `VideoEncoder`, `VideoDecoder` maintains a decode queue which needs to be managed. If you send thousands of chunks to the `VideoDecoder` at once, the decoder might close or fail, so your application will need to ensure that `VideoDecoder.decodeQueueSize` does not grow unbounded. Like with the encoder, you can also listen for the `dequeue` event to aid in managing the decode queue.

```js
decoder.addEventListener("dequeue", (event) => {
  // Queue up more decoding work
});
```

Once you are finished sending all frames for decoding, you can run `flush`.

```js
await decoder.flush();
```

Depending on the device/browser, the decoder may not return the last few `VideoFrame` objects until `flush()` is called. Once you are done using the `VideoDecoder` completely, you should call the `close()` method to free up system resources.

```js
decoder.close();
```

A `VideoDecoder` may throw an error decoding for a variety of reasons, such as corrupted or missing data in a source `EncodedVideoChunk`. When a decoder fails, it transitions permanently to the `"closed"` state and a new `VideoDecoder` instance must be created. The first chunk decoded by the new decoder must be a key frame, so it is necessary to seek forward from the current position to the next key frame before resuming.

```js
let chunkIndex = 0;

for (let i = 0; i < BATCH_LENGTH; i++) {
  // Check if decoder failed
  if (decoder.state === "closed") {
    // Seek forward to the next key frame from the current position
    for (let j = chunkIndex; j < chunks.length; j++) {
      if (chunks[j].type === "key") {
        chunkIndex = j;
        break;
      }
    }
    // Close the old decoder, instantiate and configure a new decoder
  }
  decoder.decode(chunks[chunkIndex]);
  chunkIndex++;
}
```

## VideoFrame

A `VideoFrame` represents a single uncompressed video frame, including its pixel data and metadata such as its timestamp. It is both returned by the `VideoDecoder` when decoding encoded video, and generated from a variety of source images.

### Creating video frames

A `VideoFrame` can be constructed from any image source. Keep in mind that timestamps are in microseconds.

```js
const bitmapFrame = new VideoFrame(imgBitmap, { timestamp: 0 });
const imageFrame = new VideoFrame(htmlImageEl, { timestamp: 0 });
const videoFrame = new VideoFrame(htmlVideoEl, { timestamp: 0 });
const canvasFrame = new VideoFrame(canvasEl, { timestamp: 0 });
```

Constructing a `VideoFrame` from a `Canvas` is typically how you would encode video in a video editing application, where source video and images are used within a canvas context, applying effects and transformations, and the `Canvas` can both be previewed by the user and used as the image source for a `VideoFrame` to be encoded.

You can also directly create a `VideoFrame` from binary data, such as an `ArrayBuffer`; however, you will need to specify the `format` and metadata and ensure that the data being used to construct the frame follows the specified format.

```js
const rgbaFrame = new VideoFrame(rgbaData, {
  timestamp: 0,
  format: "RGBA",
  codedWidth: 1920,
  codedHeight: 1080,
});
```

`VideoFrame` objects are tied to data on graphics memory. When creating a `VideoFrame` from a `Canvas`, `Bitmap`, `Video` or `Image`, data is copied from graphics memory to graphics memory, which is relatively more efficient.

A `VideoFrame` constructed from binary data (e.g., `ArrayBuffer` or `Uint8ClampedArray`) will incur a CPU→graphics memory copy operation, which can be a performance penalty if done repeatedly.

Finally, `VideoFrame` objects can also be generated by decoding `EncodedVideoChunk` objects via a `VideoDecoder`, as shown in the Decoding video section above.

### Consuming video frames

Decoded video can also be played back in the browser by rendering `VideoFrame` objects to a `Canvas` via any of the Canvas rendering methods. Different rendering methods have different performance characteristics, which may be relevant when running compute-intensive video processing operations.

#### Canvas2D

Frames can be drawn to a `CanvasRenderingContext2D` using the `drawImage` method:

```js
const canvas = new OffscreenCanvas(width, height);
const ctx = canvas.getContext("2d");
ctx.drawImage(frame, 0, 0);
```

While the 2D canvas context has a simple yet flexible API, browsers use different implementations under the hood, resulting in inconsistent and generally worse performance across browsers.

#### BitmapRenderer

Frames can also be rendered to a canvas via the `ImageBitmapRenderingContext` by creating an `ImageBitmap` from the frame, and rendering it to the canvas via the `transferFromImageBitmap` method.

```js
const canvas = new OffscreenCanvas(width, height);
const ctx = canvas.getContext("bitmaprenderer");

const bitmap = await createImageBitmap(frame);
ctx.transferFromImageBitmap(bitmap);
frame.close();
```

This method involves making a single copy of the frame in graphics memory, resulting in more consistent and generally better performance across browsers than the Canvas2D API while also being relatively simple.

#### WebGPU

The most efficient way to render a `VideoFrame` to a canvas is via the importExternalTexture method in WebGPU.

```js
const externalTexture = device.importExternalTexture({ source: frame });
```

`importExternalTexture` is efficient as it incurs a zero-copy operation, using the exact same `VideoFrame` object in memory within a WebGPU pipeline. It is the most performant method for rendering a `VideoFrame`, but also the most complex to set up.

### Memory

Because `VideoFrame` objects can consume significant GPU memory, and video processing involves manipulating many frames per second, extra care should be taken to manage memory and avoid memory leaks in order to avoid application crashes.

First and foremost, frames must be explicitly released when no longer needed.

```js
frame.close();
```

When encoding, you can close the frame as soon as you send it for encoding.

```js
encoder.encode(frame, { keyFrame: true });
frame.close();
```

You should also close the frames right after rendering.

```js
ctx.drawImage(frame, 0, 0);
frame.close();
```

When transferring a `VideoFrame` between threads (e.g., a worker), it should be transferred as a transferable object.

```js
worker.postMessage(frame, [frame]);
```
