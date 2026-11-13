---
title: "ShadowRoot: host property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/host/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: host property

The **`host`** read-only property of
the `ShadowRoot` returns a reference to the DOM element the
`ShadowRoot` is attached to.

## Value

A DOM `Element`.

## Examples

```js
const customElem = document.querySelector("my-shadow-dom-element");
const shadow = customElem.shadowRoot;

// …

// return the original host element some time later
const hostElem = shadow.host;
```

## See also

- `part` and `exportparts` HTML attributes
- `<template>` and `<slot>` HTML elements
- `:host`, `:host()`, and `:host-context()` CSS pseudo-classes
- `::part` and `::slotted` CSS pseudo-elements
