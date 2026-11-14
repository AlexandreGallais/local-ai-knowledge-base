---
title: "HTMLSelectElement: checkValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/checkvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: checkValidity() method

The **`checkValidity()`** method of the `HTMLSelectElement` interface returns a boolean value which indicates if the element meets any constraint validation rules applied to it. If false, the method also fires an `invalid` event on the element. Because there's no default browser behavior for `checkValidity()`, canceling this `invalid` event has no effect.

> **Note:**
> An HTML `<select>` element with a non-null `validationMessage` is considered invalid, will match the CSS `:invalid` pseudo-class, and will cause `checkValidity()` to return false. Use the `HTMLSelectElement.setCustomValidity()` method to set the `HTMLSelectElement.validationMessage` to the empty string to set the `validity` state to be valid.

## Syntax

```js
checkValidity()
```

### Parameters

None.

### Return value

Returns `true` if the element's value has no validity problems; otherwise, returns `false`.

## Examples

In the following example, calling `checkValidity()` returns either `true` or `false`.

```js
const element = document.getElementById("mySelect");
console.log(element.checkValidity());
```

## See also

- `HTMLSelectElement.reportValidity()`
- `<textarea>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
