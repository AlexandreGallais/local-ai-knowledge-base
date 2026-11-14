---
title: "MediaStreamTrackProcessor: totalFrames property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackprocessor/totalframes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackProcessor: totalFrames property

The **`totalFrames`** property of the `MediaStreamTrackProcessor` interface returns a number indicating how many frames have been received by the processor in total.

## Value

A number.

## Examples

### Basic usage

```js
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const [track] = stream.getVideoTracks();

    const processor = new MediaStreamTrackProcessor({
      track,
      maxBufferSize: 1,
    });
    const reader = processor.readable.getReader();

    while (true) {
      const { value: frame, done } = await reader.read();
      if (done) break;

      // Do something with frame...
      frame.close();

      console.log(
        `total: ${processor.totalFrames}, discarded: ${processor.discardedFrames}`,
      );
    }
  } catch (e) {
    console.error(e.name, e.message);
  }
}

document.querySelector("button").addEventListener("click", init);
```

## See also

- `MediaStreamTrackProcessor.discardedFrames`
