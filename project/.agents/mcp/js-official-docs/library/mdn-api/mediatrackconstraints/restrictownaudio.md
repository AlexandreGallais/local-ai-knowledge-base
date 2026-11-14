---
title: "MediaTrackConstraints: restrictOwnAudio property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediatrackconstraints/restrictownaudio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaTrackConstraints: restrictOwnAudio property

The `MediaTrackConstraints` dictionary's **`restrictOwnAudio`** property is a `ConstrainBoolean` that specifies the requested or mandatory constraints placed on the value of the `restrictOwnAudio` constrainable property.

This property controls whether system audio originating from the capturing tab is filtered out of screen capture, allowing for cleaner screen recordings in some cases. For example, if the capturing web page itself is playing embedded audio or video, that audio would be included in the capture. Since this could lead to an undesirable echo or interfere with the intended audio sources from other tabs or applications, removing it from the capture is desirable.

If needed, you can determine whether or not this constraint is supported by checking
the value of `restrictOwnAudio`, as returned
by `MediaDevices.getSupportedConstraints()`. However,
this is rarely necessary since browsers typically ignore any constraints they don't recognize.

## Value

A `ConstrainBoolean` value.

If the value is `true`, the user agent will attempt to remove any audio originating from the tab that called `MediaDevices.getDisplayMedia()` to initiate screen capture. If removal of audio via processing fails, the user agent may exclude all audio originating from the capturing tab.

> **Note:**
> If the captured display surface doesn't include system audio, this setting will have no effect.

If the value is given as `exact`, that field's boolean value indicates an exact requirement for the `restrictOwnAudio` feature; if the user agent can't meet this requirement, the request will result in an error.

If the value is `false`, the user agent will not attempt to restrict any system audio originating from the capturing tab.

## Examples

```js
let isCapturingTabSystemAudioRestricted = displayStream
  .getAudioTracks()[0]
  .getSettings().restrictOwnAudio;
```

The Constraint exerciser example shows how to use media track constraints.

## See also

- Media Capture and Streams API
- Capabilities, constraints, and settings
- `MediaTrackConstraints`
- `MediaDevices.getSupportedConstraints()`
- `MediaStreamTrack`
