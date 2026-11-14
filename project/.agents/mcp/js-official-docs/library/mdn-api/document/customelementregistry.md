---
title: "Document: customElementRegistry property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/customelementregistry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: customElementRegistry property

The **`customElementRegistry`** read-only property of the `Document` interface returns the `CustomElementRegistry` object associated with this document, or `null` if one has not been set.

For documents associated with a `Window` (such as the main document of a page), this is the global `CustomElementRegistry` that is also accessible through the `window.customElements` property. Documents created programmatically (for example, via `DOMImplementation.createHTMLDocument()`) have a `null` custom element registry by default.

This property is also available on `ShadowRoot` objects via the same `customElementRegistry` property name.

## Value

A `CustomElementRegistry` object, or `null`.

## Examples

### Accessing a document's custom element registry

This example shows that the main document's `customElementRegistry` is the same global registry available through `window.customElements`, while documents created programmatically via `DOMImplementation.createHTMLDocument()` have a `null` registry by default.

```js
// The main document's registry is the global one:
console.log(document.customElementRegistry === window.customElements); // true (for Window-associated documents)

// Documents created programmatically have a null registry:
const newDoc = document.implementation.createHTMLDocument("New document");
console.log(newDoc.customElementRegistry); // null
```

## See also

- `ShadowRoot.customElementRegistry`
- `Element.customElementRegistry`
- `CustomElementRegistry`
- `window.customElements`
- Scoped custom element registries in Using custom elements
