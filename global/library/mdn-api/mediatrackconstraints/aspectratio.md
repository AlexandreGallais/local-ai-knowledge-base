---
title: "MediaTrackConstraints: aspectRatio property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediatrackconstraints/aspectratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaTrackConstraints: aspectRatio property

The `MediaTrackConstraints` dictionary's **`aspectRatio`** property is a `ConstrainDouble` describing the requested or mandatory constraints placed upon the value of the
`aspectRatio` constrainable property.

If needed, you can determine whether or not this constraint is supported by checking
the value of `aspectRatio` as returned by a
call to `MediaDevices.getSupportedConstraints()`. However, typically this
is unnecessary since browsers will ignore any constraints they're unfamiliar with.

## Value

A `ConstrainDouble` describing the acceptable or required value(s) for a
video track's aspect ratio. The value is the width divided by the height and is rounded
to ten decimal places. For example, the standard high-definition video aspect ratio of
16:9 can be computed as 1920/1080, or 1.7777777778.

If this value is a number, the user agent will attempt to obtain media whose aspect
ratio is as close as possible to this number given the capabilities of the hardware and
the other constraints specified. Otherwise, the value of this
`ConstrainDouble` will guide the user agent in its efforts to provide an
exact match to the required aspect ratio (if `exact` is specified or both
`min` and `max` are provided and have the same value) or to a
best-possible value.

## Examples

See the Constraint exerciser example.

## See also

- Media Capture and Streams API
- Capabilities, constraints, and settings
- `MediaTrackConstraints`
- `MediaDevices.getSupportedConstraints()`
- `MediaStreamTrack`
