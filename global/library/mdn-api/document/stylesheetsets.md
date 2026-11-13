---
title: "Document: styleSheetSets property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/stylesheetsets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: styleSheetSets property

The **`styleSheetSets`** read-only property returns a live list of all of the currently-available style sheet sets.

## Value

A list of style sheet sets that are available.

## Examples

Given an `` (list) element with the ID "sheetList", you can populate
it with the names of all the available style sheet sets with code like this:

```js
const list = document.getElementById("sheetList");
const sheets = document.styleSheetSets;

list.textContent = "";

for (const sheet of sheets) {
  const item = document.createElement("li");
  item.textContent = sheet;
  list.appendChild(item);
}
```

## Notes

The list of available style sheet sets is constructed by enumerating all the style
sheets available for the document, in the order in which they're listed in the
`Document.styleSheets` attribute, adding the `title` of each
style sheet that has a title to the list. Duplicates are dropped from the list (using a
case-sensitive comparison).

## See also

- `Stylesheet`
- `Document.styleSheets`
- `document.lastStyleSheetSet`
- `document.preferredStyleSheetSet`
- `document.selectedStyleSheetSet`
- `document.enableStyleSheetsForSet()`
