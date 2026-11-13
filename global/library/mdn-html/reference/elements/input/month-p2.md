---
title: "`<input type=\"month\">` HTML attribute value (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/month/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="month">` HTML attribute value (part 2 of 2)

## Examples

In this example, we create two sets of UI elements, each designed to let the user select a month and year.
The first is a native `month` input, and the other is a pair of `<select>` elements that allow choosing a month and year independently, for compatibility with browsers that don't yet support ``.

### HTML

The HTML that requests the month and year looks like this:

```html
<div class="nativeDatePicker">
  <label for="month-visit">What month would you like to visit us?</label>
  <input type="month" id="month-visit" name="month-visit" />
  <span class="validity"></span>
</div>
<p class="fallbackLabel">What month would you like to visit us?</p>
<div class="fallbackDatePicker">
  <div>
    <span>
      <label for="month">Month:</label>
      <select id="month" name="month">
        <option selected>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
      </select>
    </span>
    <span>
      <label for="year">Year:</label>
      <select id="year" name="year"></select>
    </span>
  </div>
</div>
```

The `` with the ID `nativeDatePicker` uses the `month` input type to request the month and year, while the `` with the ID `fallbackDatePicker` instead uses a pair of `<select>` elements.
The first requests the month, and the second the year.

The `<select>` for choosing the month is hardcoded with the names of the months, as they don't change (leaving localization out of things).
The list of available year values is dynamically generated depending on the current year (see the code comments below for detailed explanations of how these functions work).

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
}

input:valid + span::after {
  position: absolute;
  content: "✓";
  padding-left: 5px;
}
```

### JavaScript

The JavaScript code that handles selecting which approach to use and to set up the list of years to include in the non-native year `<select>` follows.

The part of the example that may be of most interest is the feature detection code.
In order to detect whether the browser supports ``, we create a new `` element, try setting its `type` to `month`, then immediately check what its type is set to.
Browsers that don't support type `month` will return `text`, since that's What month falls back to when not supported.
If `` is not supported, we hide the native picker and show the fallback picker UI instead.

```js
// Get UI elements
const nativePicker = document.querySelector(".nativeDatePicker");
const fallbackPicker = document.querySelector(".fallbackDatePicker");
const fallbackLabel = document.querySelector(".fallbackLabel");

const yearSelect = document.querySelector("#year");
const monthSelect = document.querySelector("#month");

// Hide fallback initially
fallbackPicker.style.display = "none";
fallbackLabel.style.display = "none";

// Test whether a new date input falls back to a text input or not
const test = document.createElement("input");

try {
  test.type = "month";
} catch (e) {
  console.log(e.description);
}

// If it does, run the code inside the if () {} block
if (test.type === "text") {
  // Hide the native picker and show the fallback
  nativePicker.style.display = "none";
  fallbackPicker.style.display = "block";
  fallbackLabel.style.display = "block";

  // Populate the years dynamically
  // (the months are always the same, therefore hardcoded)
  populateYears();
}

function populateYears() {
  // Get the current year as a number
  const date = new Date();
  const year = date.getFullYear();

  // Make this year, and the 100 years before it available in the year <select>
  for (let i = 0; i <= 100; i++) {
    const option = document.createElement("option");
    option.textContent = year - i;
    yearSelect.appendChild(option);
  }
}
```

> **Note:**
> Remember that some years have 53 weeks in them (see Weeks per year)!
> You'll need to take this into consideration when developing production apps.

## Technical summary

       | Value
       |
        A string representing a month and year, or
        empty.

       | Events
       |
        `change` and
        `input`

       | Supported common attributes
       |
        `autocomplete`,
        `list`,
        `readonly`,
        `step`

       | IDL attributes
       |
        `list`,
        `value`,
        `valueAsDate`,
        `valueAsNumber`

       | DOM interface
       | `HTMLInputElement`

       | Implicit ARIA Role
       | no corresponding role

## See also

- The generic `` element and the interface used to manipulate it, `HTMLInputElement`
- Date and time formats used in HTML
- Date and Time picker tutorial
- ``, ``, ``, and ``
