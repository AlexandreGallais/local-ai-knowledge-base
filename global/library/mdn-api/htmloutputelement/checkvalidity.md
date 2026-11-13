---
title: "HTMLOutputElement: checkValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloutputelement/checkvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOutputElement: checkValidity() method

The **`checkValidity()`** method of the `HTMLOutputElement` interface checks if the element is valid, but always returns true because `<output>` elements are never candidates for constraint validation.

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
const element = document.getElementById("myOutput");
console.log(element.checkValidity());
```

## See also

- `HTMLOutputElement.reportValidity()`
- `<output>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
