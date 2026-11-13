---
title: "Element: childElementCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/childelementcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: childElementCount property

The **`Element.childElementCount`** read-only property
returns the number of child elements of this element.

## Examples

```js
let sidebar = document.getElementById("sidebar");
if (sidebar.childElementCount > 0) {
  // Do something
}
```

## See also

- `Document.childElementCount`
- `DocumentFragment.childElementCount`
