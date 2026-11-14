---
title: "ARIA: radiogroup role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/radiogroup_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: radiogroup role

The `radiogroup` role is a group of `radio` buttons.

## Description

Radio groups are collections describing a set of related `radio` options. A `radiogroup` is a type of `select` list that can only have a single entry, or `radio`, checked at any one time.

When using HTML's native input radio button, ``, the radio buttons are grouped when each of input radio buttons in the group is given the same `name`. Once a group of same-named input radio buttons is established, selecting any input radio button in that group automatically deselects any currently-selected input radio button in the same group. While this will associate the radio buttons together, to expose a grouping of radio buttons as a `radiogroup` explicitly set the ARIA role.

It is recommended to create radio groups by using same-named HTML input radio buttons, but, if you must use ARIA roles and attributes instead of semantic HTML form controls, custom `radio` buttons can and should act like native HTML radio input buttons.

When using non-semantic elements as radio buttons, you must ensure your users can only select one radio button from the group at a time. When one item in the group is checked, having their `aria-checked` attribute set to `true`, the previously checked item becomes unchecked, with its `aria-checked` attribute becoming `false`. The `aria-checked` attribute is set on the associated `radio` roles, not on the `radiogroup` itself.

Some `radiogroup` implementations initialize the set with all buttons in the unchecked state. Once a `radio` in a `radiogroup` is checked, it is generally not possible to return to an all-unchecked state.

An accessible name is strongly recommended for the `radiogroup` role, although not required by ARIA. Provide it either by a visible label referenced by `aria-labelledby` or by a label specified with `aria-label`. If elements provide additional information about the radio group, those elements are referenced by the `radiogroup` element with the `aria-describedby` property.

### Associated WAI-ARIA roles, states, and properties

- `radio` role
    One of a group of checkable buttons, in a `radiogroup`, where no more than one of the buttons can be checked at a time.
- `aria-labelledby` / `aria-label`
    Provide an accessible name for the `radiogroup` either by a visible label referenced by `aria-labelledby` or by a label specified with `aria-label`. This is strongly recommended, although not required by ARIA.
- `aria-describedby`
    Reference to elements providing additional information about the `radiogroup`
- `aria-required`
    Indicates that one `radio` within the group must have `aria-checked="true"` set before the form may be submitted. The required state is specified on the `radiogroup` element rather than one of the `radio` elements, unlike when using HTML radio buttons where the `required` attribute is set directly on one or more radio `` elements.
- `aria-errormessage`
    Identifies the element that provides an error message for the `radiogroup`, if there is an error. That message should be hidden while not relevant.

### Keyboard interactions

For `radio` buttons in a `radiogroup` that is NOT in a `toolbar`, the following keyboard interactions must be supported:

- `Tab` and `Shift + Tab`
    Move focus into and out of the `radiogroup`. When focus moves into a `radiogroup`, if a radio button is checked, focus is set on the checked button. If none of the radio buttons are checked, focus is set on the first radio button in the group.
- `Space`
    Checks the focused radio button if it is not already checked.
- `Right Arrow` and `Down Arrow`
    Moves focus to the next radio button in the group, unchecking the previously focused button, and checking the newly focused button. If focus is on the last button, focus moves to the first button.
- `Left Arrow` and `Up Arrow`
    Moves focus to the previous radio button in the group, unchecking the previously focused button, and checking the newly focused button. If focus is on the first button, focus moves to the last button.

Arrow keys are used to navigate among elements of a toolbar. When a `radiogroup` is nested inside a toolbar, users need to be able to navigate among all toolbar elements, including the radio buttons, without changing which radio button is checked. So, when navigating through a `radiogroup` in a `toolbar` with arrow keys, the button that is checked does not change. Rather, when inside a `toolbar`, the `Space` and `Enter` keys check the focused `radio` button if it is not already checked, with `Tab` moving focus into and out of the `toolbar`.

### Required JavaScript features

User interactions for `radiogroup`s must replicate the user interaction of a user entering into a group of same-named HTML radio buttons. Keyboard events for tabs, space, and arrow keys must be captured. Click events on both the radio elements and their associated labels must also be captured. Additionally, focus must be managed.

While generally moving off a focused element brings you to the next focusable element in the DOM order, using the arrow keys to navigate through a group of radio buttons keeps you in the group, moving focus to the first radio button when the `Right Arrow` or `Down Arrow` is released when focus was on the last radio in the group, and moving to the last radio if the `Left Arrow` or `Up Arrow` is released if focus was on the first radio. Managing roving `tabindex` is one method to manage arrow key events.

### Required CSS features

Use the `[aria-checked="true"]` attribute selector to style the checked state of checked radio buttons.

Use CSS `:hover` and `:focus` pseudo-classes for styling visual keyboard focus and hover. The focus and hover effect should encompass both the radio button and label to make it easier to perceive which option is being chosen and to indicate that clicking either the label or button will activate the radio button.

## Examples

The basic set up for a `radiogroup` using non-semantic ARIA roles instead of semantic HTML is as follows:

```html
<div role="radiogroup" aria-labelledby="question">
  <div id="question">Which is the best color?</div>
  <div id="radioGroup">
    <p>
      <span
        id="colorOption_0"
        tabindex="0"
        role="radio"
        aria-checked="false"
        aria-labelledby="purple"></span>
      <span id="purple">Purple</span>
    </p>
    <p>
      <span
        id="colorOption_1"
        tabindex="-1"
        role="radio"
        aria-checked="false"
        aria-labelledby="aubergine"></span>
      <span id="aubergine">Aubergine</span>
    </p>
    <p>
      <span
        id="colorOption_2"
        tabindex="-1"
        role="radio"
        aria-checked="false"
        aria-labelledby="magenta"></span>
      <span id="magenta">Magenta</span>
    </p>
    <p>
      <span
        id="colorOption_3"
        tabindex="-1"
        role="radio"
        aria-checked="false"
        aria-labelledby="all"></span>
      <span id="all">All of the above</span>
    </p>
  </div>
</div>
```

This could have been written using semantic HTML, which requires no CSS or JavaScript:

```html
<fieldset>
  <legend>Which is the best color?</legend>
  <p>
    <input name="colorOption" type="radio" id="purple" />
    <label for="purple">Purple</label>
  </p>
  <p>
    <input name="colorOption" type="radio" id="aubergine" />
    <label for="aubergine">Aubergine</label>
  </p>
  <p>
    <input name="colorOption" type="radio" id="magenta" />
    <label for="magenta">Magenta</label>
  </p>
  <p>
    <input name="colorOption" type="radio" id="all" />
    <label for="all">All of the above</label>
  </p>
</fieldset>
```

In this `<fieldset>` example, while `role="radiogroup"` is not necessary, to have this grouping explicitly announced as `radiogroup`, include the ARIA role.

## See also

- HTML `<fieldset>` element
- HTML `<<input type="radio">>` radio button element
- ARIA `radio` role
- `aria-errormessage`
- `aria-invalid`
- `aria-readonly`
- `aria-required`
