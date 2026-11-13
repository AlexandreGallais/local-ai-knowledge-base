---
title: "`<input>` HTML input element (part 4 of 7)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input>` HTML input element (part 4 of 7)

When an input element is given a `name`, that name becomes a property of the owning form element's `HTMLFormElement.elements` property. If you have an input whose `name` is set to `guest` and another whose `name` is `hat-size`, the following code can be used:

    ```js
    let form = document.querySelector("form");

    let guestName = form.elements.guest;
    let hatSize = form.elements["hat-size"];
    ```

    When this code has run, `guestName` will be the `HTMLInputElement` for the `guest` field, and `hatSize` the object for the `hat-size` field.

    > **Warning:**
    > Avoid giving form elements a `name` that corresponds to a built-in property of the form, since you would then override the predefined property or method with this reference to the corresponding input.

- `pattern`
    Valid for `text`, `search`, `url`, `tel`, `email`, and `password`, the `pattern` attribute is used to compile a regular expression that the input's `value` must match in order for the value to pass <example-value> validation. It must be a valid JavaScript regular expression, as used by the `RegExp` type, and as documented in our guide on regular expressions. No forward slashes should be specified around the pattern text. When compiling the regular expression:
    1. the pattern will be implicitly wrapped with `^(?:` and `)$`, such that the match is required against the _entire_ input value, i.e., `^(?:<pattern>)$`.
    2. the `'v'` flag is specified so that the pattern is treated as a sequence of Unicode code points, instead of as ASCII.

    If the `pattern` attribute is present but is not specified or is invalid, no regular expression is applied and this attribute is ignored completely. If the pattern attribute is valid and a non-empty value does not match the pattern, constraint validation will prevent form submission. If the `multiple` is present, the compiled regular expression is matched against each comma separated value.

    > **Note:**
    > If using the `pattern` attribute, inform the user about the expected format by including explanatory text nearby. You can also include a `title` attribute to explain what the requirements are to match the pattern; most browsers will display this title as a tooltip. The visible explanation is required for accessibility. The tooltip is an enhancement.

    See Client-side validation for more information.

- `placeholder`
    Valid for `text`, `search`, `url`, `tel`, `email`, `password`, and `number`, the `placeholder` attribute provides a brief hint to the user as to what kind of information is expected in the field. It should be a word or short phrase that provides a hint as to the expected type of data, rather than an explanation or prompt. The text _must not_ include carriage returns or line feeds. So for example if a field is expected to capture a user's first name, and its label is "<example-value>", a suitable placeholder might be "<example-value>".

    > **Note:**
    > The `placeholder` attribute is not as semantically useful as other ways to explain your form, and can cause unexpected technical issues with your content. See Labels for more information.

- `popovertarget`
    Turns an `` element into a popover control button; takes the ID of the popover element to control as its value. See the `Popover API` landing page for more details. Establishing a relationship between a popover and its invoker button using the `popovertarget` attribute has two additional useful effects:
    - The browser creates an implicit `aria-details` and `aria-expanded` relationship between popover and invoker, and places the popover in a logical position in the keyboard focus navigation order when shown. This makes the popover more accessible to keyboard and assistive technology (AT) users (see also Popover accessibility features).
    - The browser creates an implicit anchor reference between the two, making it very convenient to position popovers relative to their controls using CSS anchor positioning. See Popover anchor positioning for more details.

- `popovertargetaction`
    Specifies the action to be performed on a popover element being controlled by a control ``. Possible values are:
    - `"hide"`
        The button will hide a shown popover. If you try to hide an already hidden popover, no action will be taken.
    - `"show"`
        The button will show a hidden popover. If you try to show an already showing popover, no action will be taken.
    - `"toggle"`
        The button will toggle a popover between showing and hidden. If the popover is hidden, it will be shown; if the popover is showing, it will be hidden. If `popovertargetaction` is omitted, `"toggle"` is the default action that will be performed by the control button.

