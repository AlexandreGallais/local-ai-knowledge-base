---
title: "HTMLTemplateElement: content property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltemplateelement/content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTemplateElement: content property

The **`content`** property of the `HTMLTemplateElement` interface returns the `<template>` element's template contents as a `DocumentFragment`. This content's `ownerDocument` is a separate `Document` from the one that contains the `<template>` element itself — unless the containing document is itself constructed for the purpose of holding template content.

The `Node.cloneNode()` and `Document.importNode()` methods both create a copy of a node. The difference is that `importNode()` clones the node in the context of the calling document, whereas `cloneNode()` uses the document of the node being cloned. The document context determines the `CustomElementRegistry` for constructing any custom elements. For this reason, use `document.importNode()` to clone the `content` fragment so that custom element descendants are constructed using the definitions in the current document, rather than the separate document that owns the template content. See the `Node.cloneNode()` page's examples for more details.

## Value

A `DocumentFragment`.

## Examples

### Using importNode() with template content

```js
const templateElement = document.querySelector("#foo");
const documentFragment = document.importNode(templateElement.content, true);
// Now you can insert the documentFragment into the DOM
```

### The ownerDocument of template content

For `<template>` elements created in the context of a normal HTML document, the `ownerDocument` of the `content` is a separate, freshly created document:

```js
const template = document.createElement("template");
console.log(template.content.ownerDocument === document); // false
console.log(template.content.ownerDocument.URL); // "about:blank"
```

If the `<template>` element is created in the context of a document that itself was created for the purpose of holding template content, then the `ownerDocument` of the `content` is the same as that of the containing document:

```js
const template1 = document.createElement("template");
const docForTemplate = template1.content.ownerDocument;
const template2 = docForTemplate.createElement("template");
console.log(template2.content.ownerDocument === docForTemplate); // true
```

## See also

- `HTMLTemplateElement`
