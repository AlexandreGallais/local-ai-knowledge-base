---
title: "HTMLInputElement: defaultChecked property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/defaultchecked/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: defaultChecked property

The **`defaultChecked`** property of the `HTMLInputElement` interface specifies the default checkedness state of the element. This property reflects the `` element's `checked` attribute.

The boolean `checked` attribute is valid for the `radio` (``) and `checkbox` (``) input types. The presence of the attribute sets the `defaultChecked` property to `true`.

## Value

A boolean.

## Examples

```js
const inputElement = document.getElementById("contactMail");
console.log(inputElement.defaultChecked);
```

## See also

- ``
- `:default` pseudo-class
- `:checked` pseudo-class
