---
title: "CSSPageRule: selectorText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspagerule/selectortext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPageRule: selectorText property

The **`selectorText`** property of the `CSSPageRule` interface gets and sets the selectors associated with the `CSSPageRule`.

## Value

A string.

## Examples

The stylesheet includes two `@page` rules. The `selectorText` property will return the literal selector text of `:first` as a string.

```css
@page {
  margin: 1cm;
}

@page :first {
  margin: 2cm;
}
```

```js
const myRules = document.styleSheets[0].cssRules; // Two myRules
console.log(myRules[1].selectorText); // ":first"
```
