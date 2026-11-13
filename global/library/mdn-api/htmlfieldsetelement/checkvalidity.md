---
title: "HTMLFieldSetElement: checkValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfieldsetelement/checkvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFieldSetElement: checkValidity() method

The **`checkValidity()`** method of the `HTMLFieldSetElement` interface checks if the element is valid, but always returns true because `<fieldset>` elements are never candidates for constraint validation.

> **Note:**
> The `:valid` and `:invalid` CSS pseudo-classes are applied to `<fieldset>` elements based on the validity of its descendant form controls, not the fieldset itself.

## Syntax

```js
checkValidity()
```

### Parameters

None.

### Return value

A boolean value, `true`.

## Examples

In the following example, calling `checkValidity()` returns `true`.

```js
const element = document.getElementById("myFieldSet");
console.log(element.checkValidity());
```

## See also

- `HTMLFieldSetElement.reportValidity()`
- `<fieldset>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
