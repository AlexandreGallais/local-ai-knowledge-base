---
title: "ShadowRoot: clonable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/clonable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: clonable property

The **`clonable`** read-only property of the `ShadowRoot` interface returns `true` if the shadow root is clonable, and `false` otherwise.

When the value is `true`, a shadow host cloned with `Node.cloneNode()` or `Document.importNode()` will include a copy of the shadow root.

By default the value is `false`.
It can be set to `true` using the `clonable` option of the `Element.attachShadow()` method or by setting the `shadowrootclonable` attribute of the `<template>` element that is being used to declaratively attach a shadow root.

## Value

`true` if the shadow root is clonable, and `false` otherwise.

## Examples

```js
const host = document.createElement("div");
const shadowRoot = host.attachShadow({
  mode: "open",
  clonable: true,
});

shadowRoot.clonable;
// true
```
