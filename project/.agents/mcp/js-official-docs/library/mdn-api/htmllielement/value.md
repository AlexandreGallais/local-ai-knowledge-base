---
title: "HTMLLIElement: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllielement/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLIElement: value property

The **`value`** property of the `HTMLLIElement` interface indicates the ordinal position of the _list element_ inside a given ``. It can be smaller than `0`. If the `` element is not a child of an `` element, the property has no meaning.

It reflects the `value` attribute of the corresponding `` element. If the `` element does not have a `value` content attribute specified, then this property returns `0` by default even when the element may have a default serially-assigned ordinal value when rendered.

## Value

An integer.
