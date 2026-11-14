---
title: "Window: credentialless property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/credentialless/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: credentialless property

The **`window.credentialless`** read-only property returns a boolean that indicates whether the current document was loaded inside a credentialless ``, meaning that it is loaded in a new, ephemeral context.

This context doesn't have access to the network, cookies, and storage data associated with its origin. It uses a new context local to the top-level document lifetime. In return, the `Cross-Origin-Embedder-Policy` (COEP) embedding rules can be lifted, so documents with COEP set can embed third-party documents that do not.

See IFrame credentialless for a deeper explanation.

## Value

A boolean. A value of `true` indicates that the document was loaded inside a credentialless ``; `false` indicates that it was not.

## Examples

You can specify a credentialless `` like so:

```html
<iframe
  src="https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)"
  title="Spectre vulnerability Wikipedia page"
  width="960"
  height="600"
  credentialless></iframe>
```

In supporting browsers, if the document loaded in the `` were to run the following line, it would return `true`:

```js
console.log(window.credentialless);
```
