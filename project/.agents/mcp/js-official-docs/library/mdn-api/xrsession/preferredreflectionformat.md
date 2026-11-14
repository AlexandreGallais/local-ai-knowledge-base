---
title: "XRSession: preferredReflectionFormat property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/preferredreflectionformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: preferredReflectionFormat property

The _read-only_ **`preferredReflectionFormat`** property of the `XRSession` interface returns this session's preferred reflection format used for lighting estimation texture data.

## Value

A string representing the reflection format. Possible values:

| XRReflectionFormat | WebGL Format | WebGL Internal Format | WebGPU Format     | HDR |
| ------------------ | ------------ | --------------------- | ----------------- | --- |
| "srgba8"           | RGBA         | SRGB8_ALPHA8          | "rgba8unorm-srgb" |     |
| "rgba16f"          | RGBA         | RGBA16F               | "rgba16float"     | ✓   |

## Examples

### Requesting a light probe with the system's preferred format

You can request a light probe with `XRSession.requestLightProbe()` and specify the system's preferred format by setting the `reflectionFormat` option equal to `XRSession.preferredReflectionFormat`.

```js
const lightProbe = await xrSession.requestLightProbe({
  reflectionFormat: xrSession.preferredReflectionFormat,
});
```

## See also

- `XRSession.requestLightProbe()`
