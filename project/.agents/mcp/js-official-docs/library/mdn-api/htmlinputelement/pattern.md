---
title: "HTMLInputElement: pattern property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/pattern/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: pattern property

The **`pattern`** property of the `HTMLInputElement` interface represents a regular expression a non-null `` value should match. It reflects the `` element's `pattern` attribute.

The `pattern` property is valid for `text`, `search`, `url`, `tel`, `email`, and `password` types. It defines a regular expression that the input's `value` must match in order for the value to pass <example-value> validation.

If a non-`null` value doesn't conform to the constraints set by the `pattern` value, the `ValidityState` object's read-only `patternMismatch` property will be true.

## Value

A string.

## Examples

```js
const inputElement = document.getElementById("year");
console.log(inputElement.pattern);
```

## See also

- ``
- `HTMLInputElement.value`
- Client-side validation
- `:valid` and `:invalid` pseudo-classes
