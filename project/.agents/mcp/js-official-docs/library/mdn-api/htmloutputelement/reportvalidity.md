---
title: "HTMLOutputElement: reportValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloutputelement/reportvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOutputElement: reportValidity() method

The **`reportValidity()`** method of the `HTMLOutputElement` interface performs the same validity checking steps as the `checkValidity()` method. It always returns true because `<output>` elements are never candidates for constraint validation.

## Syntax

```js
reportValidity()
```

### Parameters

None.

### Return value

A boolean value, `true`.

## See also

- `HTMLOutputElement.checkValidity()`
- `<output>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
