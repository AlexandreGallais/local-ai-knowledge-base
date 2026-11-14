---
title: "HTMLFormElement: reportValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/reportvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: reportValidity() method

The **`reportValidity()`** method of the `HTMLFormElement` interface performs the same validity checking steps as the `checkValidity()` method. In addition, for each `invalid` event that was fired and not canceled, the browser displays the problem to the user.

## Syntax

```js
reportValidity()
```

### Parameters

None.

### Return value

Returns `true` if the associated controls' values have no validity problems; otherwise, returns `false`.

## Example

```js
document.forms["my-form"].addEventListener("submit", () => {
  document.forms["my-form"].reportValidity();
});
```

## See also

- `HTMLFormElement.checkValidity()`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
