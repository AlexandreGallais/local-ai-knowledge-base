---
title: "ElementInternals: checkValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/checkvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: checkValidity() method

The **`checkValidity()`** method of the `ElementInternals` interface checks if the element meets any constraint validation rules applied to it.

If `checkValidity` returns `false` then a cancelable invalid event is fired on the element.

## Syntax

```js
checkValidity()
```

### Parameters

None.

### Return value

A boolean value, `true` if the element meets all validation constraints.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the element does not have its `formAssociated` property set to `true`.

## Examples

In the following example `ElementInternals.setValidity()` is used to indicate that the element does not meet validation rules. Calling `checkValidity()` returns `false`. After calling `setValidity` again, this time indicating that all rules are marked false, `checkValidity()` returns `true`.

```js
let element = document.getElementById("join-checkbox");
element.internals_.setValidity({ valueMissing: true }, "my message");
console.log(element.internals_.checkValidity()); // false
element.internals_.setValidity({});
console.log(element.internals_.checkValidity()); // true
```
