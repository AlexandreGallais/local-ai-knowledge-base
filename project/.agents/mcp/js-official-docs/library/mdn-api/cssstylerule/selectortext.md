---
title: "CSSStyleRule: selectorText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylerule/selectortext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleRule: selectorText property

The **`selectorText`** property of the `CSSStyleRule` interface gets and sets the selectors associated with the `CSSStyleRule`.

## Value

A string.

## Examples

The CSS includes one style rule. This will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`. `myRules[0].selectorText` therefore returns a literal string of the selector, in this case `"h1"`.

```css
h1 {
  color: pink;
}
```

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].selectorText); // a string containing "h1".
```
