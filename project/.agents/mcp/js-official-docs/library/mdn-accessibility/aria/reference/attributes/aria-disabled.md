---
title: "ARIA: aria-disabled attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-disabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-disabled attribute

The `aria-disabled` state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

## Description

The `aria-disabled` attribute, when set to `true`, indicates that the element upon which it is set and all of its focusable descendants are meant to be in the disabled state. This declaration will inform people using assistive technologies, such as screen readers, that such elements are not meant to be editable or otherwise operable.

Unlike HTML's `disabled` Boolean attribute, which will communicate a form control as semantically being disabled, change its styling to reflect its state and suppress all functionality along with disallowing the element's value from participating in form submission, the `aria-disabled="true"` only semantically exposes these elements as being disabled. Web developers must manually ensure such elements have their functionality suppressed when exposed to the disabled state.

When needing to disable native HTML form controls, developers will need to specify the `disabled` attribute, as it provides all of the generally expected features of disabling a control by default. However, there can be instances where elements need to be exposed as disabled, but are still available for users to find when navigating via the `Tab` key. Doing so can improve their discoverability as they will not be removed from the focus order of the web page, as `aria-disabled` does not change the focusability of such elements, nor will the elements be dimmed by default browser styling, making them easier to read. Some examples of where this may be useful include:

- The header button element associated with non-collapsible accordion panel,
- A button which is important to keep in the page's focus order, but its action is presently unavailable - such as submitting a form,
- Temporarily inactive items in a menu widget that would otherwise be skipped over via standard keyboard navigation.

In each of these cases, one may want users to find these elements through standard keyboard navigation, though the functionality of that control is removed or "disabled". Developers will still need to use JavaScript to fully disable the functionality of the element while also changing the appearance of the element so sighted users know it is disabled.

> **Note:**
> The state of being disabled applies to the element with `aria-disabled="true"` and all of its focusable descendants. Take care when using this attribute on container elements. Particularly in the case where a container may have both form controls and links - where the intent may be to expose the form controls as being in the disabled state, but not to communicate the links as being "disabled".

Another reason to use the `aria-disabled` attribute over the HTML `disabled` attribute is if you have created custom controls which need to be marked as disabled, but are not using an element that allows for the `disabled` attribute. For instance, in the following snippet a `` was used to create a custom button which needs to be marked as disabled. However, the `` element does not expect, nor respect the `disabled` attribute - even if it were to be given a `role="button"` to change its exposed ARIA role. The `aria-disabled` attribute is required to disable such custom controls.

```html
<div role="button" aria-disabled="true" tabindex="-1">Edit</div>
```

Similarly to needing to use JavaScript to ensure an element with `aria-disabled="true"` is not functional, the element will also need styling adjustments. In contrast to the HTML `disabled` attribute, where specifying it provides `:disabled` user-agent styles to be applied, adding `aria-disabled="true"` doesn't. The element can be styled with the attribute selector `[aria-disabled="true"]`.

```css
[aria-disabled="true"] {
  opacity: 0.5;
}
```

If you are purposefully using the `aria-disabled` attribute to allow for a form control to remain in the page's keyboard focus order, particularly if the element represents important content that all users should be able to perceive, then you may need to use styling that still passes color contrast requirements. For instance, a disabled button/heading that introduces a non-collapsible accordion panel is content that still needs to be legible.

```css
@media (forced-colors: active) {
  [aria-disabled="true"] {
    border-color: GrayText;
    color: GrayText;
  }
}
```

The `forced-colors` media query detects if the user agent has enabled a forced colors mode; if so, the text and border colors are both set to the system color `greyText`.

Another thing to keep in mind, when using `aria-disabled` over the native HTML attribute, is that the ARIA attribute will require the manual styling necessary to visually communicate the element as disabled in Windows High Contrast Mode.

> **Note:**
> If you are using CSS's `pointer-events: none;` to make an element non-clickable, make sure you disable interactivity with JavaScript as well. `pointer-events: none;` prevents mouse clicks, but does not prevent the element from being activated via the keyboard.

```js
function onClick(event) {
  event.preventDefault();
}

function toggleDisabled(element, status, update) {
  if (status) {
    // element.input.disabled = false;
    element.setAttribute("aria-disabled", "false");
    update.textContent = "The element is now enabled.";
    element.addEventListener("click", onClick);
  } else {
    // element.input.disabled = true;
    element.setAttribute("aria-disabled", "true");
    update.textContent = "The element is now disabled.";
    element.removeEventListener("click", onClick);
  }
}
```

When toggling from `aria-disabled="true"` to `"false"`, use JavaScript to:

1. Toggle the value to `false` (or remove the attribute entirely),
2. Enable the element, and
3. Let the user know the control is now enabled.

If you used just CSS to style the disabled state using an attribute selector, the selector will no longer match and the disabled styling will no longer be in effect.

## Values

- `true`
    The element is disabled

- `false`
    The element is not disabled

## Associated interfaces

- `Element.ariaDisabled`
    The `ariaDisabled` property, part of the `Element` interface, reflects the value of the `aria-disabled` attribute, which indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
- `ElementInternals.ariaDisabled`
    The `ariaDisabled` property of the `ElementInternals` interface reflects the value of the `aria-disabled` attribute.

## Associated roles

Used in roles:

- `application`
- `button`
- `composite`
- `gridcell`
- `group`
- `input`
- `link`
- `menuitem`
- `scrollbar`
- `separator`
- `tab`

Inherits into roles:

- `checkbox`
- `columnheader`
- `combobox`
- `grid`
- `listbox`
- `menu`
- `menubar`
- `menuitemcheckbox`
- `menuitemradio`
- `option`
- `radio`
- `radiogroup`
- `row`
- `rowheader`
- `searchbox`
- `select`
- `slider`
- `spinbutton`
- `switch`
- `tablist`
- `textbox`
- `toolbar`
- `tree`
- `treegrid`
- `treeitem`

## See also

- Making disabled buttons more inclusive by Sandrina Pereira
- Styling for Windows high contrast with new standards for forced colors
- disabled
- `Element.ariaDisabled`
- `ElementInternals.ariaDisabled`
- `aria-hidden`
- `aria-readonly`
