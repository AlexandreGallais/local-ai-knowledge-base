---
title: "HTMLIFrameElement: contentDocument property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/contentdocument/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: contentDocument property

The **`contentDocument`** read-only property of the `HTMLIFrameElement` interface returns a `Document` (that is, the active document in the inline frame's nested browsing context) if the iframe and the iframe's parent document are Same Origin, else returns `null`.

## Example of contentDocument

```js
const iframeDocument = document.querySelector("iframe").contentDocument;

iframeDocument.body.style.backgroundColor = "blue";
// This would turn the iframe blue.
```
