---
title: "`<input>` HTML input element (part 5 of 7)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input>` HTML input element (part 5 of 7)

## CSS

Inputs, being replaced elements, have a few features not applicable to non form elements. There are CSS selectors that can specifically target form controls based on their UI features, also known as UI pseudo-classes. The input element can also be targeted by type with attribute selectors. There are some properties that are especially useful as well.

### UI pseudo-classes

    Pseudo-classes relevant to the
    `&#x3C;input>`
    element:

       | Pseudo-class
       | Description

       | `:enabled`
       |
        Any currently enabled element that can be activated (selected, clicked
        on, typed into, etc.) or accept focus and also has a disabled state, in
        which it can't be activated or accept focus.

       | `:disabled`
       |
        Any currently disabled element that has an enabled state, meaning it
        otherwise could be activated (selected, clicked on, typed into, etc.) or
        accept focus were it not disabled.

       | `:read-only`
       | Element not editable by the user

       | `:read-write`
       | Element that is editable by the user.

       | `:placeholder-shown`
       |
        Element that is currently displaying `placeholder` text,
        including `&#x3C;input>` and `<textarea>` elements with the `placeholder` attribute present that has, as yet, no value.

       | `:default`
       |
        Form elements that are the default in a group of related elements.
        Matches `<checkbox>` and
        `<radio>` input types that
        were checked on page load or render.

       | `:checked`
       |
        Matches `<checkbox>` and
        `<radio>` input types that
        are currently checked (and the `<option>` in a
        `<select>` that is currently selected).

       | `:indeterminate`
       |
        `<checkbox>` elements
        whose indeterminate property is set to true by JavaScript,
        `<radio>` elements, when all
        radio buttons with the same name value in the form are unchecked, and
        `<progress>` elements in an indeterminate state

       | `:valid`
       |
        Form controls that can have constraint validation applied and are
        currently valid.

       | `:invalid`
       |
        Form controls that have constraint validation applied and are currently
        not valid. Matches a form control whose value doesn't match the
        constraints set on it by its attributes, such as
        `required`,
        `pattern`,
        `step` and `max`.

       | `:in-range`
       |
        A non-empty input whose current value is within the range limits
        specified by the `min` and `max` attributes and the `step`.

       | `:out-of-range`
       |
        A non-empty input whose current value is NOT within the range limits
        specified by the `min`
        and `max` attributes or
        does not adhere to the `step` constraint.

       | `:required`
       |
        `&#x3C;input>`, `<select>`, or `<textarea>` element that has the `required` attribute set on it.
        Only matches elements that can be required.
        The attribute included on a non-requirable element will not make for a match.

       | `:optional`
       |
        `&#x3C;input>`, `<select>`, or
        `<textarea>` element that does NOT have the `required` attribute set on it.
        Does not match elements that can't be required.

       | `:blank`
       |
        `&#x3C;input>` and `<textarea>` elements that currently have no value.

       | `:user-invalid`
       |
        Similar to `:invalid`, but is activated on blur. Matches
        invalid input but only after the user interaction, such as by focusing
        on the control, leaving the control, or attempting to submit the form
        containing the invalid control.

       | `:open`
       |
        `<input>` elements that display a picker for the user to choose a value from (for example `<input type="color">`) — but only when the element is in the open state, that is, when the picker is displayed.

#### Pseudo-classes example

We can style a checkbox label based on whether the checkbox is checked or not. In this example, we are styling the `color` and `font-weight` of the `` that comes immediately after a checked input. We haven't applied any styles if the `input` is not checked.

```html
<input id="checkboxInput" type="checkbox" />
<label for="checkboxInput">Toggle the checkbox on and off</label>
```

```css
input:checked + label {
  color: red;
  font-weight: bold;
}
```

### Attribute selectors

It is possible to target different types of form controls based on their `type` using attribute selectors. CSS attribute selectors match elements based on either just the presence of an attribute or the value of a given attribute.

```css
/* matches a password input */
input[type="<example-value>"] {
}

/* matches a form control whose valid values are limited to a range of values */
input[min][max] {
}

/* matches a form control with a pattern attribute */
input[pattern] {
}
```

### ::placeholder

By default, the appearance of placeholder text is a translucent or light gray. The `::placeholder` pseudo-element is the input's `placeholder` text. It can be styled with a limited subset of CSS properties.

```css
::placeholder {
  color: blue;
}
```

Only the subset of CSS properties that apply to the `::first-line` pseudo-element can be used in a rule using `::placeholder` in its selector.

### caret-color

A property specific to text entry-related elements is the CSS `caret-color` property, which lets you set the color used to draw the text input caret:

#### HTML

```html
<label for="textInput">Note the red caret:</label>
<input id="textInput" class="custom" size="32" />
```

#### CSS

```css
input.custom {
  caret-color: red;
  font:
    16px "Helvetica",
    "Arial",
    sans-serif;
}
```

#### Result

### field-sizing

The `field-sizing` property enables you to control the sizing behavior of form inputs (i.e., they are given a default preferred size by default.) This property enables you to override the default behavior, allowing form controls to adjust in size to fit their contents.

This property is typically used to create form fields that shrinkwrap their content and grow as more text is entered. This works with input types that accept direct text input (for example, `text` and `url`), input type `file`, and `<textarea>` elements.

### object-position and object-fit

In certain cases (typically involving non-textual inputs and specialized interfaces), the `` element is a replaced element. When it is, the position and size of the element's size and positioning within its frame can be adjusted using the CSS `object-position` and `object-fit` properties.

### Styling

For more information about adding color to elements in HTML, see:

- Applying color to HTML elements using CSS.

Also see:

- Styling HTML forms
- Advanced styling for HTML forms and
