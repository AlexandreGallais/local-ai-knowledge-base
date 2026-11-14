---
title: "MediaTrackConstraints: noiseSuppression property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediatrackconstraints/noisesuppression/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaTrackConstraints: noiseSuppression property

The `MediaTrackConstraints` dictionary's **`noiseSuppression`** property is a `ConstrainBoolean` describing the requested or mandatory constraints placed upon the value of the `noiseSuppression` constrainable property.

If needed, you can determine whether or not this constraint is supported by checking
the value of `noiseSuppression` as returned
by a call to `MediaDevices.getSupportedConstraints()`. However, typically
this is unnecessary since browsers will ignore any constraints they're unfamiliar with.

Noise suppression is typically provided by microphones, although it can be provided by
other input sources as well.

## Value

If this value is a simple `true` or `false`, the user agent will
attempt to obtain media with noise suppression enabled or disabled as specified, if
possible, but will not fail if this can't be done. If, instead, the value is given as an
object with an `exact` field, that field's Boolean value indicates a required
setting for the noise suppression feature; if it can't be met, then the request will
result in an error.

## Examples

See the Constraint exerciser example.

## See also

- Media Capture and Streams API
- Capabilities, constraints, and settings
- `MediaTrackConstraints`
- `MediaDevices.getSupportedConstraints()`
- `MediaStreamTrack`