- `readonly`
    A Boolean attribute which, if present, indicates that the user should not be able to edit the value of the input. The `readonly` attribute is supported by the `text`, `search`, `url`, `tel`, `email`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, and `password` input types.

    See the HTML attribute: `readonly` for more information.

- `required`
    `required` is a Boolean attribute which, if present, indicates that the user must specify a value for the input before the owning form can be submitted. The `required` attribute is supported by `text`, `search`, `url`, `tel`, `email`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, `password`, `checkbox`, `radio`, and `file` inputs.

    See Client-side validation and the HTML attribute: `required` for more information.

- `size`
    Valid for `email`, `password`, `tel`, `url`, and `text`, the `size` attribute specifies how much of the input is shown. Basically creates same result as setting CSS `width` property with a few specialties. The actual unit of the value depends on the input type. For `password` and `text`, it is a number of characters (or `em` units) with a default value of `20`, and for others, it is pixels (or `px` units). CSS `width` takes precedence over the `size` attribute.

- `src`
    Valid for the `image` input button only, the `src` is string specifying the URL of the image file to display to represent the graphical submit button. See the `<image>` input type.

- `step`
    Valid for `date`, `month`, `week`, `time`, `datetime-local`, `number`, and `range`, the `step` attribute is a number that specifies the granularity that the value must adhere to. Only values which are a whole number of steps from the step base are valid. The step base is `min` if specified, `value` otherwise, or `0` if neither is provided (except for `week`, which has a default step base of −259,200,000, representing the start of week `1970-W01`).

    If not explicitly included:
    - `step` defaults to 1 for `number` and `range`.
    - Each date/time input type has a default `step` value appropriate for the type; see the individual input pages: `date`, `datetime-local`, `month`, `time`, and `week`.

    The value must be a positive number—integer or float—or the special value `any`, which means no stepping is implied, and any value is allowed (barring other constraints, such as `min` and `max`).

    For example, if you have ``, then any even integer, `10` or greater, is valid. If omitted, ``, any integer is valid, but floats (like `4.2`) are not valid, because `step` defaults to `1`. For `4.2` to be valid, `step` would have had to be set to `any`, 0.1, 0.2, or the `min` value would have had to be a number ending in `.2`, such as ``.

    > **Note:**
    > When the data entered by the user doesn't adhere to the stepping configuration, the value is considered invalid in constraint validation and will match the `:invalid` pseudoclass.

    See Client-side validation for more information.

- `switch` (experimental) (non-standard)
    Valid for `checkbox` input only, `switch` is a Boolean attribute that indicates whether the checkbox input should be rendered as a switch.

    > **Note:**
    > This attribute is still experimental and has limited browser support. The attribute is ignored on unsupported browsers.

- `tabindex`
    Global attribute valid for all elements, including all the input types, an integer attribute indicating if the element can take input focus (is focusable), if it should participate to sequential keyboard navigation. As all input types except for input of type hidden are focusable, this attribute should not be used on form controls, because doing so would require the management of the focus order for all elements within the document with the risk of harming usability and accessibility if done incorrectly.

- `title`
    Global attribute valid for all elements, including all input types, containing a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip. The title should NOT be used as the primary explanation of the purpose of the form control. Instead, use the `` element with a `for` attribute set to the form control's `id` attribute. See Labels below.

- `type`
    A string specifying the type of control to render. For example, to create a checkbox, a value of `checkbox` is used. If omitted (or an unknown value is specified), the input type `text` is used, creating a plaintext input field.

    Permitted values are listed in Input types above.

- `value`
    The input control's value. When specified in the HTML, this is the initial value, and from then on it can be altered or retrieved at any time using JavaScript to access the respective `HTMLInputElement` object's `value` property. The `value` attribute is always optional, though should be considered mandatory for `checkbox`, `radio`, and `hidden`.

