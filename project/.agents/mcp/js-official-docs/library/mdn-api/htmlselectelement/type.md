---
title: "HTMLSelectElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: type property

The **`HTMLSelectElement.type`**
read-only property returns the form control's `type`.

## Value

One of the following:

- `"select-multiple"` if multiple values can be selected.
- `"select-one"` if only one value can be selected.

## Examples

```js
switch (select.type) {
  case "select-multiple":
    // Multiple values may be selected
    break;
  case "select-one":
    // Only one value may be selected
    break;
  default:
  // Non-standard value (or this isn't a SELECT element)
}
```

## See also

- The `<select>` HTML element, implementing this interface.
