---
title: "HTMLFieldSetElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfieldsetelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFieldSetElement

The **`HTMLFieldSetElement`** interface provides special properties and methods (beyond the regular `HTMLElement` interface it also has available to it by inheritance) for manipulating the layout and presentation of `<fieldset>` elements.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLFieldSetElement.disabled`
    A boolean value reflecting the `disabled` HTML attribute, indicating whether the user can interact with the control.
- `HTMLFieldSetElement.elements` (read-only)
    The elements belonging to this field set. The type of this property depends on the version of the spec that is implemented by the browser.
- `HTMLFieldSetElement.form` (read-only)
    An `HTMLFormControlsCollection` or `HTMLCollection` referencing the containing form element, if this element is in a form.
    If the field set is not a descendant of a form element, then the attribute can be the ID of any form element in the same document it is related to, or the `null` value if none matches.
- `HTMLFieldSetElement.name`
    A string reflecting the `name` HTML attribute, containing the name of the field set. This can be used when accessing the field set in JavaScript. It is _not_ part of the data which is sent to the server.
- `HTMLFieldSetElement.type` (read-only)
    The string `"fieldset"`.
- `HTMLFieldSetElement.validationMessage` (read-only)
    A string representing a localized message that describes the validation constraints that the element does not satisfy (if any). This is the empty string if the element is not a candidate for constraint validation (`willValidate` is `false`), or it satisfies its constraints.
- `HTMLFieldSetElement.validity` (read-only)
    A `ValidityState` representing the validity states that this element is in.
- `HTMLFieldSetElement.willValidate` (read-only)
    A boolean value `false`, because `<fieldset>` objects are never candidates for constraint validation.

## Instance methods

_Inherits methods from its parent, `HTMLElement`._

- `HTMLFieldSetElement.checkValidity()`
    Always returns `true` because `<fieldset>` objects are never candidates for constraint validation.
- `HTMLFieldSetElement.reportValidity()`
    Always returns `true` because `<fieldset>` objects are never candidates for constraint validation.
- `HTMLFieldSetElement.setCustomValidity()`
    Sets a custom validity message for the field set. If this message is not the empty string, then the field set is suffering from a custom validity error, and does not validate.

## See also

- The HTML element implementing this interface: `<fieldset>`.
