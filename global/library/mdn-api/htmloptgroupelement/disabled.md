---
title: "HTMLOptGroupElement: disabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptgroupelement/disabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptGroupElement: disabled property

The **`disabled`** property of the `HTMLOptGroupElement` interface is a boolean value that reflects the `<optgroup>` element's `disabled` attribute, which indicates whether the control is disabled.

When disabled, the `<option>` element descendants of the `<optgroup>` element are unusable, un-clickable, and unselectable. These disabled `<option>`s will match the `:disabled` selector, even if their `disabled` property value is false.

## Value

A boolean value.

## Examples

```js
const optionGroup = document.getElementById("groupB");
console.log(optionGroup.disabled);
optionGroup.disabled = true;
```

## See also

- HTML `disabled` attribute
- CSS `:disabled` and `:enabled` pseudoclasses
