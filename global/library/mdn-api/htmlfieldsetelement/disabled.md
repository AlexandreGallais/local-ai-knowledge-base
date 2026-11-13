---
title: "HTMLFieldSetElement: disabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfieldsetelement/disabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFieldSetElement: disabled property

The **`disabled`** property of the `HTMLFieldSetElement` interface is a boolean value that reflects the `<fieldset>` element's `disabled` attribute, which indicates whether the control is disabled.

When disabled, all the form control descendants of the `<fieldset>` element, excluding elements that are descendants of the `<legend>` child of the `<fieldset>`, if any, are disabled. A disabled element is unusable and un-clickable, and match the `:disabled` selector, even if their `disabled` property value is false.

## Value

A boolean value.

## Examples

```js
const fs = document.getElementById("billing-address");
console.log(fs.disabled);
fs.disabled = true;
```

## See also

- HTML `disabled` attribute
- CSS `:disabled` and `:enabled` pseudoclasses
