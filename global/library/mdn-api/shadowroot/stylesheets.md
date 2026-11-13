---
title: "ShadowRoot: styleSheets property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/stylesheets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: styleSheets property

The **`styleSheets`** read-only property of the `ShadowRoot` interface
returns a `StyleSheetList` of `CSSStyleSheet` objects, for stylesheets explicitly linked into or embedded in a shadow tree.

## Value

A `StyleSheetList` of `CSSStyleSheet` objects.

## Examples

```js
let customElem = document.querySelector("my-shadow-dom-element");
let shadow = customElem.shadowRoot;
let styleSheets = shadow.styleSheets;
```
