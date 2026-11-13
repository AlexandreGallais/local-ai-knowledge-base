---
title: "MediaTrackConstraints: volume property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediatrackconstraints/volume/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaTrackConstraints: volume property

The `MediaTrackConstraints` dictionary's
**`volume`** property is a `ConstrainDouble`
describing the requested or mandatory constraints placed upon the value of the
`volume` constrainable property.

If needed, you can determine whether or not this constraint is supported by checking
the value of `volume` as returned by a call
to `MediaDevices.getSupportedConstraints()`. However, typically this is
unnecessary since browsers will ignore any constraints they're unfamiliar with.

## Value

A `ConstrainDouble` describing the acceptable or required value(s) for an
audio track's volume, on a linear scale where 0.0 means silence and 1.0 is the highest
supported volume.

If this value is a number, the user agent will attempt to obtain media whose volume is
as close as possible to this number given the capabilities of the hardware and the other
constraints specified. Otherwise, the value of this `ConstrainDouble` will
guide the user agent in its efforts to provide an exact match to the required volume (if
`exact` is specified or both `min` and `max` are
provided and have the same value) or to a best-possible value.

Any constraint set which only permits values outside the range 0.0 to 1.0 cannot be
satisfied and will result in failure.

## Examples

See the Constraint exerciser example.

## See also

- Media Capture and Streams API
- Capabilities, constraints, and settings
- `MediaTrackConstraints`
- `MediaDevices.getSupportedConstraints()`
- `MediaStreamTrack`
