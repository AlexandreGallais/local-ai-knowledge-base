---
title: "`<input type=\"month\">` HTML attribute value (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/month/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="month">` HTML attribute value

`` elements of type **`month`** create input fields that let the user enter a month and year allowing a month and year to be easily entered.
The value is a string whose value is in the format `YYYY-MM`, where `YYYY` is the four-digit year and `MM` is the month number.

```html
<label for="start">Start month:</label>

<input type="month" id="start" name="start" min="2018-03" value="2018-05" />
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

## Value

A string representing the value of the month and year entered into the input, in the form YYYY-MM (four or more digit year, then a hyphen (`-`), followed by the two-digit month).
The format of the month string used by this input type is described in Month strings.

### Setting a default value

You can set a default value for the input control by including a month and year inside the `value` attribute, like so:

```html
<label for="bday-month">What month were you born in?</label>
<input id="bday-month" type="month" name="bday-month" value="2001-06" />
```

One thing to note is that the displayed date format differs from the actual `value`; most user agents display the month and year in a locale-appropriate form, based on the set locale of the user's operating system, whereas the date `value` is always formatted `yyyy-MM`.

When the above value is submitted to the server, for example, it will look like `bday-month=1978-06`.

### Setting the value using JavaScript

You can also get and set the date value in JavaScript using the `HTMLInputElement.value` property, for example:

```html
<label for="bday-month">What month were you born in?</label>
<input id="bday-month" type="month" name="bday-month" />
```

```js
const monthControl = document.querySelector('input[type="month"]');
monthControl.value = "2001-06";
```

## Additional attributes

In addition to the attributes common to `` elements, month inputs offer the following attributes.

### list

The values of the list attribute is the `id` of a `<datalist>` element located in the same document.
The `<datalist>` provides a list of predefined values to suggest to the user for this input.
Any values in the list that are not compatible with the `type` are not included in the suggested options.
The values provided are suggestions, not requirements: users can select from this predefined list or provide a different value.

### max

The latest year and month, in the string format discussed in the Value section above, to accept.
If the `value` entered into the element exceeds this, the element fails constraint validation.
If the value of the `max` attribute isn't a valid string in `yyyy-MM` format, then the element has no maximum value.

This value must specify a year-month pairing later than or equal to the one specified by the `min` attribute.

### min

The earliest year and month to accept, in the same `yyyy-MM` format described above.
If the `value` of the element is less than this, the element fails constraint validation.
If a value is specified for `min` that isn't a valid year and month string, the input has no minimum value.

This value must be a year-month pairing which is earlier than or equal to the one specified by the `max` attribute.

### readonly

A Boolean attribute which, if present, means this field cannot be edited by the user.
Its `value` can, however, still be changed from JavaScript code that directly sets the value of the `HTMLInputElement.value` property.

> **Note:**
> Because a read-only field cannot have a value, `required` does not have any effect on inputs with the `readonly` attribute also specified.

### step

The `step` attribute is a number that specifies the granularity that the value must adhere to, or the special value `any`, which is described below. Only values which are a whole number of steps from the step base are valid. The step base is `min` if specified, `value` otherwise, or `0` (the Unix epoch, `1970-01`) if neither is provided.

For `month` inputs, the value of `step` is given in months. The default value of `step` is 1, indicating 1 month.

A string value of `any` means that no stepping is implied, and any value is allowed (barring other constraints, such as `min` and `max`). In reality, it has the same effect as `1` for `month` inputs because the picker UI only allows selecting whole months.

> **Note:**
> When the data entered by the user doesn't adhere to the stepping configuration, the user agent may round to the nearest valid value, preferring numbers in the positive direction when there are two equally close options.

## Using month inputs

Date-related inputs (including `month`) sound convenient at first glance; they promise an easy UI for choosing dates, and they normalize the data format sent to the server, regardless of the user's locale.
However, there are issues with `` because at this time, many major browsers don't yet support it.

We'll look at basic and more complex uses of ``, then offer advice on mitigating the browser support issue in the section Handling browser support.

### Basic uses of month

The most basic use of `` involves a basic `` and `` element combination, as seen below:

```html
<label for="bday-month">What month were you born in?</label>
<input id="bday-month" type="month" name="bday-month" />
```

### Setting maximum and minimum dates

You can use the `min` and `max` attributes to restrict the range of dates that the user can choose.
In the following example we specify a minimum month of `1900-01` and a maximum month of `2013-12`:

```html
<label for="bday-month">What month were you born in?</label>
<input
  id="bday-month"
  type="month"
  name="bday-month"
  min="1900-01"
  max="2013-12" />
