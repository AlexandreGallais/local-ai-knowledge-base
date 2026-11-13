---
title: "HTMLDetailsElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldetailselement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDetailsElement: name property

The **`name`** property of the `HTMLDetailsElement` interface reflects the `name` attribute of `` elements. It enables multiple `` elements to be connected together, where only one of the `` elements can be open at once. This allows developers to easily create UI features such as accordions without scripting.

The name attribute specifies a group name — give multiple `` elements the same name value to group them. Only one of the grouped `` elements can be open at a time — opening one will cause another to close. If multiple grouped `` elements are given the `open` attribute, only the first one in the source order will be rendered open.

## Value

A string. The empty string if the element is not part of any group.

## See also

- The `` and `<summary>` elements
