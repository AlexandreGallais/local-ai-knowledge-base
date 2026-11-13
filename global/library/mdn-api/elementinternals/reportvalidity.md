---
title: "ElementInternals: reportValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/reportvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: reportValidity() method

The **`reportValidity()`** method of the `ElementInternals` interface checks if the element meets any constraint validation rules applied to it.

If `reportValidity` returns `false` then a cancelable invalid event is fired on the element.

This method behaves in a similar way to `ElementInternals.checkValidity()`, however it additionally sends the value of `ElementInternals.validationMessage` to the user agent for display.

## Syntax

```js
reportValidity()
```

### Parameters

None.

### Return value

A boolean value, `true` if the element meets all validation constraints.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the element does not have its `formAssociated` property set to `true`.

## Examples

In the following example `ElementInternals.setValidity()` is used to indicate that the element does not meet validation rules. Calling `reportValidity()` returns `false`, and the value "my message" is sent to the user agent for display.

After calling `setValidity` again, this time indicating that all rules are marked false, `reportValidity()` returns `true`.

```js
let element = document.getElementById("join-checkbox");
element.internals_.setValidity({ valueMissing: true }, "my message");
console.log(element.internals_.reportValidity()); // false
element.internals_.setValidity({});
console.log(element.internals_.reportValidity()); // true
```
