---
title: "`<input>` HTML input element (part 3 of 7)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input>` HTML input element (part 3 of 7)

### Individual attributes

- `accept`
    Valid for the `file` input type only, the `accept` attribute defines which file types are selectable in a `file` upload control. See the `<file>` input type.

- `alpha` (experimental)
    Valid for the `color` input type only, the `alpha` attribute provides the end user with the ability to set the opacity of the color being selected.

- `alt`
    Valid for the `image` button only, the `alt` attribute provides alternative text for the image, displaying the value of the attribute if the image `src` is missing or otherwise fails to load. See the `<image>` input type.

- `autocapitalize`
    Controls whether inputted text is automatically capitalized and, if so, in what manner. See the `autocapitalize` global attribute page for more information.

- `autocomplete`
    (**Not** a Boolean attribute!) The `autocomplete` attribute takes as its value a space-separated string that describes what, if any, type of autocomplete functionality the input should provide. A typical implementation of autocomplete recalls previous values entered in the same input field, but more complex forms of autocomplete can exist. For instance, a browser could integrate with a device's contacts list to autocomplete `email` addresses in an email input field. See `autocomplete` for permitted values.

    The `autocomplete` attribute is valid on `hidden`, `text`, `search`, `url`, `tel`, `email`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, `range`, `color`, and `password`. This attribute has no effect on input types that do not return numeric or text data, being valid for all input types except `checkbox`, `radio`, `file`, or any of the button types.

    See the `autocomplete` attribute for additional information, including information on password <example-value> and how `autocomplete` is slightly different for `hidden` than for other input types.

- `autofocus`
    A Boolean attribute which, if present, indicates that the input should automatically have focus when the page has finished loading (or when the `<dialog>` containing the element has been displayed).

    > **Note:**
    > An element with the `autofocus` attribute may gain focus before the `DOMContentLoaded` event is fired.

    No more than one element in the document may have the `autofocus` attribute. If put on more than one element, the first one with the attribute receives focus.

    The `autofocus` attribute cannot be used on inputs of type `hidden`, since hidden inputs cannot be focused.

    > **Warning:**
    > Automatically focusing a form control can confuse visually-impaired people using screen-reading technology and people with cognitive impairments. When `autofocus` is assigned, screen-readers "teleport" their user to the form control without warning them beforehand.

    Use careful consideration for accessibility when applying the `autofocus` attribute. Automatically focusing on a control can cause the page to scroll on load. The focus can also cause dynamic keyboards to display on some touch devices. While a screen reader will announce the label of the form control receiving focus, the screen reader will not announce anything before the label, and the sighted user on a small device will equally miss the context created by the preceding content.

- `capture`
    Introduced in the HTML Media Capture specification and valid for the `file` input type only, the `capture` attribute defines which media—microphone, video, or camera—should be used to capture a new file for upload with `file` upload control in supporting scenarios. See the `<file>` input type.
- `checked`
    Valid for both `radio` and `checkbox` types, `checked` is a Boolean attribute. If present on a `radio` type, it indicates that the radio button is the currently selected one in the group of same-named radio buttons. If present on a `checkbox` type, it indicates that the checkbox is checked by default (when the page loads). It does _not_ indicate whether this checkbox is currently checked: if the checkbox's state is changed, this content attribute does not reflect the change. (Only the `HTMLInputElement`'s `checked` IDL attribute is updated.)

    > **Note:**
    > Unlike other input controls, a checkboxes and radio buttons value are only included in the submitted data if they are currently `checked`. If they are, the name and the value(s) of the checked controls are submitted.
    >
    > For example, if a checkbox whose `name` is `fruit` has a `value` of `cherry`, and the checkbox is checked, the form data submitted will include `fruit=cherry`. If the checkbox isn't active, it isn't listed in the form data at all. The default `value` for checkboxes and radio buttons is `on`.

