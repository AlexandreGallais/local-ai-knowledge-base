---
title: "CSSRule: parentRule property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrule/parentrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRule: parentRule property

The **`parentRule`** read-only property of the `CSSRule` interface returns the containing rule of the current rule if this exists, or otherwise returns null.

## Value

A `CSSRule` which is the type of the containing rules. If the current rule is inside a media query, this would return `CSSMediaRule`. Otherwise it returns null.

## Examples

```css
@media (width >= 500px) {
  .box {
    width: 100px;
    height: 200px;
    background-color: red;
  }

  body {
    color: blue;
  }
}
```

```js
let myRules = document.styleSheets[0].cssRules;
let childRules = myRules[0].cssRules;
console.log(childRules[0].parentRule); // a CSSMediaRule
```
