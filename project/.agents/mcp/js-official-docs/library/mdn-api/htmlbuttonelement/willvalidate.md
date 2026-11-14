---
title: "HTMLButtonElement: willValidate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/willvalidate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: willValidate property

The **`willValidate`** read-only property of the `HTMLButtonElement` interface indicates whether the `` element is a candidate for constraint validation. It is `false` if any conditions bar it from constraint validation, including:

- Its `type` is `reset` or `button`;
- It has a `<datalist>` ancestor;
- The `disabled` property is `true`.

## Value

A boolean value.

## See also

- `HTMLButtonElement.checkValidity()`
- ``
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
