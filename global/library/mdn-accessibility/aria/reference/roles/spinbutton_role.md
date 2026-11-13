---
title: "ARIA: spinbutton role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/spinbutton_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: spinbutton role

The `spinbutton` role defines a type of range that expects the user to select a value from among discrete choices.

## Description

The `spinbutton` role indicates that the element is an input widget that restricts its value to a set or range of discrete values. The role also comes with increment and decrement functionality. For example, in a widget that enables users to choose an amount to bet in a game of Texas Holdem, the `spinbutton` role can allow users to select a number between the minimum and maximum bets in increments, as allowed by the current game rules.

The spinbutton represents the range of possible values. The value of the spinbutton input represents the current value.

Spinbuttons often have three components, including a text field that displays the current value, an increment button, and a decrement button. The text field is usually the only focusable component because the increment and decrement functions are keyboard-accessible via arrow keys. Typically, the text field also allows users to directly edit the value.

In addition to including the `tabindex` attribute to enable spinbutton focus, keyboard and pointer device support must be implemented. Directional keys such as the arrow keys must be supported for keyboard users. Changing the value when increment and decrement buttons are clicked must be supported for pointing devices. See keyboard interactions below.

> **Note:**
> It is recommended to use `` element, or other input types for dates and time that also implicitly have the `role="spinbutton"` semantic, rather than the `spinbutton` role. User agents provide stylized widgets for these input elements which provide default increment, decrement, and native range limiting functionality. When using non-semantic elements, all features of the native semantic element need to be recreated with ARIA attributes, JavaScript, and CSS.

### ARIA range widget options

ARIA provides developers with six different range widget roles, including `progressbar`, `meter`, `slider`, and `spinbutton`.

The `progressbar` role, similar to HTML's `<progress>` element, is a read-only range. It indicates the portion of completion of a task, progressing in a single direction, such as a file upload's loading progress bar that eventually reaches 100% when fully loaded.

The `meter` role, similar to HTML's `<meter>` element, is a read-only gauge. It indicates the amount of something within a known range, such as a computer's battery indicator or a car's gas gauge.

The `slider` role, similar to HTML's `input` of type `range`, ``, is a read-write input range. Sliders allow users to select a value between the predefined minimum and maximum values. The user selects a value by moving a slider thumb along a horizontal or vertical slider to select a value.

The `spinbutton` role is also read-write: the range of discrete values it provides is selected via user interaction. Like `slider` controls, `spinbutton` widgets must be able to receive focus and support keyboard, pointer, and touch interaction.

> **Warning:**
> To change the spinbutton value, touch-based assistive technologies need to respond to user gestures for increasing and decreasing the value by synthesizing key events.
> Fully test spinbutton widgets using assistive technologies on devices where touch is a primary input mechanism before using the `spinbutton` role (and all range widgets).

### Common attributes

The `aria-valuemin` attribute sets the minimum value. If omitted or not a number, it defaults to `0` (zero).

The `aria-valuemax` attribute defines the maximum value. If it is missing or not a number, it defaults to `100`.

The `aria-valuenow` attribute value must be between the minimum and maximum values, both inclusive. This attribute is required for and `meter` and optional for `progressbar`.

For `spinbutton`, unless using semantic HTML elements like ``, if the value is updated, the `aria-valuenow` value must also be updated programmatically.

The optional `aria-valuetext` attribute is included when the `aria-valuenow` numeric value doesn't reflect the intended value of the spinbutton. The optional minimum, maximum, and current values should be numeric. When the values these numbers represent are not numeric, the `aria-valuetext` attribute should be included with a string value defining the numeric value. For example, if using a spinbutton for t-shirt sizes, the `aria-valuetext` attribute should shift from `XX-Small` through `XX-Large` as the `aria-valuenow` increases.

The `aria-valuetext` value must be updated as the value or `aria-valuenow` is updated. ARIA attributes are supported on semantic HTML elements. While there is no equivalent HTML attribute for ``, you can include `aria-valuetext` on any `` type. When `aria-valuetext` is an important feature for a spinbutton, consider using `<select>` with `<option>` elements instead.

An accessible name is **required**. If the `spinbutton` role is applied to an HTML `` element, the accessible name can come from the associated ``. Otherwise, use `aria-labelledby` if a visible label is present or `aria-label` if a visible label is not present.

