---
title: "XRLightProbe: reflectionchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlightprobe/reflectionchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLightProbe: reflectionchange event

The WebXR **`reflectionchange`** event fires each time the estimated reflection cube map changes. This happens in response to use movements through different lighting conditions or to direct changes to lighting itself. This event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("reflectionchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onreflectionchange = (event) => { }
```

## Event type

`Event`.

## Examples

### Using the `reflectionchange` event

Whenever the `reflectionchange` event fires on a light probe, you can retrieve an updated cube map by calling `XRWebGLBinding.getReflectionCubeMap()`. This is less expensive than retrieving lighting information with every `XRFrame`.

```js
const glBinding = new XRWebGLBinding(xrSession, gl);
const lightProbe = await xrSession.requestLightProbe();
let glCubeMap = glBinding.getReflectionCubeMap(lightProbe);

lightProbe.addEventListener("reflectionchange", () => {
  glCubeMap = glBinding.getReflectionCubeMap(lightProbe);
});
```

### The `onreflectionchange` event handler property

The `reflectionchange` event is also available using the `onreflectionchange` event handler property (but note that this replaces other event listeners added using `onreflectionchange`, if any).

```js
lightProbe.onreflectionchange = (event) => {
  glCubeMap = glBinding.getReflectionCubeMap(lightProbe);
};
```

## See also

- `addEventListener()`
