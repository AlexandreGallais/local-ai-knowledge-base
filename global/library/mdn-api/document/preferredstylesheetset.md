---
title: "Document: preferredStyleSheetSet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/preferredstylesheetset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: preferredStyleSheetSet property

The **`preferredStyleSheetSet`** read-only property of the `Document` interface returns the preferred style sheet set as set by the page author.

## Value

The author's preferred style sheet set. This is determined from the order of style sheet declarations and the
`Default-Style` HTTP header.

If there isn't a preferred style sheet set defined by the author, the empty string (`""`) is returned.

## Examples

```js
if (document.preferredStyleSheetSet) {
  console.log(
    `The preferred style sheet set is: ${document.preferredStyleSheetSet}`,
  );
} else {
  console.log("There is no preferred style sheet.");
}
```

## See also

- `document.lastStyleSheetSet`
- `document.selectedStyleSheetSet`
- `document.styleSheetSets`
- `document.enableStyleSheetsForSet()`
