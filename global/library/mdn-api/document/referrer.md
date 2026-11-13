---
title: "Document: referrer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/referrer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: referrer property

The **`referrer`** read-only property of the `Document` interface returns the URI of the page that linked to this page.

## Value

The value is an empty string if the user navigated to the page directly (not through a
link, but, for example, by using a bookmark). Because this property returns only a
string, it doesn't give you document object model (DOM) access to the referring page.

Inside an ``, the `Document.referrer` will initially
be set to the `href` of the parent's
`Window.location` in same-origin requests.
In cross-origin requests, it's the `origin` of the parent's `Window.location` by default.
For more information, see the Referrer-Policy: strict-origin-when-cross-origin documentation.

## Examples

The following will log a string containing the document's referrer.

```js
console.log(document.referrer);
```

If the user navigated to the page via a link like `W3`, then it will output the previous domain like `developer.mozilla.org`. If the user navigated to the page directly, it will output an empty string.
