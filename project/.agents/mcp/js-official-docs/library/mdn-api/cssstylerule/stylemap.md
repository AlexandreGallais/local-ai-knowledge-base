---
title: "CSSStyleRule: styleMap property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylerule/stylemap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleRule: styleMap property

The **`styleMap`** read-only property of the
`CSSStyleRule` interface returns a `StylePropertyMap` object
which provides access to the rule's property-value pairs.

## Value

A `StylePropertyMap` object.

## Example

The following example shows `styleMap` being used to modify a style using
the `StylePropertyMap.set()` method.

```js
const stylesheet = document.styleSheets[0];

Object.values(stylesheet.cssRules).forEach((block) => {
  if (block.selectorText === "button") {
    block.styleMap.set("--main-color", "black");
  }
});
```
