---
title: "Document: designMode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/designmode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: designMode property

**`document.designMode`** controls whether the entire document
is editable. Valid values are `"on"` and `"off"`. According to the
specification, this property is meant to default to `"off"`. Firefox follows
this standard. The earlier versions of Chrome and IE default to `"inherit"`.
Starting in Chrome 43, the default is `"off"` and `"inherit"` is
no longer supported. In IE6-10, the value is capitalized.

## Value

A string indicating whether `designMode` is (or should be) set to on or off.
Valid values are `on` and `off`.

## Examples

Make an ``'s document editable:

```js
iframeNode.contentDocument.designMode = "on";
```

## See also

- `HTMLElement.contentEditable`
