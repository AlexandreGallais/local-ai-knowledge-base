---
title: "`:valid` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_valid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:valid` CSS pseudo-class

The **`:valid`** CSS pseudo-class represents any `` or other `<form>` element whose contents validate successfully. This allows you to easily make valid fields adopt an appearance that helps the user confirm that their data is formatted properly.

```css
label {
  display: block;
  margin-top: 1em;
}

input:valid {
  background-color: ivory;
  border: none;
  outline: 2px solid deepskyblue;
  border-radius: 5px;
  accent-color: gold;
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
:valid {
  /* ... */
}
```

## Accessibility

The color green is commonly used to indicate valid input. People who have certain types of color blindness will be unable to determine the input's state unless it is accompanied by an additional indicator that does not rely on color to convey meaning. Typically, descriptive text and/or an icon are used.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.1 | W3C Understanding WCAG 2.0

## Examples

### Indicating valid and invalid form fields

In this example, we include extra `` elements to generate content that indicates valid or invalid data:

```html
<fieldset>
  <legend>Contact information</legend>
  <p>Required fields are labeled with "required".</p>
  <div>
    <label for="fname">First name: </label>
    <input id="fname" name="fname" type="text" required />
    <span></span>
  </div>
  <div>
    <label for="lname">Last name: </label>
    <input id="lname" name="lname" type="text" required />
    <span></span>
  </div>
  <div>
    <label for="email"> Email address (include if you want a response): </label>
    <input id="email" name="email" type="email" />
    <span></span>
  </div>
</fieldset>
```

To provide these indicators, we use the following CSS:

```css
body {
  font-family: sans-serif;
  margin: 20px auto;
  max-width: 460px;
}

fieldset {
  padding: 10px 30px 0;
}

legend {
  color: white;
  background: black;
  padding: 5px 10px;
}

fieldset > div {
  margin-bottom: 20px;
  display: flex;
  flex-flow: row wrap;
}

label,
input {
  display: block;
  font-family: inherit;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  height: 30px;
}

input {
  box-shadow: inset 1px 1px 3px #cccccc;
  border-radius: 5px;
}

input:hover,
input:focus {
  background-color: #eeeeee;
}

input:required + span::after {
  font-size: 0.7rem;
  position: absolute;
  content: "required";
  color: white;
  background-color: black;
  padding: 5px 10px;
  top: -26px;
  left: -70px;
}
```

```css
input + span {
  position: relative;
}

input + span::before {
  position: absolute;
  right: -20px;
  top: 5px;
}

input:invalid {
  border: 2px solid red;
}

input:invalid + span::before {
  content: "✖";
  color: red;
}

input:valid + span::before {
  content: "✓";
  color: green;
}
```

We set the ``s to `position: relative` so that we can position the generated content relative to them. We then absolutely position different generated content depending on whether the form's data is valid or invalid — a green check or a red cross, respectively. To add a bit of extra urgency to the invalid data, we've also given the inputs a thick red border when invalid.

> **Note:**
> We've used `::before` to add these labels, as we were already using `::after` for the "required" labels.

You can try it below:

Notice how the required text inputs are invalid when empty, but valid when they have something filled in. The email input on the other hand is valid when empty, as it is not required, but invalid when it contains something that is not a proper email address.

## See also

- Other validation-related pseudo-classes: `:required`, `:optional`, `:invalid`
- Form data validation
- Accessing the validity state from JavaScript
