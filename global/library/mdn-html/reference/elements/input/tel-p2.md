---
title: "`<input type=\"tel\">` HTML attribute value (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/tel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="tel">` HTML attribute value (part 2 of 2)

## Examples

In this example, we present a `<select>` element that lets the user choose which country they're in, and a set of `` elements to let them enter each part of their phone number; there is no reason why you can't have multiple `tel` inputs.

Each input has a `placeholder` attribute to show a hint to sighted users about what to enter into it, a `pattern` to enforce a specific number of characters for the desired section, and an `aria-label` attribute to contain a hint to be read out to screen reader users about what to enter into it.

```html
<div>
  <label for="country">Choose your country:</label>
  <select id="country" name="country">
    <option>UK</option>
    <option selected>US</option>
    <option>Germany</option>
  </select>
</div>
<div>
  <p>Enter your telephone number:</p>
  <span class="areaDiv">
    <input
      id="areaNo"
      name="areaNo"
      type="tel"
      required
      placeholder="Area code"
      pattern="[0-9]{3}"
      aria-label="Area code" />
    <span class="validity"></span>
  </span>
  <span class="number1Div">
    <input
      id="number1"
      name="number1"
      type="tel"
      required
      placeholder="First part"
      pattern="[0-9]{3}"
      aria-label="First part of number" />
    <span class="validity"></span>
  </span>
  <span class="number2Div">
    <input
      id="number2"
      name="number2"
      type="tel"
      required
      placeholder="Second part"
      pattern="[0-9]{4}"
      aria-label="Second part of number" />
    <span class="validity"></span>
  </span>
</div>
```

The JavaScript contains an `onchange` event handler that, when the `<select>` value is changed, updates the `` element's `pattern`, `placeholder`, and `aria-label` to suit the format of telephone numbers in that country/territory.

```js
const selectElem = document.querySelector("select");
const inputElems = document.querySelectorAll("input");

selectElem.onchange = () => {
  for (const e of inputElems) {
    e.value = "";
  }

  if (selectElem.value === "US") {
    inputElems[2].parentNode.style.display = "inline";

    inputElems[0].placeholder = "Area code";
    inputElems[0].pattern = "[0-9]{3}";

    inputElems[1].placeholder = "First part";
    inputElems[1].pattern = "[0-9]{3}";
    inputElems[1].setAttribute("aria-label", "First part of number");

    inputElems[2].placeholder = "Second part";
    inputElems[2].pattern = "[0-9]{4}";
    inputElems[2].setAttribute("aria-label", "Second part of number");
  } else if (selectElem.value === "UK") {
    inputElems[2].parentNode.style.display = "none";

    inputElems[0].placeholder = "Area code";
    inputElems[0].pattern = "[0-9]{3,6}";

    inputElems[1].placeholder = "Local number";
    inputElems[1].pattern = "[0-9]{4,8}";
    inputElems[1].setAttribute("aria-label", "Local number");
  } else if (selectElem.value === "Germany") {
    inputElems[2].parentNode.style.display = "inline";

    inputElems[0].placeholder = "Area code";
    inputElems[0].pattern = "[0-9]{3,5}";

    inputElems[1].placeholder = "First part";
    inputElems[1].pattern = "[0-9]{2,4}";
    inputElems[1].setAttribute("aria-label", "First part of number");

    inputElems[2].placeholder = "Second part";
    inputElems[2].pattern = "[0-9]{4}";
    inputElems[2].setAttribute("aria-label", "Second part of number");
  }
};
```

The example looks like this:

This is an interesting idea, which goes to show a potential solution to the problem of dealing with international phone numbers. You would have to extend the example of course to provide the correct pattern for potentially every country, which would be a lot of work, and there would still be no foolproof guarantee that the users would enter their numbers correctly.

It makes you wonder if it is worth going to all this trouble on the client-side, when you could just let the user enter their number in whatever format they wanted on the client-side and then validate and sanitize it on the server. But this choice is yours to make.

```css
div {
  margin-bottom: 10px;
  position: relative;
}

input[type="number"] {
  width: 100px;
}

input + span {
  padding-right: 30px;
}

input:invalid + span::after {
  position: absolute;
  content: "✖";
  padding-left: 5px;
  color: darkred;
}

input:valid + span::after {
  position: absolute;
  content: "✓";
  padding-left: 5px;
  color: #009000;
}
```

## Technical Summary

       | Value
       |
        A string representing a telephone number, or
        empty

       | Events
       |
        `change` and
        `input`

       | Supported common attributes
       |
        `autocomplete`,
        `list`,
        `maxlength`,
        `minlength`,
        `pattern`,
        `placeholder`,
        `readonly`, and
        `size`

       | IDL attributes
       |
        `list`, `selectionStart`,
        `selectionEnd`, `selectionDirection`, and
        `value`

       | DOM interface
       | `HTMLInputElement`

       | Implicit ARIA Role
       |
        with no `list` attribute:
        <code>textbox</code>
        with `list` attribute: <code>combobox</code>

## See also

- HTML forms guide
- ``
  - ``
  - ``