When not using the HTML `` element to create your spinbutton, include the `tabindex` attribute to make the spinbutton focusable. The `spinbutton` role is user-interactive, and therefore, requires being able to receive focus. Focus should be placed on the spinbutton input and not on the associated buttons that increment and decrement the spinbutton value.

### Descendants limited to buttons or text

There are some types of user interface components that, when represented in a platform accessibility API, can only contain specific content. The children or owned elements of `spinbutton` are limited to a textbox and two buttons. Alternatively, the `spinbutton` role can be applied to a `text` input and sibling buttons can be used to support the increment and decrement functions.

### Associated WAI-ARIA roles, states, and properties

- `aria-valuenow`
    Set to a decimal value between `aria-valuemin` and `aria-valuemax`, indicating the current value of the spinbutton. If not present, the spinbutton element has no current value.

- `aria-valuetext`
    Assistive technologies often present the value of `aria-valuenow` as a number. If `aria-valuenow` cannot be accurate, use `aria-valuetext` to provide the spinbutton with a more understandable value.

- `aria-valuemin`
    Set to a decimal value representing the minimum value and less than `aria-valuemax`. If not present, there is no default value.

- `aria-valuemax`
    Set to a decimal value representing the maximum value and greater than `aria-valuemin`. If not present, there is no default value.

- `aria-labelledby`
    Defines the string value or identifies the element (or elements) that label the spinbutton element providing an accessible name. An accessible name is required.
- `aria-label`
    Defines a string value that labels the spinbutton element. This provides an accessible name to the element when no visible label is available to provide the required accessible name via `` or `aria-labelledby`.

### Keyboard interactions

| Key(s)               | Action                                                                          |
| -------------------- | ------------------------------------------------------------------------------- |
| Right and Up arrows  | Increase the selected value by one step                                         |
| Left and Down arrows | Decrease the selected value by one step                                         |
| Page Up              | (Optional) Increase the value by a set amount greater than or equal to one step |
| Page Down            | (Optional) Decrease the value by a set amount greater than or equal to one step |
| Home                 | Set the spinbutton to the minimum value                                         |
| End                  | Set the spinbutton to the maximum value                                         |

For the optional `Page Up` and `Page Down` keys, the change in spinbutton value should preferably be by an amount larger than the step changes made by Up and Down arrow keys.

## Examples

In the example below, a `spinbutton` role has been defined to allow users to select a day of the month.

```html
<p id="day">Enter the day of the month</p>
<button type="button" tabindex="-1" aria-label="previous day">˱</button>
<div
  role="spinbutton"
  tabindex="0"
  aria-valuenow="1"
  aria-valuetext="first"
  aria-valuemin="1"
  aria-valuemax="31"
  aria-labelledby="day">
  1
</div>
<button type="button" tabindex="-1" aria-label="next day">˲</button>
```

In this example, we included a negative `tabindex` to remove the buttons from the default tabbing order. We also added `tabindex` to a normally non-interactive `` to add the `spinbutton` itself to the tabbing order. This example requires JavaScript to handle keyboard actions when the spinbutton has focus and when a mouse user clicks on the buttons.

### With semantic HTML

This could have also been written using semantic HTML, removing the need for any CSS or JavaScript and also removing the need to include and provide functionality for extraneous incrementing and decrementing buttons. The code snippet below shows the previous example without the `spinbutton` role and using semantic HTML.

```html
<label for="day">Enter the day of the month</label>
<input
  type="number"
  value="1"
  aria-valuetext="first"
  min="1"
  max="31"
  id="day" />
```

In this case, the only JavaScript needed would be to update the `aria-valuetext` when the input value changes, which really is an optional feature in this case.

## Best practices

HTML's `` implicitly has the `role` of `spinbutton`. HTML's `` has 3 nested spin buttons, one each for month, day, and year. When using semantic HTML form elements for their intended purposes, do not use `aria-valuemax` or `aria-valuemin` attributes; use `min` and `max` instead. Otherwise, any global `aria-*` attributes and any other `aria-*` attributes are applicable to the `spinbutton` role.

### Prefer semantic HTML

It is recommended to use the native `` element of type `number`, ``, rather than the `spinbutton` role.

## See also

- ``
- ``
- ``
- Other range widgets include:
  - `meter`
  - `scrollbar`
  - `separator` (if focusable)
  - `progressbar`
  - `slider`
- Working examples:
  - Date picker spin button example
  - Toolbar example: font-size picker
