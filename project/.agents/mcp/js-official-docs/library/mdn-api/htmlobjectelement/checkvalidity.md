---
title: "HTMLObjectElement: checkValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlobjectelement/checkvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLObjectElement: checkValidity() method

The **`checkValidity()`** method of the `HTMLObjectElement` interface checks if the element is valid, but always returns true because `<object>` elements are never candidates for constraint validation.

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
const element = document.getElementById("myObjectElement");
console.log(element.checkValidity());
```

## See also

- `HTMLObjectElement.reportValidity()`
- `<object>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
