---
title: "ARIA: option role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/option_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: option role

The `option` role is used for selectable items in a `listbox`.

## Description

The `option` role is used to identify selections a user can make in a `listbox`. These options are similar to the `<option>` elements in a `<select>` element, but they can contain images.

All selectable options should have `aria-selected` match their state, `true` when selected and `false` when not. If an option is not selectable, `aria-selected` can be omitted. A disabled option can have `aria-disabled="true"` and `aria-selected="false"` to communicate to the user that the option is present, albeit disabled.

The `option` role is for identifying selectable choices of a `listbox`. Options must be provided an accessible name. Generally, the accessible name for an option should come from the element's descendant content.

Authors can also explicitly provide an accessible name by specifying `aria-label` or `aria-labelledby` to the element with the `option` role. If using `aria-label` or `aria-labelledby`, and the option also displays a visible text label, authors must ensure they adhere to WCAG Success Criterion 2.5.3 Label in Name.

It is highly recommended to use a `<select>` element or an `` element with the `checkbox` or `radio` type instead, when possible. These native HTML elements provide keyboard interactivity to manage focus for all the descendants for you automatically.

### All descendants are presentational

There are some types of user interface components that, when represented in a platform accessibility API, can only contain text. Accessibility APIs do not have a way of representing semantic elements contained in an `option`. To deal with this limitation, browsers automatically apply role `presentation` to all descendant elements of any `option` element as it is a role that does not support semantic children.

For example, consider the following `option` element, which contains a heading.

```html
<div role="option"><h3>Title of my option</h3></div>
```

Because descendants of `option` are presentational, the following code is equivalent:

```html
<div role="option"><h3 role="presentation">Title of my option</h3></div>
```

From the assistive technology user's perspective, the heading does not exist since the previous code snippets are equivalent to the following in the accessibility tree:

```html
<div role="option">Title of my option</div>
```

### Associated ARIA roles, states, and properties

#### Associated Roles

- `listbox`
    An `option` _must_ be contained in or owned by a `listbox`.

#### States and Properties

- `aria-selected`
    Used to describe the selection state of the option.

- `aria-checked`
    Used to describe the checked state when options are used in a multiple selection fashion. Supports `true`, `false` and `mixed`. Optional.

- `aria-posinset`
    Used to describe the position in the set of options when it does not match the DOM, such as virtual scrolling where only some options are present at a time. Optional.

- `aria-setsize`
    Used in conjunction with `aria-posinset` to declare the total number of options. Optional.

- `aria-disabled`
    Used to indicate that the option is present but not editable. Optional.

- `aria-hidden`
    Used to hide the option from accessibility tools. It should only be used to hide non-visible content or visible content if it improves the experience of assistive technology, such as redundant content. Optional.

- `aria-invalid`
    Used to indicate that the value of the option is considered invalid by the application. Optional.

- `aria-busy`
    Used to indicate that an element is being modified, such as while it is loading. Optional.

- `aria-labelledby`
    Used to indicate which element labels the option. The content of the option should be used instead where appropriate. Optional.

- `aria-label`
    Used to label the option. If the label is present in the DOM, `aria-labelledby` should be used instead. Optional.

## See also

- HTML `<select>` element
- HTML `` element
- HTML `<option>` element
- ARIA: `combobox` role
- ARIA: `list` role
- ARIA: `listbox` role
