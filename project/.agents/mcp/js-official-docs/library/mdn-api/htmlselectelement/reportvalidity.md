---
title: "HTMLSelectElement: reportValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/reportvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: reportValidity() method

The **`reportValidity()`** method of the `HTMLSelectElement` interface performs the same validity checking steps as the `checkValidity()` method. In addition, if the `invalid` event is not canceled, the browser displays the problem to the user.

## Syntax

```js
reportValidity()
```

### Parameters

None.

### Return value

Returns `true` if the element's value has no validity problems; otherwise, returns `false`.

## See also

- `HTMLSelectElement.checkValidity()`
- `<select>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
