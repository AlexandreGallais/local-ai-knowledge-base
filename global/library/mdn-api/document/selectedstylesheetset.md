---
title: "Document: selectedStyleSheetSet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/selectedstylesheetset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: selectedStyleSheetSet property

The **`selectedStyleSheetSet`** property indicates the name of the style sheet set that's currently in use.

## Value

The name of the style sheet set currently in use. You can also set the current style sheet set using this property.

Setting the value of this property is equivalent to calling
`document.enableStyleSheetsForSet()` with the value of
`currentStyleSheetSet`, then setting the value of
`lastStyleSheetSet` to that value as well.

> **Note:**
> This attribute's value is live; directly changing
> the `disabled` attribute on style sheets will affect the value of this
> attribute.

## Examples

```js
console.log(`Current style sheet set: ${document.selectedStyleSheetSet}`);

document.selectedStyleSheetSet = "Some other style sheet";
```

## See also

- `document.lastStyleSheetSet`
- `document.preferredStyleSheetSet`
- `document.styleSheetSets`
- `document.enableStyleSheetsForSet()`
