---
title: "`:invalid` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_invalid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:invalid` CSS pseudo-class

The **`:invalid`** CSS pseudo-class represents any `<form>`, `<fieldset>`, `` or other `<form>` element whose contents fail to validate.

This pseudo-class is useful for highlighting field errors for the user.

```css
label {
  display: block;
  margin-top: 1em;
}

input:invalid {
  background-color: ivory;
  border: none;
  outline: 2px solid red;
  border-radius: 5px;
}
```

```html
<label for="email">Email Address:</label>
<input id="email" name="email" type="email" value="na@user@example.com" />

<label for="<example-value>">Secret Code: (lower case letters)</label>
<input id="<example-value>" name="<example-value>" type="<example-value>" value="<example-value>" pattern="<example-value>" />

<label for="age">Your age: (18+)</label>
<input id="age" name="age" type="number" value="5" min="18" />

<label
  ><input name="tos" type="checkbox" required checked /> - Do you agree to
  ToS?</label
>
```

## Syntax

```css
:invalid {
  /* ... */
}
```

## Accessibility

The color red is commonly used to indicate invalid input. People who have certain types of color blindness will be unable to determine the input's state unless it is accompanied by an additional indicator that does not rely on color to convey meaning. Typically, descriptive text and/or an icon are used.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.1 | W3C Understanding WCAG 2.0

## Examples

### Coloring elements to show validation

#### HTML

```html
<form>
  <div class="field">
    <label for="url_input">Enter a URL:</label>
    <input type="url" id="url_input" />
  </div>

  <div class="field">
    <label for="email_input">Enter an email address:</label>
    <input type="email" id="email_input" required />
  </div>
</form>
```

#### CSS

```css
label {
  display: block;
  margin: 1px;
  padding: 1px;
}

.field {
  margin: 1px;
  padding: 1px;
}

input:invalid {
  background-color: #ffdddd;
}

form:invalid {
  border: 5px solid #ffdddd;
}

input:valid {
  background-color: #ddffdd;
}

form:valid {
  border: 5px solid #ddffdd;
}

input:required {
  border-color: maroon;
  border-width: 3px;
}

input:required:invalid {
  border-color: #c00000;
}
```

#### Result

### Showing sections in stages

In this example we use `:invalid` along with `~`, the subsequent-sibling combinator, to make a form appear in stages, so the form initially shows the first item to complete, and when the user completes each item the form displays the next one. When the whole form is complete the user can submit it.

#### HTML

```html
<form>
  <fieldset>
    <legend>Personal Information</legend>
    <label for="form-name">Name</label><br />
    <input type="text" name="name" id="form-name" required />
  </fieldset>

  <fieldset>
    <legend>Contact Information</legend>
    <label for="form-email">Email Address</label><br />
    <input type="email" name="email" id="form-email" required />
  </fieldset>

  <fieldset>
    <legend>Message</legend>
    <label for="form-message">Message</label><br />
    <textarea name="message" id="form-message" required></textarea>
  </fieldset>

  <button type="submit" name="send">Submit</button>
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

#### CSS

```css
/* Hide the fieldset after an invalid fieldset */
fieldset:invalid ~ fieldset {
  display: none;
}

/* Dim and disable the button while the form is invalid */
form:invalid button {
  opacity: 0.3;
  pointer-events: none;
}

input,
textarea {
  box-sizing: border-box;
  width: 100%;
  font-family: monospace;
  padding: 0.25em 0.5em;
}

button {
  width: 100%;
  border: thin solid darkgrey;
  font-size: 1.25em;
  background-color: darkgrey;
  color: white;
}
```

#### Result

## Notes

### Radio buttons

If any one of the radio buttons in a group is `required`, the `:invalid` pseudo-class is applied to all of them if none of the buttons in the group is selected. (Grouped radio buttons share the same value for their `name` attribute.)

### Gecko defaults

By default, Gecko does not apply a style to the `:invalid` pseudo-class. However, it does apply a style (a red "glow" using the `box-shadow` property) to the `:user-invalid` pseudo-class, which applies in a subset of cases for `:invalid`.

## See also

- Other validation-related pseudo-classes: `:required`, `:optional`, `:valid`
- Related Mozilla pseudo-classes: `:user-invalid`, `:-moz-submit-invalid`
- Form data validation
- Accessing the validity state from JavaScript
