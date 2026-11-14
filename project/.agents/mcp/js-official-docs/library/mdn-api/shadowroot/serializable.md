---
title: "ShadowRoot: serializable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/serializable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: serializable property

The **`serializable`** read-only property of the `ShadowRoot` interface returns `true` if the shadow root is serializable.

If set, the shadow root may be serialized by calling the `Element.getHTML()` or `ShadowRoot.getHTML()` methods with the `options.serializableShadowRoots` parameter set `true`.

The serializable property of a shadow root is specified when the shadow root is created, either declaratively by adding the `shadowrootserializable` attribute on a `<template>` element (along with an allowed `shadowrootmode` value), or by setting the `options.serializable` parameter to `true` when using `Element.attachShadow()`.

## Value

`true` if the shadow root is serializable; `false` otherwise.

## Examples

```js
const customElem = document.querySelector("my-shadow-dom-element");
const shadow = customElem.shadowRoot;

// …

// Is it serializable?
const hostElem = shadow.serializable;
```
