---
title: "HTMLInputElement: readOnly property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/readonly/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: readOnly property

The **`readOnly`** property of the `HTMLInputElement` interface indicates that the user cannot modify the value of the ``. It reflects the `` element's `readonly` boolean attribute; returning `true` if the attribute is present and `false` when omitted.

Unlike a form control with a true `disabled` property, a true `readOnly` property value does not prevent the user from clicking or selecting in the control.

While the HTML `readonly` attribute is ignored if the type is `hidden`, `range`, `color`, `checkbox`, `radio`, `file`, `submit`, `reset`, `button`, and `image`, the `readOnly` property is `true` for these input types if the attribute is present, `false` otherwise.

## Value

A boolean.

## Examples

```js
const inputElement = document.getElementById("total");
console.log(inputElement.readOnly);
inputElement.readOnly = true;
```

## See also

- ``
- `HTMLInputElement.disabled`
- `:read-only` pseudo-class