- `webkitdirectory`
    The Boolean `webkitdirectory` attribute, if present, indicates that only directories should be available to be selected by the user in the file picker interface. See `HTMLInputElement.webkitdirectory` for additional details and examples.

    > **Note:**
    > `webkitdirectory` is defined in the File and Directory Entries API. It's named `webkitdirectory` because of its origins as a Chrome-specific API. It is now available in all browsers.

- `width`
    Valid for the `image` input button only, the `width` is the width of the image file to display to represent the graphical submit button. See the `<image>` input type.

### Non-standard attributes

The following non-standard attributes are also available on some browsers. As a general rule, you should avoid using them unless it can't be helped.

       | Attribute
       | Description

       | `incremental`
       |
        Whether or not to send repeated `search` events to allow updating live search results while the user is still editing the value of the field.
        WebKit and Blink only (Safari, Chrome, Opera, etc.).

       | `mozactionhint` (deprecated)
       |
        A string indicating the type of action that will be taken when the user
        presses the `Enter` or `Return` key while editing the
        field; this is used to determine an appropriate label for that key on a
        virtual keyboard. Since this attribute is deprecated, use `enterkeyhint` instead.

       | `orient`
       |
        Sets the orientation of the range slider. Firefox only.

       | `results`
       |
        The maximum number of items that should be displayed in the drop-down list of previous search queries. Safari only.

- `incremental` (non-standard)
    The Boolean attribute `incremental` is a WebKit and Blink extension (so supported by Safari, Opera, Chrome, etc.) which, if present, tells the user agent to process the input as a live search. As the user edits the value of the field, the user agent sends `search` events to the `HTMLInputElement` object representing the search box. This allows your code to update the search results in real time as the user edits the search.

    If `incremental` is not specified, the `search` event is only sent when the user explicitly initiates a search (such as by pressing the `Enter` or `Return` key while editing the field).

    The `search` event is rate-limited so that it is not sent more frequently than an implementation-defined interval.

- `orient` (non-standard)
    Similar to the -moz-orient non-standard CSS property impacting the `<progress>` and `<meter>` elements, the `orient` attribute defines the orientation of the range slider. Values include `horizontal`, meaning the range is rendered horizontally, and `vertical`, where the range is rendered vertically. See Creating vertical form controls for a modern approach to creating vertical form controls.

- `results` (non-standard)
    The `results` attribute—supported only by Safari—is a numeric value that lets you override the maximum number of entries to be displayed in the `` element's natively-provided drop-down menu of previous search queries.

    The value must be a non-negative decimal number. If not provided, or an invalid value is given, the browser's default maximum number of entries is used.

## Methods

The following methods are provided by the `HTMLInputElement` interface which represents `` elements in the DOM. Also available are those methods specified by the parent interfaces, `HTMLElement`, `Element`, `Node`, and `EventTarget`.

- `checkValidity()`
    Returns `true` if the element's value passes validity checks; otherwise, returns `false` and fires an `invalid` event at the element.
- `reportValidity()`
    Returns `true` if the element's value passes validity checks; otherwise, returns `false`, fires an `invalid` event at the element, and (if the event isn't canceled) reports the problem to the user.
- `select()`
    Selects the entire content of the `` element, if the element's content is selectable. For elements with no selectable text content (such as a visual color picker or calendar date input), this method does nothing.
- `setCustomValidity()`
    Sets a custom message to display if the input element's value isn't valid.
- `setRangeText()`
    Sets the contents of the specified range of characters in the input element to a given string. A `selectMode` parameter is available to allow controlling how the existing content is affected.
- `setSelectionRange()`
    Selects the specified range of characters within a textual input element. Does nothing for inputs which aren't presented as text input fields.
- `showPicker()`
    Displays the browser picker for the input element that would normally be displayed when the element is selected, but triggered from a button press or other user interaction.
- `stepDown()`
    Decrements the value of a numeric input by one, by default, or by the specified number of units.
- `stepUp()`
    Increments the value of a numeric input by one or by the specified number of units.
