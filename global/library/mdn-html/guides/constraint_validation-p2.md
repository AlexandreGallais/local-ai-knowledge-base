---
title: "Using HTML form validation and the Constraint Validation API (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/guides/constraint_validation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using HTML form validation and the Constraint Validation API (part 2 of 2)

## Visual styling of constraint validation

Apart from setting constraints, web developers want to control what messages are displayed to the users and how they are styled.

### Controlling the look of elements

The look of elements can be controlled via CSS pseudo-classes.

#### :required and :optional CSS pseudo-classes

The `:required` and `:optional` pseudo-classes allow writing selectors that match form elements that have the `required` attribute, or that don't have it.

#### :placeholder-shown CSS pseudo-class

See `:placeholder-shown`.

#### :valid :invalid CSS pseudo-classes

The `:valid` and `:invalid` pseudo-classes are used to represent \ elements whose content validates and fails to validate respectively according to the input's type setting. These classes allow the user to style valid or invalid form elements to make it easier to identify elements that are either formatted correctly or incorrectly.

### Controlling the text of constraint violation

The following items can help with controlling the text of a constraint violation:

- The `setCustomValidity(message)` method on the following elements:
  - `<fieldset>`. Note: Setting a custom validity message on fieldset elements will not prevent form submission in most browsers.
  - ``
  - `<output>`
  - `<select>`
  - Submit buttons (created with either a `` element with the `submit` type, or an `input` element with the `<submit>` type). Other types of buttons do not participate in constraint validation.
  - `<textarea>`

- The `ValidityState` interface describes the object returned by the `validity` property of the element types listed above. It represents various ways that an entered value can be invalid. Together, they help explain why an element's value fails to validate, if it's not valid.
