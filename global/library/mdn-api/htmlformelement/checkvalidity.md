---
title: "HTMLFormElement: checkValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/checkvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: checkValidity() method

The **`checkValidity()`** method of the `HTMLFormElement` interface returns a boolean value which indicates if all associated controls meet any constraint validation rules applied to them. The method also fires an `invalid` event on each invalid element, but not on the form element itself. Because there's no default browser behavior for `checkValidity()`, canceling this `invalid` event has no effect.

> **Note:**
> The `:valid` and `:invalid` CSS pseudo-classes are applied to `<form>` elements based on the validity of its owned form controls, not the validity of the `<form>` element itself.

## Syntax

```js
checkValidity()
```

### Parameters

None.

### Return value

Returns `true` if the associated controls' values have no validity problems; otherwise, returns `false`.

## Examples

In the following example, calling `checkValidity()` would return `true` or `false`.

```js
const element = document.getElementById("myForm");
console.log(element.checkValidity());
```

## See also

- `HTMLFormElement.reportValidity()`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
