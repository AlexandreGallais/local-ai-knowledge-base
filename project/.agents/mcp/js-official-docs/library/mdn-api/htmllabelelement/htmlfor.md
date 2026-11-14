---
title: "HTMLLabelElement: htmlFor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllabelelement/htmlfor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLabelElement: htmlFor property

The **`htmlFor`** property of the `HTMLLabelElement` interface is the ID of the associated label's control element. It reflects the value of, and is used to set and get the `for` content attribute.

## Value

A string that contains the ID of the element associated with the control.

## Description

An `HTMLLabelElement` should be associated with a control element so that clicking on the label activates the control. The `for` attribute, reflected in the `htmlFor` property, should contain the `id` of the associated control element.

> **Note:**
> If this property has a value, the `HTMLLabelElement.control` property must refer to the same control.

The `htmlFor` attribute provides JavaScript access to the `for` attribute value. `htmlFor` is used instead of `for` to avoid clashing with the JavaScript `for` reserved word (this is no longer strictly necessary, so may change in the future).

## Example

### Basic usage

In this example, the `` element's `for` attribute value is `username`, which is linked to the `` via its `id` attribute. We use the `htmlFor` DOM property to access the `for` attribute value.

```html
<label for="username">Enter your username:</label>
<input id="username" name="username" type="text" />
```

```js
document.querySelector("label").htmlFor;
// username
```

## See also

- `HTMLLabelElement`
- `HTMLLabelElement.control`
- `HTMLElement`
- ``
- HTML forms guide
