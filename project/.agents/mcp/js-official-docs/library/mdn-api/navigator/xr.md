---
title: "Navigator: xr property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/xr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: xr property

The read-only **`xr`** property
provided by the `Navigator` interface returns an `XRSystem` object
which can be used to access the WebXR Device API.

## Value

The `XRSystem` object used to interface with the WebXR Device API in the current
context. This can be used to present augmented and/or virtual reality imagery to the
user.

## Examples

Each `Window` has its own instance of `Navigator`, which can
be accessed as `window.navigator` or as
`navigator`. At the same time, a new
`XRSystem` instance is also created and attached to
the `navigator` instance as `navigator.xr`. If
the `xr` property exists, you can use it to access the WebXR Device API.

To determine if WebXR is available, you can do something like this:

```js
if ("xr" in window.navigator) {
  /* WebXR can be used! */
} else {
  /* WebXR isn't available */
}
```

## See also

- WebGL API: 2D and 3D accelerated
  graphics for the web
- Canvas API: 2D graphics API
