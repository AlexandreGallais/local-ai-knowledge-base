---
title: "`<input type=\"week\">` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/week/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="week">` HTML attribute value

`` elements of type **`week`** create input fields allowing easy entry of a year plus the ISO 8601 week number during that year (i.e., week 1 to 52 or 53).

```html
<label for="camp-week">Choose a week in May or June:</label>

<input
  type="week"
  name="week"
  id="camp-week"
  min="2018-W18"
  max="2018-W26"
  required />
```

```css
label {
  display: block;
  font:
    1rem "Fira Sans",
    sans-serif;
}

input,
label {
  margin: 0.4rem 0;
}
```

The control's user interface varies from browser to browser; cross-browser support is currently a bit limited, with only Chrome/Opera and Microsoft Edge supporting it at this time. In non-supporting browsers, the control degrades gracefully to function identically to ``.

## Value

A string representing the value of the week/year entered into the input. The format of the date and time value used by this input type is described in Week strings.

You can set a default value for the input by including a value inside the `value` attribute, like so:

```html
<label for="week">What week would you like to start?</label>
<input id="week" type="week" name="week" value="2017-W01" />
```

One thing to note is that the displayed format may differ from the actual `value`, which is always formatted `yyyy-Www`. When the above value is submitted to the server, for example, browsers may display it as `Week 01, 2017`, but the submitted value will always look like `week=2017-W01`.

You can also get and set the value in JavaScript using the input element's `value` property, for example:

```js
const weekControl = document.querySelector('input[type="week"]');
weekControl.value = "2017-W45";
```

## Additional attributes

In addition to the attributes common to `` elements, week inputs offer the following attributes.

### max

The latest (time-wise) year and week number, in the string format discussed in the Value section above, to accept. If the `value` entered into the element exceeds this, the element fails constraint validation. If the value of the `max` attribute isn't a valid week string, then the element has no maximum value.

This value must be greater than or equal to the year and week specified by the `min` attribute.

### min

The earliest year and week to accept. If the `value` of the element is less than this, the element fails constraint validation. If a value is specified for `min` that isn't a valid week string, the input has no minimum value.

This value must be less than or equal to the value of the `max` attribute.

### readonly

A Boolean attribute which, if present, means this field cannot be edited by the user. Its `value` can, however, still be changed by JavaScript code directly setting the `HTMLInputElement` `value` property.

> **Note:**
> Because a read-only field cannot have a value, `required` does not have any effect on inputs with the `readonly` attribute also specified.

### step

The `step` attribute is a number that specifies the granularity that the value must adhere to, or the special value `any`, which is described below. Only values which are a whole number of steps from the step base are valid. The step base is `min` if specified, `value` otherwise, or −259,200,000 (the start of week `1970-W01`) if neither is provided.

For `week` inputs, the value of `step` is given in weeks and is treated as a number of milliseconds equal to 604,800,000 times the `step` value (the underlying numeric value is in milliseconds). The default value is 1, indicating 1 week.

A string value of `any` means that no stepping is implied, and any value is allowed (barring other constraints, such as `min` and `max`). In reality, it has the same effect as `1` for `week` inputs because the picker UI only allows selecting whole weeks.

> **Note:**
> When the data entered by the user doesn't adhere to the stepping configuration, the user agent may round to the nearest valid value, preferring numbers in the positive direction when there are two equally close options.

## Using week inputs

Week inputs sound convenient at first glance, since they provide an easy UI for choosing weeks, and they normalize the data format sent to the server, regardless of the user's browser or locale. However, there are issues with `` because browser support is not guaranteed across all browsers.

We'll look at basic and more complex uses of ``, then offer advice on mitigating the browser support issue later on (see Handling browser support).

### Basic uses of week

The most basic use of `` involves a basic `` and `` element combination, as seen below:

```html
<label for="week">What week would you like to start?</label>
<input id="week" type="week" name="week" />
```

### Controlling input size

`` doesn't support form sizing attributes such as `size`. You'll have to resort to CSS for sizing needs.

### Using the step attribute

You should be able to use the `step` attribute to vary the number of weeks jumped whenever they are incremented or decremented, however it doesn't seem to have any effect on supporting browsers.

## Validation

By default, `` does not apply any validation to entered values. The UI implementations generally don't let you specify anything that isn't a valid week/year, which is helpful, but it's still possible to submit with the field empty, and you might want to restrict the range of choosable weeks.

### Setting maximum and minimum weeks

You can use the `min` and `max` attributes to restrict the valid weeks that can be chosen by the user. In the following example we are setting a minimum value of `Week 01, 2017` and a maximum value of `Week 52, 2017`:

```html
<label for="week">What week would you like to start?</label>
<input id="week" type="week" name="week" min="2017-W01" max="2017-W52" />
<span class="validity"></span>
```

Here's the CSS used in the above example. Here we make use of the `:valid` and `:invalid` CSS properties to style the input based on whether the current value is valid. We had to put the icons on a `` next to the input, not on the input itself, because in Chrome the generated content is placed inside the form control, and can't be styled or shown effectively.

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

