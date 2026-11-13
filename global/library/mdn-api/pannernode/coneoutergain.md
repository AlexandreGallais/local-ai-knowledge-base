---
title: "PannerNode: coneOuterGain property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pannernode/coneoutergain/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PannerNode: coneOuterGain property

The `coneOuterGain` property of the `PannerNode` interface is a double value, describing the amount of volume reduction outside the cone, defined by the `coneOuterAngle` attribute.

The `coneOuterGain` property's default value is `0`, meaning that no sound can be heard outside the cone.

## Value

A double. The default is `0`, and its value can be in the range 0–1.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the property has been given a value outside the accepted range (0–1).

## Examples

See `PannerNode.orientationX` for example code that demonstrates how changing the `PannerNode` orientation parameters in combination with `coneInnerAngle` and `coneOuterAngle` affects volume.

## See also

- Using the Web Audio API
- Web Audio spatialization basics
