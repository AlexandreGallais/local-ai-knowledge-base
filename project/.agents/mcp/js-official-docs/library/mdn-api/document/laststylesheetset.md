---
title: "Document: lastStyleSheetSet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/laststylesheetset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: lastStyleSheetSet property

The **`lastStyleSheetSet`** read-only property of the `Document` interface returns the last enabled style sheet set. This property's value changes whenever the `document.selectedStyleSheetSet` property is changed.

## Value

The style sheet set that was most recently set. If the current style sheet set has not been changed by setting `document.selectedStyleSheetSet`, the returned value is `null`.

> **Note:**
> This value doesn't change when
> `document.enableStyleSheetsForSet()` is called.

## Examples

```js
let lastSheetSet = document.lastStyleSheetSet;

if (!lastSheetSet) {
  lastSheetSet = "Style sheet not yet changed";
} else {
  console.log(`The last style sheet set is: ${lastSheetSet}`);
}
```

## See also

- `document.preferredStyleSheetSet`
- `document.selectedStyleSheetSet`
- `document.styleSheetSets`
- `document.enableStyleSheetsForSet()`
