---
title: "ARIA: aria-checked attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-checked/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-checked attribute

The `aria-checked` attribute indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

> **Note:**
> Where possible use an HTML `` element with `type="checkbox"` and `type="radio"` as these have built-in semantics and do not require ARIA attributes.

## Description

The `aria-checked` attribute indicates whether the element is checked (`true`), unchecked (`false`), or if the checked status is indeterminate (`mixed`), meaning it is neither checked nor unchecked. The `mixed` value is supported by the tri-state input roles of `checkbox` and `menuitemcheckbox`.

The `mixed` value is not supported on `radio`, `menuitemradio`, or `switch` and elements that inherits from these. The value will be false if `mixed` is set when not supported.

```html
<span
  role="checkbox"
  id="checkBoxInput"
  aria-checked="false"
  tabindex="0"
  aria-labelledby="chk15-label"></span>
<label id="chk15-label">Subscribe to the newsletter</label>
```

The `tabindex` attribute is required to enable focus. JavaScript is required to toggle the `aria-checked` state. And, if this checkbox is part of a submittable form, more JavaScript is required to set a name and a value.

The above could have been written as:

```html
<input type="checkbox" id="chk15-label" name="Subscribe" />
<label for="chk15-label">Subscribe to the newsletter</label>
```

By using the `` element with `type="checkbox"` instead of ARIA, there is no need for any JavaScript.

## Values

- false
    The element supports being checked but is not currently checked.
- true
    The element is checked.
- mixed
    for `checkbox` and `menuitemcheckbox` only, equivalent to `indeterminate`, indicating a mixed mode value of neither checked nor unchecked.
- undefined (default)
    The element does not support being checked.

## Associated roles

Used in roles:

- `checkbox`
- `menuitemcheckbox`
- `menuitemradio`
- `option`
- `radio`
- `switch`

## Associated interfaces

- `Element.ariaChecked`
    The `ariaChecked` property, part of the `Element` interface, reflects the value of the `aria-checked` attribute.
- `ElementInternals.ariaChecked`
    The `ariaChecked` property, part of the `ElementInternals` interface, reflects the value of the `aria-checked` attribute.

```js
myHTMLElement.ariaChecked = true;
```

## See also

- ``
- ``
- `aria-pressed`
- `aria-selected`
- Two state checkbox example - w3.org
- Mix-state checkbox example - w3.org
