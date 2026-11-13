---
title: "MediaStreamTrack: getSettings() method (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrack/getsettings/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrack: getSettings() method (part 3 of 3)

## Examples

### Basic `screenPixelRatio` usage

In this example, the application defines a constant `RESOLUTION_LIMIT`, which represents the scaling factor beyond which the sending application should send video at the logical resolution rather than the physical resolution.

When `screenPixelRatio` exceeds this limit, the application uses the `screenPixelRatio` value to calculate the logical resolution from the physical resolution, and then constrains the captured `MediaStreamTrack` to the logical resolution.

```js
const RESOLUTION_LIMIT = 1.5;

async function startCapture() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  });
  const track = stream.getVideoTracks()[0];
  const settings = track.getSettings();
  const capabilities = track.getCapabilities();

  if (settings.screenPixelRatio > RESOLUTION_LIMIT) {
    const physicalWidth = capabilities.width.max;
    const physicalHeight = capabilities.height.max;
    const logicalWidth = physicalWidth / settings.screenPixelRatio;
    const logicalHeight = physicalHeight / settings.screenPixelRatio;
    await track.applyConstraints({
      width: logicalWidth,
      height: logicalHeight,
    });
  }
}
```

## See also

- Media Capture and Streams API
- Screen Capture API
- Capabilities, constraints, and settings
- Using the screen capture API
- `MediaDevices.getDisplayMedia()`
- `MediaStreamTrack.getConstraints()`
- `MediaStreamTrack.applyConstraints()`
- `MediaDevices.getUserMedia()`
