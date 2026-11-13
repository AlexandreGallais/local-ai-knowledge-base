---
title: "Document: scrollingElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/scrollingelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: scrollingElement property

The **`scrollingElement`** read-only property of the
`Document` interface returns a reference to the `Element` that
scrolls the document. In standards mode, this is the root element of the
document, `document.documentElement`.

When in quirks mode, the `scrollingElement` attribute returns the HTML
`body` element if it exists and is _not_ potentially scrollable, otherwise it returns `null`. This may look surprising but is true according to both the specification and browsers.

## Value

The `Element` that scrolls the document, usually the root element (unless not in standard mode).

## Examples

```js
const scrollElm = document.scrollingElement;
scrollElm.scrollTop = 0;
```