- `colorspace` (experimental)
    Valid for the `color` input type only, the `colorspace` attribute specifies the color space that is used by the `type="color"` input. Possible enumerated values are:
    - `"limited-srgb"`: The color is in the sRGB color space. This includes `rgb()`, `hsl()`, `hwb()`, and `hex-color` values. The color value is limited to 8-bits per `r`, `g`, and `b` component. This is the default.
    - `"display-p3"`: The Display P3 color space, e.g., `color(display-p3 1.84 -0.19 0.72 / 0.6)`

- `dirname`
    Valid for `hidden`, `text`, `search`, `url`, `tel`, and `email` input types, the `dirname` attribute enables the submission of the directionality of the element. When included, the form control will submit with two name/value pairs: the first being the `name` and `value`, and the second being the value of the `dirname` attribute as the name, with a value of `ltr` or `rtl` as set by the browser.

    ```html
    <form action="page.html" method="post">
      <label>
        Fruit:
        <input type="text" name="fruit" dirname="fruit-dir" value="cherry" />
      </label>
      <input type="submit" />
    </form>
    <!-- page.html?fruit=cherry&fruit-dir=ltr -->
    ```

    When the form above is submitted, the input cause both the `name` / `value` pair of `fruit=cherry` and the `dirname` / direction pair of `fruit-dir=ltr` to be sent.
    For more information, see the `dirname` attribute.

- `disabled`
    A Boolean attribute which, if present, indicates that the user should not be able to interact with the input. Disabled inputs are typically rendered with a dimmer color or using some other form of indication that the field is not available for use.

    Specifically, disabled inputs do not receive the `click` event, and disabled inputs are not submitted with the form.

    > **Note:**
    > Although not required by the specification, Firefox will by default persist the dynamic disabled state of an `` across page loads. Use the `autocomplete` attribute to control this feature.

- `form`
    A string specifying the `<form>` element with which the input is associated (that is, its **form owner**). This string's value, if present, must match the `id` of a `<form>` element in the same document. If this attribute isn't specified, the `` element is associated with the nearest containing form, if any.

    The `form` attribute lets you place an input anywhere in the document but have it included with a form elsewhere in the document.

    > **Note:**
    > An input can only be associated with one form.

- `formaction`
    Valid for the `image` and `submit` input types only. See the `<submit>` input type for more information.
- `formenctype`
    Valid for the `image` and `submit` input types only. See the `<submit>` input type for more information.
- `formmethod`
    Valid for the `image` and `submit` input types only. See the `<submit>` input type for more information.
- `formnovalidate`
    Valid for the `image` and `submit` input types only. See the `<submit>` input type for more information.
- `formtarget`
    Valid for the `image` and `submit` input types only. See the `<submit>` input type for more information.
- `height`
    Valid for the `image` input button only, the `height` is the height of the image file to display to represent the graphical submit button. See the `<image>` input type.
- `id`
    Global attribute valid for all elements, including all the input types, it defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking. The value is used as the value of the ``'s `for` attribute to link the label with the form control. See ``.
- `inputmode`
    Global value valid for all elements, it provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Values include `none`, `text`, `tel`, `url`, `email`, `numeric`, `decimal`, and `search`.
- `list`
    The value given to the `list` attribute should be the `id` of a `<datalist>` element located in the same document. The `<datalist>` provides a list of predefined values to suggest to the user for this input. Any values in the list that are not compatible with the `type` are not included in the suggested options. The values provided are suggestions, not requirements: users can select from this predefined list or provide a different value.

    It is valid on `text`, `search`, `url`, `tel`, `email`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, `range`, and `color`.

    Per the specifications, the `list` attribute is not supported by the `hidden`, `password`, `checkbox`, `radio`, `file`, or any of the button types.

    Depending on the browser, the user may see a custom color palette suggested, tic marks along a range, or even an input that opens like a `<select>` but allows for non-listed values. Check out the browser compatibility table for the other input types.

    See the `<datalist>` element.

