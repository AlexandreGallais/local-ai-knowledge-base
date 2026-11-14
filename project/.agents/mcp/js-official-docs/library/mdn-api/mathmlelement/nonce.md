---
title: "MathMLElement: nonce property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlelement/nonce/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLElement: nonce property

The **`nonce`** property of the `MathMLElement` interface returns the nonce that is used by Content Security Policy to determine whether a given fetch will be allowed to proceed.

## Value

A String; the cryptographic nonce, or an empty string if no nonce is set.

## Examples

### Retrieving a nonce value

```js
const math = document.querySelector("math");
console.log(math.nonce);
```

## See also

- `HTMLElement.nonce` a similar property for HTML elements.
- `SVGElement.nonce` a similar property for SVG elements.
- `nonce` global attribute
- Content Security Policy
- CSP:
