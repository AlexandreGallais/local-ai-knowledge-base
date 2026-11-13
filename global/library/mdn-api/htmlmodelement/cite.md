---
title: "HTMLModElement: cite property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmodelement/cite/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLModElement: cite property

The **`cite`** property of the `HTMLModElement` interface indicates the URL of the resource explaining the modification. It reflects the `cite` attribute of the `` element and `` elements.

## Value

A string representing a URL.

## Example

```js
const mod = document.querySelector("edit");
console.log(`Explanation: ${mod.cite}`); // the current value
mod.cite = "https://example.com/edits"; // updates the element's cite
```

## See also

- `HTMLModElement.dateTime`
- `HTMLQuoteElement.cite`
