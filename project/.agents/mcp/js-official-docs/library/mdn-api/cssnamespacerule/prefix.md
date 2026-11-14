---
title: "CSSNamespaceRule: prefix property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnamespacerule/prefix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNamespaceRule: prefix property

The read-only **`prefix`** property of the `CSSNamespaceRule` returns a string with the name of the prefix associated to this namespace. If there is no such prefix, it returns an empty string.

## Value

A string containing the prefix associated to this namespace. If there is no prefix, an empty string is returned.

## Examples

The stylesheet includes two namespace rules. The first has no prefix the second the prefix `svg`. Two `CSSNamespaceRule` objects will be returned. The value of the `prefix` property for the first will be an empty string, for the second `svg`.

```css
@namespace url("http://www.w3.org/1999/xhtml");
@namespace svg url("http://www.w3.org/2000/svg");
```

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].prefix); // an empty string ""
console.log(myRules[1].prefix); // "svg"
```
