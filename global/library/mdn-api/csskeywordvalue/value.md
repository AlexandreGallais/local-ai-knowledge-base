---
title: "CSSKeywordValue: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeywordvalue/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeywordValue: value property

The **`value`** property of the `CSSKeywordValue` interface represents the keyword as a string.

## Value

A string.

### Exceptions

- `TypeError`
    Thrown if the `value` property is set to an empty `String`.

## Examples

### Basic usage

The following example resets the CSS `display` property to its defaults.

```js
let indicator = document.getElementById("indicator");
indicator.attributeStyleMap.set("display", new CSSKeywordValue("initial"));
indicator.attributeStyleMap.get("display").value; // 'initial'
```
