---
title: "HTMLQuoteElement: cite property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlquoteelement/cite/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLQuoteElement: cite property

The **`cite`** property of the `HTMLQuoteElement` interface indicates the URL for the source of the quotation. It reflects the `<q>` element's `cite` attribute.

## Value

A string representing a URL.

## Example

```js
const quote = document.querySelector("q");
console.log(`Original source: ${quote.cite}`); // the current value
quote.cite = "https://example.com/quotes"; // updates the value
```

## See also

- `HTMLQuoteElement`
- `HTMLModElement.cite`
