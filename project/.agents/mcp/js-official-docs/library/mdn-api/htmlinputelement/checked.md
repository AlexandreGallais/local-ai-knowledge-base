---
title: "HTMLInputElement: checked property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/checked/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: checked property

The **`checked`** property of the `HTMLInputElement` interface specifies the current checkedness of the element; that is, whether the form control is checked or not.

The boolean `checked` property is relevant to the `radio` (``) and `checkbox` (``) input types.

The presence of the HTML `checked` attribute indicates the checkbox is checked by default. It does not indicate whether this checkbox is currently checked: if the checkbox's state is changed, this content attribute does not reflect the change; only the `HTMLInputElement`'s `checked` IDL property is updated. The `checked` attribute is reflected by the `defaultChecked` property.

When a radio input `checked` property is `true`, all other radio inputs with the same `name` are `false`. If any radio button in a same-named group of radio buttons is `required`, as long as one button in the group is `checked`, the `ValidityState` object's read-only `valueMissing` property for each radio button in the group will be `false`.

A checkbox's value is only included in the submitted data upon form submission if `checked` is true. The value of the `HTMLInputElement.indeterminate` property has no effect on a checkbox's `checked` value.

## Value

A boolean.

## Examples

```js
const inputElement = document.getElementById("contactMail");
console.log(inputElement.checked);
inputElement.checked = true;
```

## See also

- ``
- `HTMLInputElement.validity`
- `:checked` pseudo-class
