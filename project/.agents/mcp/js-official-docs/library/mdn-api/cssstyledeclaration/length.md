---
title: "CSSStyleDeclaration: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstyledeclaration/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleDeclaration: length property

The read-only property returns an integer that represents the
number of style declarations in this CSS declaration block.

## Value

An integer that provides the number of styles explicitly set on the parent of
the instance.

## Examples

The following gets the number of explicitly set styles on the following HTML element:

```html
<div
  id="div1"
  style="margin: 0 10px; background-color: #ccaa11; font-family: monospace"></div>
```

JavaScript code:

```js
const myDiv = document.getElementById("div1");
const divStyle = myDiv.style;
const len = divStyle.length; // 6
```
