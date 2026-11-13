---
title: "HTMLTimeElement: dateTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltimeelement/datetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTimeElement: dateTime property

The
**`dateTime`**
property of the `HTMLTimeElement` interface is a string that reflects the `datetime` HTML attribute, containing a machine-readable form of the element's date and
time value.

## Value

A string. For valid string formats, see the `datetime` valid values.

## Examples

```js
// Assumes there is <time id="t"> element in the HTML

const t = document.getElementById("t");
t.dateTime = "6w 5h 34m 5s";
```

## See also

- `HTMLTimeElement`
- `HTMLModElement.dateTime`
- Date strings
- Local date and time strings