The result here is that only weeks between W01 and W52 in 2017 will be seen as valid and be selectable in supporting browsers.

### Making week values required

In addition you can use the `required` attribute to make filling in the week mandatory. As a result, supporting browsers will display an error if you try to submit an empty week field.

Let's look at an example; here we've set minimum and maximum weeks, and also made the field required:

```html
<form>
  <div>
    <label for="week">What week would you like to start?</label>
    <input
      id="week"
      type="week"
      name="week"
      min="2017-W01"
      max="2017-W52"
      required />
    <span class="validity"></span>
  </div>
  <div>
    <input type="submit" value="Submit form" />
  </div>
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

If you try to submit the form with no value, the browser displays an error. Try playing with the example now:

Here is a screenshot for those of you who aren't using a supporting browser:

> **Warning:**
> HTML form validation is _not_ a substitute for scripts that ensure that the entered data is in the proper format. It's far too easy for someone to make adjustments to the HTML that allow them to bypass the validation, or to remove it entirely. It's also possible for someone to bypass your HTML entirely and submit the data directly to your server. If your server-side code fails to validate the data it receives, disaster could strike when improperly-formatted data is submitted (or data which is too large, of the wrong type, and so forth).

## Handling browser support

As mentioned above, the major problem with using week inputs right now is browser support: Safari and Firefox don't support it on desktop, and old versions of IE don't support it.

Mobile platforms such as Android and iOS make perfect use of such input types, providing specialist UI controls that make it really easy to select values in a touchscreen environment. For example, the `week` picker on Chrome for Android looks like this:

Non-supporting browsers gracefully degrade to a text input, but this creates problems both in terms of consistency of user interface (the presented control will be different), and data handling.

The second problem is the more serious. As mentioned earlier, with a `week` input the actual value is always normalized to the format `yyyy-Www`. When the browser falls back to a generic text input, there's nothing to guide the user toward correctly formatting the input (and it's certainly not intuitive). There are multiple ways in which people could write week values; for example:

- `Week 1 2017`
- `Jan 2-8 2017`
- `2017-W01`
- etc.

The best way to deal with week/years in forms in a cross-browser way at the moment is to get the user to enter the week number and year in separate controls (`<select>` elements being popular; see below for an example), or use JavaScript libraries such as jQuery date picker.

## Examples

In this example we create two sets of UI elements for choosing weeks: a native picker created using ``, and a set of two `<select>` elements for choosing weeks/years in older browsers that don't support the `week` input type.

The HTML looks like so:

```html
<div class="nativeWeekPicker">
  <label for="week">What week would you like to start?</label>
  <input
    id="week"
    type="week"
    name="week"
    min="2017-W01"
    max="2018-W52"
    required />
  <span class="validity"></span>
</div>
<p class="fallbackLabel">What week would you like to start?</p>
<div class="fallbackWeekPicker">
  <div>
    <span>
      <label for="week">Week:</label>
      <select id="fallbackWeek" name="week"></select>
    </span>
    <span>
      <label for="year">Year:</label>
      <select id="year" name="year">
        <option value="2017" selected>2017</option>
        <option value="2018">2018</option>
      </select>
    </span>
  </div>
</div>
```

The week values are dynamically generated by the JavaScript code below.

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

The other part of the code that may be of interest is the feature detection code. To detect whether the browser supports ``, we create a new `` element, try setting its `type` to `week`, then immediately check what its `type` is set to. Non-supporting browsers will return `text`, because the `week` type falls back to type `text`. If `` is not supported, we hide the native picker and show the fallback picker UI (`<select>`s) instead.

```js
// Get UI elements
const nativePicker = document.querySelector(".nativeWeekPicker");
const fallbackPicker = document.querySelector(".fallbackWeekPicker");
const fallbackLabel = document.querySelector(".fallbackLabel");

const yearSelect = document.querySelector("#year");
const weekSelect = document.querySelector("#fallbackWeek");

// Hide fallback initially
fallbackPicker.style.display = "none";
fallbackLabel.style.display = "none";

// Test whether a new date input falls back to a text input or not
const test = document.createElement("input");

try {
  test.type = "week";
} catch (e) {
  console.log(e.description);
}

// If it does, run the code inside the if () {} block
if (test.type === "text") {
  // Hide the native picker and show the fallback
  nativePicker.style.display = "none";
  fallbackPicker.style.display = "block";
  fallbackLabel.style.display = "block";

  // populate the weeks dynamically
  populateWeeks();
}

function populateWeeks() {
  // Populate the week select with 52 weeks
  for (let i = 1; i <= 52; i++) {
    const option = document.createElement("option");
    option.textContent = i < 10 ? `0${i}` : i;
    weekSelect.appendChild(option);
  }
}
```

> **Note:**
> Remember that some years have 53 weeks in them (see Weeks per year)! You'll need to take this into consideration when developing production apps.

## Technical summary

       | Value
       |
        A string representing a week and year, or
        empty

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
- ``, ``, ``, and ``
