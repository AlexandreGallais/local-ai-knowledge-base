---
title: "CSS namespaces"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/namespaces/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS namespaces

The **CSS namespaces** module defines the syntax for using namespaces in CSS.

CSS isn't just for styling HTML. A stylesheet may be used to style SVG, MathML, XML, or HTML, each of which has a different namespace or a document containing multiple namespaces.

The `@namespace` at-rule defined in this module enables distinguishing between same-named elements in different namespaces. Element tag names are not unique to a single language. For example, the `` element isn't limited to HTML. You may want to style the ``s within your SVGs differently from the links in your HTML. You also will likely want to ensure that `querySelectorAll(\` selects the right kind of element. Namespacing can help.

The `@namespace` rule is used for declaring a default namespace and for binding namespaces to namespace prefixes. The namespaces module also defines the syntax for using these prefixes to represent namespace-qualified names. That's it. What a name means or if the name is even valid depends on the context and host language.

## Reference

### At-rules and descriptors

- `@namespace`

## Guides

- Namespaces crash course
    Deep dive into what a namespace is and how they are used in XML and XML-based markup languages.

## Related concepts

- CSS namespace separator (`|`) combinator
- CSS type selectors
- CSS universal selector
- `CSSNamespaceRule` interface
  - `CSSNamespaceRule.namespaceURI` property
  - `CSSNamespaceRule.prefix` property
- `Document.createAttributeNS()` method
- `Document.createElementNS()` method
- `Document.getElementsByTagNameNS()` method
- `Element.getAttributeNodeNS()` method
- `Element.getAttributeNS()` method
- `Element.getElementsByTagNameNS()` method
- `Element.hasAttributeNS()` method
- `Element.namespaceURI` property
- `Element.removeAttributeNS()` method
- `Element.setAttributeNS()` method
- `Element.setAttributeNodeNS()` method
- `NamedNodeMap.getNamedItemNS()` method
- `NamedNodeMap.removeNamedItemNS()` method
- `NamedNodeMap.setNamedItemNS()` method
- Namespace glossary term

## See also

- `` SVG element
- `<url>` data type
- CSS at-rules
- CSS at-rule functions
- CSS selectors
