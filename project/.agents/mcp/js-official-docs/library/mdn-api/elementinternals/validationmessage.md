---
title: "ElementInternals: validationMessage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/validationmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: validationMessage property

The **`validationMessage`** read-only property of the `ElementInternals` interface returns the validation message for the element.

## Value

A string containing the validation message of this element.

## Examples

In the following example the validation message is set with `ElementInternals.setValidity()`, and then returned with `validationMessage`.

```js
this.internals_.setValidity({ valueMissing: true }, "my message");
console.log(this.internals_.validationMessage); // "my message"
```
