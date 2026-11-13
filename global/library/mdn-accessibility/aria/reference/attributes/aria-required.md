---
title: "ARIA: aria-required attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-required/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-required attribute

The `aria-required` attribute indicates that user input is required on the element before a form may be submitted.

## Description

When a semantic HTML ``, `<select>`, or `<textarea>` must have a value, it should have the `required` attribute applied to it. The HTML `required` attribute disables submitting the form unless the required form controls have valid values, while ensuring those navigating with the aid of assistive technologies understand which semantic form controls need valid content.

When form controls are created using non-semantic elements, such as a `` with a role of `checkbox`, the `aria-required` attribute should be included, with a value of `true`, to indicate to assistive technologies that user input is required on the element for the form to be submittable. The `aria-required` attribute can be used with HTML form elements; it is not limited to elements that have an ARIA role assigned.

Similar to the HTML `required` attribute set on semantic HTML form controls, the `aria-required` attribute explicitly conveys to assistive technologies that the element is required before a form may be submitted. The `required` attribute on a semantic HTML form control will prevent the form control from being submitted if no value is present — providing native error messaging in some browsers if a required value is invalid when the user attempts to submit the form. The `aria-required` attribute, like all ARIA states and properties, has no impact on element functionality. Functionality and behavior must be added in with JavaScript.

> **Note:**
> ARIA only modifies the accessibility tree, modifying how assistive technology presents content to users. ARIA does not change anything about an element's function or behavior. When not using semantic HTML elements for their intended purpose and default functionality, you must use JavaScript to manage behavior, focus, and ARIA states.

The CSS `:required` and `:optional` pseudoclasses match ``, `<select>`, and `<textarea>` elements based on whether they are required or optional, respectively. When using non-semantic elements as form controls, you don't get this CSS pseudoclass selector benefit. You can, however, use attribute selectors if the attribute is present: `[aria-required="true"]` or `[aria-required="false"]`.

If a form contains both required and optional form elements, the required elements should be indicated visually using a treatment that does not rely solely on color to convey meaning. Typically, descriptive text and/or an icon are used.

> **Note:**
> Which elements are required should be apparent to all users. Ensure the visual presentation indicates the form control is required in a consistent, visible manner, remembering that color is not enough to convey information.

## Examples

The attribute should be added to the form-control role. If the user needs to fill in an email address `textbox`, include `aria-required="true"` on the textbox.

```html
<div id="tbLabel">Email Address *</div>
<div
  role="textbox"
  contenteditable
  aria-labelledby="tblabel"
  aria-required="true"
  id="email1"></div>
```

> **Note:**
> If the field's label already contains the word "required", it is recommended to leave out the `aria-required` attribute. This avoids that screen readers read out the term "required" twice.

In this example, JavaScript must be used to prevent the containing form from being submitted if the textbox has no content.

This could be written semantically, without the need for JavaScript:

```html
<label for="email1">Email Address (required)</label>
<input type="email" id="email1" required />
```

## Values

- `true`
    The element requires a value or must be checked for the form to be submittable.
- `false`
    The element is not required.

## Associated interfaces

- `Element.ariaRequired`
    The `ariaRequired` property, part of the `Element` interface, reflects the value of the `aria-required` attribute.
- `ElementInternals.ariaRequired`
    The `ariaRequired` property, part of the `ElementInternals` interface, reflects the value of the `aria-required` attribute.

## Associated roles

Used in roles:

- `checkbox`
- `combobox`
- `gridcell`
- `listbox`
- `radiogroup`
- `spinbutton`
- `textbox`
- `tree`

Inherits into roles:

- `columnheader`
- `rowheader`
- `searchbox`
- `switch`
- `treegrid`

## See also

- HTML `required` attribute
- `:optional` pseudoclass
- `:required` pseudoclass
- `aria-invalid` attribute
- MDN Understanding WCAG, Guideline 3.3 explanations
- Understanding Success Criterion 3.3.2 | W3C Understanding WCAG 2.0