```

The result here is that:

- Only months between in January 1900 and December 2013 can be selected; months outside that range can't be scrolled to in the control.
- Depending on what browser you are using, you might find that months outside the specified range might not be selectable in the month picker (e.g., Edge), or invalid (see Validation) but still available (e.g., Chrome).

### Controlling input size

`` doesn't support form sizing attributes such as `size`.
You'll have to resort to CSS for sizing needs.

## Validation

By default, `` does not apply any validation to entered values.
The UI implementations generally don't let you enter anything that isn't a date — which is helpful — but you can still submit the form with the `month` input empty, or enter an invalid date (e.g., the 32nd of April).

To help avoid this, you can use `min` and `max` to restrict the available dates (see Setting maximum and minimum dates), and in addition use the `required` attribute to make filling in the date mandatory.
As a result, supporting browsers will display an error if you try to submit a date that is outside the set bounds, or an empty date field.

Let's look at an example; here we've set minimum and maximum dates, and also made the field required:

```html
<form>
  <div>
    <label for="month">
      What month would you like to visit (June to Sept.)?
    </label>
    <input
      id="month"
      type="month"
      name="month"
      min="2022-06"
      max="2022-09"
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

If you try to submit the form without both the month and year specified (or with a date outside the set bounds), the browser displays an error.
Try playing with the example now:

Here's the CSS used in the above example.
Here we make use of the `:valid` and `:invalid` CSS properties to style the input based on whether the current value is valid.
We had to put the icons on a `` next to the input, not on the input itself, because in Chrome the generated content is placed inside the form control, and can't be styled or shown effectively.

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

> **Warning:**
> HTML form validation is _not_ a substitute for scripts that ensure that the entered data is in the proper format.
> It's far too easy for someone to make adjustments to the HTML that allow them to bypass the validation, or to remove it entirely.
> It's also possible for someone to bypass your HTML entirely and submit the data directly to your server.
> If your server-side code fails to validate the data it receives, disaster could strike when improperly-formatted data is submitted (or data which is too large, of the wrong type, and so forth).

## Handling browser support

The control's UI varies in general from browser to browser; at the moment support is patchy, with only Chromium browsers on desktop and mobile browsers having usable implementations. The control is usually presented as either a calendar-like grid or two wheel pickers.

In browsers that don't support `month` inputs, the control degrades gracefully to ``, although there may be automatic validation of the entered text to ensure it's formatted as expected. But this creates problems both in terms of consistency of user interface (the presented control will be different), and data handling.

The second problem is the more serious of the two.
As mentioned earlier, with a `month` input the actual value is always normalized to the format `yyyy-mm`.
On the other hand, in its default configuration, a `text` input has no idea what format the date should be in, and this is an issue because of the number of different ways in which people write dates.
For example:

- `mmyyyy` (072022)
- `mm/yyyy` (07/2022)
- `mm-yyyy` (07-2022)
- `yyyy-mm` (2022-07)
- `Month yyyy` (July 2022)
- and so forth…

One way around this is to put a `pattern` attribute on your `month` input.
Even though the `month` input doesn't use it, if the browser falls back to treating it like a `text` input, the pattern will be used.
For example, try viewing the following demo in a browser that doesn't support `month` inputs:

```html
<form>
  <div>
    <label for="month">
      What month would you like to visit (June to Sept.)?
    </label>
    <input
      id="month"
      type="month"
      name="month"
      min="2022-06"
      max="2022-09"
      required
      pattern="[0-9]{4}-[0-9]{2}" />
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

If you try submitting it, you'll see that the browser now displays an error message (and highlights the input as invalid) if your entry doesn't match the pattern `nnnn-nn`, where `n` is a number from 0 to 9.
Of course, this doesn't stop people from entering invalid dates (such as `0000-42`), or incorrectly formatted dates that follow the pattern.

There's also the problem that the user won't necessarily know which of the many date formats is expected.
We have work left to do.

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

The best way to deal with dates in forms in a cross-browser way (until all major browsers have supported them for a while) is to get the user to enter the month and year in separate controls (`<select>` elements being popular; see below for an implementation), or use JavaScript libraries such as the jQuery date picker plugin.
