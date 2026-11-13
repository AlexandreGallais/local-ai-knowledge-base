---
title: "HTMLOptGroupElement: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptgroupelement/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptGroupElement: label property

The **`label`** property of the `HTMLOptGroupElement` interface is a string value that reflects the `<optgroup>` element's `label` attribute, which provides a textual label to the group of options.

## Value

A string.

## Examples

```js
const optionGroup = document.getElementById("groupB");
console.log(optionGroup.label);
optionGroup.label = `${optionGroup.label} (${optionGroup.children.length})`;
```

## See also

- `<optgroup>`
- HTML `label` attribute
