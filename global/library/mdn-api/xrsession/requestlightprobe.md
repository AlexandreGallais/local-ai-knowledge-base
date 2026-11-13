---
title: "XRSession: requestLightProbe() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/requestlightprobe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: requestLightProbe() method

The **`requestLightProbe()`** method of the
`XRSession` interface returns a `Promise` that resolves with an `XRLightProbe` object that estimates lighting information at a given point in the user's environment.

## Syntax

```js
requestLightProbe()
requestLightProbe(options)
```

### Parameters

- `options` (optional)
    An object containing configuration options, specifically:
    - `reflectionFormat`
        The internal reflection format indicating how the texture data is represented, either `srgba8` (default value) or `rgba16f`. See also `XRSession.preferredReflectionFormat`.

### Return value

A `Promise` that resolves with an `XRLightProbe` object.

### Exceptions

Rather than throwing true exceptions, `requestLightProbe()` rejects the
returned promise with a `DOMException`, specifically, one of the following:

- `NotSupportedError` `DOMException`
    Thrown if `lighting-estimation` is not an enabled feature in `XRSystem.requestSession()` or if the `reflectionFormat` is not `srgb8` or the `preferredReflectionFormat`.
- `InvalidStateError` `DOMException`
    Thrown if the session has already ended.

## Examples

### Requesting a light probe with the system's preferred format

The default format is `srgb8`, however, some rendering engines may use other (high dynamic range) formats. You can request the light probe with `XRSession.preferredReflectionFormat` which reports the preferred internal format.

```js
const lightProbe = await xrSession.requestLightProbe({
  reflectionFormat: xrSession.preferredReflectionFormat,
});
```

## See also

- `XRSession.preferredReflectionFormat`
