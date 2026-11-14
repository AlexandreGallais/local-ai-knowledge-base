---
title: "CSSNamespaceRule: namespaceURI property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnamespacerule/namespaceuri/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNamespaceRule: namespaceURI property

The read-only **`namespaceURI`** property of the `CSSNamespaceRule` returns a string containing the text of the URI of the given namespace.

## Value

A string containing a URI.

## Examples

The stylesheet includes a namespace as the only rule. Therefore the first `CSSRule` returned will be a `CSSNamespaceRule`. The value of the `namespaceURI` property will be `http://www.w3.org/1999/xhtml`.

```css
@namespace url("http://www.w3.org/1999/xhtml");
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].namespaceURI); // 'http://www.w3.org/1999/xhtml'
```
