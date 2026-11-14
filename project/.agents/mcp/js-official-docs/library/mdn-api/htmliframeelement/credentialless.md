---
title: "HTMLIFrameElement: credentialless property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/credentialless/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: credentialless property

The **`credentialless`** property of the `HTMLIFrameElement` interface indicates whether the `` is credentialless, meaning that documents inside will be loaded using new, ephemeral contexts.

Those contexts do not have access to their network, cookies and storage data associated with their origin. Instead, they use new ones, local to the top-level document lifetime. It means any data stored won't be accessible anymore after the user navigates away from the page or reloads it.

In return, the `Cross-Origin-Embedder-Policy` (COEP) embedding rules can be lifted, so documents with COEP set can embed third-party documents that do not. See IFrame credentialless for a deeper explanation.

## Value

A boolean. The default value is `false`; set it to `true` to make the `` credentialless.

## Examples

### Get

Specify a credentialless `` like so:

```html
<iframe
  src="https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)"
  title="Spectre vulnerability Wikipedia page"
  width="960"
  height="600"
  credentialless></iframe>
```

Return the `credentialless` property value:

```js
const iframeElem = document.querySelector("iframe");
console.log(iframeElem.credentialless); // will return true in supporting browsers
```

### Set

Alternatively, specify the minimum of details in the HTML:

```html
<iframe width="960" height="600"> </iframe>
```

And set `credentialless` to `true` then load the `` contents via script:

```js
const iframeElem = document.querySelector("iframe");

iframeElem.credentialless = true;
iframeElem.title = "Spectre vulnerability Wikipedia page";
iframeElem.src =
  "https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)";
```

## See also

- IFrame credentialless
- ``
