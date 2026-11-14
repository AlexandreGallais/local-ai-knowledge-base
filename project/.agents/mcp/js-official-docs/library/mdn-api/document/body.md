---
title: "Document: body property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/body/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: body property

The **`Document.body`** property represents the
`<body>` or `<frameset>` node of the current document, or
`null` if no such element exists.

## Value

One of the following:

- `HTMLBodyElement`
- `HTMLFrameSetElement`
- `null`

## Examples

```js
// Given this HTML: <body id="oldBodyElement"></body>
alert(document.body.id); // "oldBodyElement"

const newBodyElement = document.createElement("body");

newBodyElement.id = "newBodyElement";
document.body = newBodyElement;
alert(document.body.id); // "newBodyElement"
```

## Notes

`document.body` is the element that contains the content for the document.
In documents with `<body>` contents, returns the
`<body>` element, and in frameset documents, this returns the outermost
`<frameset>` element.

Though the `body` property is settable, setting a new body on a document
will effectively remove all the current children of the existing
`<body>` element.

## See also

- `document.head`
