---
title: "ARIA: combobox role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/combobox_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: combobox role

The `combobox` role identifies an element as either an `input` or a `button` that controls another element, such as a `listbox` or `grid`, that can dynamically pop up to help the user set the value. A combobox can be either editable (allowing text input) or select-only (only allowing selection from the popup).

## Description

A `combobox` is a composite widget that combines a named input field with a popup providing possible values for that input field. The purpose of this widget is to improve user experience by helping the user select a value without having to type in the complete value and, optionally depending whether supported values are limited, preventing the user from entering invalid or otherwise unsupported values.

The `combobox` role can be set on either an input element for editable comboboxes, or a button element for select-only comboboxes. This element controls another element, such as a listbox or grid, that can dynamically pop up to help the user set a value.

The element with the `combobox` role can be either an editable single-line text field (using an `` element, similar to one with a `<datalist>`), or a select-only element (using a `button` element) that only displays the current value without allowing direct text input.

A WAI-ARIA combobox requires only one attribute: `aria-expanded`. However, several other attributes are typically necessary depending on the implementation: `aria-haspopup`, `aria-controls`, `aria-activedescendant`, and `aria-autocomplete`.

Typically, the initial state of a combobox is collapsed, with `aria-expanded="false"` set. In the collapsed state, only the combobox element and, optionally a sibling button to invoke the popup, are visible. The `aria-expanded`, with the value set to `false`, is required when collapsed, because it indicates to assistive technologies that the widget is expandable.

The combobox is in the expanded state when both the combobox element showing its current value and its associated popup element are visible. When expanded, `aria-expanded="true"` must be set.

The popup element associated with a `combobox` can be either a `listbox`, `tree`, `grid`, or `dialog` element.

Comboboxes have an implicit `aria-haspopup` value of `listbox`, so including this attribute is optional if the popup is a `listbox`. If the combobox popup element is a `tree`, `grid`, or `dialog` (anything other than a `listbox`), the `aria-haspopup` attribute is required. The value of `aria-haspopup` must be either the `tree`, `grid`, `dialog`, or `listbox` role. Note that for this property, `true` means `menu`, so make sure that the value corresponds to the role of the popup, not a Boolean value.

When a combobox's popup is displayed, ensure the `aria-controls` attribute on the combobox element is set to the `id` of the popup `listbox`, `tree`, `grid`, or `dialog` element. This is how the relationship between the element with the `combobox` role and the popup it controls is indicated. (Note: In older ARIA specs, this was `aria-owns` rather than `aria-controls`, so you may see `aria-owns` in older combobox implementations. The `aria-owns` in the code should be updated to `aria-controls`!)

If the combobox UI includes a visible control, such as an icon, that allows the visibility of the popup to be controlled via pointer and touch events, that control should be a ``, `` of type `button`, or a `button` role element with a `tabindex` of `-1`. Doing so will allow the button to be focusable but not included in keyboard tab sequence. It must not be a descendant of the element with role `combobox`.

To be keyboard accessible, keyboard support for moving focus between the `combobox` element and elements contained in the popup `listbox`, `tree`, `grid`, or `dialog`, must be programmed in. One common convention is that `Down Arrow` moves focus from the input to the first focusable descendant of the popup element.

The `aria-activedescendant` property can be used to identify the currently active element of the combobox popup, for instance an `option` within a popup `listbox`, for implementations where DOM focus remains on the combobox. If DOM focus does not remain on the combobox when its popup is invoked, but rather DOM focus moves into the popup, such as a dialog, then `aria-activedescendant` may not be necessary.

If the combobox is implemented as an editable `` element, the value of the combobox is the input's value. For select-only comboboxes implemented with a `button` element, the value comes from the selected option in the popup.

The `aria-autocomplete` attribute is only applicable for editable comboboxes that support text input. For these comboboxes, set the attribute to a value that corresponds to the provided behavior: `inline`, `list`, or `both`. The attribute indicates that inputting text will trigger display of one or more predictions of the user's intended value and specifies how these predictions will be presented. For select-only comboboxes using a `button` element, `aria-autocomplete` should not be used since no text input is possible.

Every `combobox` must have an accessible name, which can be provided in one of three ways:

1. For an `` element, use an associated ``.
2. If a visible label exists in the UI, use `aria-labelledby` referencing the label element's `id`.
3. If no visible label is present, use `aria-label`.

> **Note:**
> Use only one of these methods; do not combine them.

### Associated WAI-ARIA roles, states, and properties

- `aria-expanded`
    Required. Identifies whether the combobox is open (`true`) or closed (`false`).
- `aria-haspopup`
    Implied. If omitted, defaults to `listbox`. Also supports `tree`, `grid`, or `dialog`. Identifies the combobox has having a popout, and indicates the type.

### Keyboard interactions

- `Down Arrow`
    Opens the popup if closed and moves focus to the next option, or to the first option if none was selected.

- `Alt` + `Down Arrow` (Optional)
    If the popup is available but not displayed, displays the popup without moving focus.

- `Up Arrow`
    Opens the popup if closed and moves focus to the previous option, or to the last option if none was selected.

- `Alt` + `Up Arrow` (Optional)
    If the popup has focus, returns focus to the combobox, otherwise it closes the popup.

- `Escape`
    Closes the popup if open. If the popup is already closed, clears the combobox value for editable comboboxes.

#### Editable combobox keyboard interactions

- `Enter`
    If an autocomplete suggestion is selected in the popup, accepts the suggestion by updating the combobox value and placing the input cursor at the end.
    May also trigger a default action (e.g., in a messaging application, adding the accepted value to a list of recipients).

- `Tab`
    Accepts the current value and moves focus to the next focusable element.

#### Select-only combobox keyboard interactions

- `Enter` or `Space`
    When the popup is closed, opens the popup. When the popup is open and an option is selected, accepts the selected option as the combobox value and closes the popup.

- `Tab`
    Accepts the current selection and moves focus to the next focusable element.

- `Home` or `End`
    When the popup is open, moves focus to the first or last option respectively.

## Examples

```html
<label for="jokes">Pick what type of jokes you like</label>
<div class="combo-wrap">
  <input
    type="text"
    id="jokes"
    role="combobox"
    aria-controls="joketypes"
    aria-autocomplete="list"
    aria-expanded="false"
    data-active-option="item1"
    aria-activedescendant="" />
  <span aria-hidden="true" data-trigger="multiselect"></span>
  <ul id="joketypes" role="listbox" aria-label="Jokes">
    <li class="active" role="option" id="item1">Puns</li>
    <li class="option" role="option" id="item2">Riddles</li>
    <li class="option" role="option" id="item3">Observations</li>
    <li class="option" role="option" id="item4">Knock-knock</li>
    <li class="option" role="option" id="item5">One liners</li>
  </ul>
</div>
```

## See also

- HTML `` element
- HTML `<select>` element
- HTML `<option>` element
- HTML `` element
- ARIA: `listbox` role
- ARIA: `option` role
- ARIA: `list` role
- ARIA: `listitem` role
- ARIA Best Practices – Combobox
- Accessible combobox module examples by Deque