- `max`
    Valid for `date`, `month`, `week`, `time`, `datetime-local`, `number`, and `range`, it defines the greatest value in the range of permitted values. If the `value` entered into the element exceeds this, the element fails constraint validation. If the value of the `max` attribute isn't a number, then the element has no maximum value.

    There is a special case: if the data type is periodic (such as for dates or times), the value of `max` may be lower than the value of `min`, which indicates that the range may wrap around; for example, this allows you to specify a time range from 10 PM to 4 AM.

- `maxlength`
    Valid for `text`, `search`, `url`, `tel`, `email`, and `password`, it defines the maximum string length (measured in UTF-16 code units) that the user can enter into the field. This must be an integer value of 0 or higher. If no `maxlength` is specified, or an invalid value is specified, the field has no maximum length. This value must also be greater than or equal to the value of `minlength`.

    The input will fail constraint validation if the length of the text entered into the field is greater than `maxlength` UTF-16 code units long. By default, browsers prevent users from entering more characters than allowed by the `maxlength` attribute. Constraint validation is only applied when the value is changed by the user. See Client-side validation for more information.

- `min`
    Valid for `date`, `month`, `week`, `time`, `datetime-local`, `number`, and `range`, it defines the most negative value in the range of permitted values. If the `value` entered into the element is less than this, the element fails constraint validation. If the value of the `min` attribute isn't a number, then the element has no minimum value.

    This value must be less than or equal to the value of the `max` attribute. If the `min` attribute is present but is not specified or is invalid, no `min` value is applied. If the `min` attribute is valid and a non-empty value is less than the minimum allowed by the `min` attribute, constraint validation will prevent form submission. See Client-side validation for more information.

    There is a special case: if the data type is periodic (such as for dates or times), the value of `max` may be lower than the value of `min`, which indicates that the range may wrap around; for example, this allows you to specify a time range from 10 PM to 4 AM.

- `minlength`
    Valid for `text`, `search`, `url`, `tel`, `email`, and `password`, it defines the minimum string length (measured in UTF-16 code units) that the user can enter into the entry field. This must be a non-negative integer value smaller than or equal to the value specified by `maxlength`. If no `minlength` is specified, or an invalid value is specified, the input has no minimum length.

    The input will fail constraint validation if the length of the text entered into the field is fewer than `minlength` UTF-16 code units long, preventing form submission. Constraint validation is only applied when the value is changed by the user. See Client-side validation for more information.

- `multiple`
    The Boolean `multiple` attribute, if set, means the user can enter comma separated email addresses in the email widget or can choose more than one file with the `file` input. See the `<email>` and `<file>` input type.

- `name`
    A string specifying a name for the input control. This name is submitted along with the control's value when the form data is submitted.

    Consider the `name` a required attribute (even though it's not). If an input has no `name` specified, or `name` is empty, the input's value is not submitted with the form! (Disabled controls, unchecked radio buttons, unchecked checkboxes, and reset buttons are also not sent.)

    There are two special cases:
    1. `_charset_` : If used as the name of an `` element of type `<hidden>`, the input's `value` is automatically set by the user agent to the character encoding being used to submit the form.
    2. `isindex`: For historical reasons, the name `isindex` is not allowed.

    The `name` attribute creates a unique behavior for radio buttons.

    Only one radio button in a same-named group of radio buttons can be checked at a time. Selecting any radio button in that group automatically deselects any currently-selected radio button in the same group. The value of that one checked radio button is sent along with the name if the form is submitted,

    When tabbing into a series of same-named group of radio buttons, if one is checked, that one will receive focus. If they aren't grouped together in source order, if one of the group is checked, tabbing into the group starts when the first one in the group is encountered, skipping all those that aren't checked. In other words, if one is checked, tabbing skips the unchecked radio buttons in the group. If none are checked, the radio button group receives focus when the first button in the same name group is reached.

    Once one of the radio buttons in a group has focus, using the arrow keys will navigate through all the radio buttons of the same name, even if the radio buttons are not grouped together in the source order.
