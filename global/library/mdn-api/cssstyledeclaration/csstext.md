---
title: "CSSStyleDeclaration: cssText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstyledeclaration/csstext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleDeclaration: cssText property

The **`cssText`** property of the `CSSStyleDeclaration` interface returns or sets the text of the element's **inline** style declaration only.

To be able to set a **stylesheet** rule dynamically, see Using dynamic styling information.

Not to be confused with stylesheet style-rule `CSSRule.cssText`.

## Value

A string containing the text of the element's inline style declaration.

## Example

```html
<span id="s1" style="color: red;">Some text</span>
```

```js
const elem = document.getElementById("s1");
console.log(elem.style.cssText); // "color: red;"
```
