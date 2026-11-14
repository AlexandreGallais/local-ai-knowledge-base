---
title: "data-*"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/data-_star_/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# data-*

The **`data-*`** SVG attributes are called custom data attributes. They let SVG markup and its resulting DOM share information that standard attributes can't, usually for scripting purposes. Their custom data are available via the `SVGElement` interface of the element the attributes belong to, with the `SVGElement.dataset` property.

The `*` can be replaced by any characters allowed in XML's rules for names, with the following restrictions:

- Can't start with `xml`.
- No semicolons (`;`, `U+003A`).
- No capital `A` to `Z` letters.

> **Note:**
> The `SVGElement.dataset` property is a `DOMStringMap` that provides the attribute `data-test-value` via `SVGElement.dataset.testValue`. Hyphen characters (`-`, `U+002D`) are removed and the next letter is capitalized, resulting in the camel case format.

You can use this attribute with any SVG element.

## See also

- `SVGElement`
- The `SVGElement.dataset` property used to access these attributes from scripts.
- Using data attributes
