---
title: "MediaTrackConstraints: suppressLocalAudioPlayback property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediatrackconstraints/suppresslocalaudioplayback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaTrackConstraints: suppressLocalAudioPlayback property

The `MediaTrackConstraints` dictionary's **`suppressLocalAudioPlayback`** property is a `ConstrainBoolean` describing the requested or mandatory constraints placed upon the value of the `suppressLocalAudioPlayback` constrainable property. This property controls whether the audio playing in a tab will continue to be played out of a user's local speakers when the tab is captured.

If needed, you can determine whether or not this constraint is supported by checking
the value of `suppressLocalAudioPlayback` as returned
by a call to `MediaDevices.getSupportedConstraints()`. However, typically
this is unnecessary since browsers will ignore any constraints they're unfamiliar with.

## Value

A `ConstrainBoolean` value.

If this value is a simple `true` or `false`, the user agent will
attempt to obtain media with local audio playback enabled or disabled as specified, if
possible, but will not fail if this can't be done.

If the value is given as `ideal`, that field's boolean value indicates an ideal
setting for the local audio playback suppression feature; if it can't be met, then the request will
result in an error.

## Examples

```js
let isLocalAudioSuppressed = displayStream
  .getVideoTracks()[0]
  .getSettings().suppressLocalAudioPlayback;
```

The Constraint exerciser example shows how to use media track constraints.

## See also

- Media Capture and Streams API
- Capabilities, constraints, and settings
- `MediaTrackConstraints`
- `MediaDevices.getSupportedConstraints()`
- `MediaStreamTrack`
