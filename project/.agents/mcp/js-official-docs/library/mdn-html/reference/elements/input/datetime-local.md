---
title: "`<input type=\"datetime-local\">` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/datetime-local/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="datetime-local">` HTML attribute value

`` elements of type **`datetime-local`** create input controls that let the user easily enter both a date and a time, including the year, month, and day as well as the time in hours and minutes.

The control's UI varies in general from browser to browser. The control is intended to represent _a local date and time_, not necessarily _the user's local date and time_. In other words, the input allows any valid combination of year, month, day, hour, and minute—even if such a combination is invalid in the user's local time zone (such as the one hour within a daylight saving time spring-forward transition gap).

```html
<label for="meeting-time">Choose a time for your appointment:</label>

<input
  type="datetime-local"
  id="meeting-time"
  name="meeting-time"
  value="2018-06-12T19:30"
  min="2018-06-07T00:00"
  max="2018-06-14T00:00" />
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

A string representing the value of the date entered into the input. The format of the date and time value used by this input type is described in Local date and time strings.

You can set a default value for the input by including a date and time inside the `value` attribute, like so:

```html
<label for="party">Enter a date and time for your party booking:</label>
<input
  id="party"
  type="datetime-local"
  name="party-date"
  value="2017-06-01T08:30" />
```

One thing to note is that the displayed date and time formats differ from the actual `value`; the displayed date and time are formatted according to the user's locale as reported by their operating system, whereas the date/time `value` is always formatted `YYYY-MM-DDTHH:mm`. When the above value is submitted to the server, for example, it will look like `party-date=2024-06-01T08:30`.

> **Note:**
> Also bear in mind that if such data is submitted via HTTP `GET`, the colon character will need to be escaped for inclusion in the URL parameters, e.g., `party-date=2024-06-01T08%3A30`. See `encodeURI()` for one way to do this.

You can also get and set the date value in JavaScript using the `HTMLInputElement` `value` property, for example:

```js
const dateControl = document.querySelector('input[type="datetime-local"]');
dateControl.value = "2017-06-01T08:30";
```

## Additional attributes

In addition to the attributes common to all `` elements, `datetime-local` inputs offer the following attributes.

### max

The latest date and time to accept. If the `value` entered into the element is later than this timestamp, the element fails constraint validation. If the value of the `max` attribute isn't a valid string that follows the format `YYYY-MM-DDTHH:mm`, then the element has no maximum value.

This value must specify a date string later than or equal to the one specified by the `min` attribute.

### min

The earliest date and time to accept; timestamps earlier than this will cause the element to fail constraint validation. If the value of the `min` attribute isn't a valid string that follows the format `YYYY-MM-DDTHH:mm`, then the element has no minimum value.

This value must specify a date string earlier than or equal to the one specified by the `max` attribute.

### step

The `step` attribute is a number that specifies the granularity that the value must adhere to, or the special value `any`, which is described below. Only values which are a whole number of steps from the step base are valid. The step base is `min` if specified, `value` otherwise, or `0` (the Unix epoch, `1970-01-01T00:00`) if neither is provided.

For `datetime-local` inputs, the value of `step` is given in seconds and is treated as a number of milliseconds equal to 1000 times the `step` value (the underlying numeric value is in milliseconds). The default value is 60, indicating 1 minute.

A string value of `any` means that no stepping is implied, and any value is allowed (barring other constraints, such as `min` and `max`). In reality, it has the same effect as `60` for `datetime-local` inputs because the picker UI in this case only allows selecting whole minutes.

> **Note:**
> When the data entered by the user doesn't adhere to the stepping configuration, the user agent may round to the nearest valid value, preferring numbers in the positive direction when there are two equally close options.

## Using datetime-local inputs

Date/time inputs are convenient for the developer; they provide an easy UI for choosing dates and times, and they normalize the data format sent to the server, regardless of the user's locale. However, it is important to consider your users. Don't require your users to enter data that is not needed for your app to function.

### Controlling input size

`` doesn't support form control sizing attributes such as `size`. You'll have to resort to CSS for customizing the sizes of these elements.

### Setting timezones

One thing the `datetime-local` input type doesn't provide is a way to set the time zone and/or locale of the date/time control. This was available in the `datetime` input type, but this type is now obsolete, having been removed from the spec. The main reasons why this was removed are a lack of implementation in browsers and concerns over the user interface/experience. It is easier to just have a control (or controls) for setting the date/time and then deal with the locale in a separate control.

For example, if you are creating a system where the user is likely to already be logged in, with their locale already set, you could provide the timezone in a `hidden` input type. For example:

```html
<input type="hidden" id="timezone" name="timezone" value="-08:00" />
```

On the other hand, if you were required to allow the user to enter a time zone along with a date/time input, you could have a `<select>` element to enable the user to set the right time zone by choosing a particular location from among a set of locations:

```html
<select name="timezone" id="timezone">
  <option value="Pacific/Kwajalein">Eniwetok, Kwajalein</option>
  <option value="Pacific/Midway">Midway Island, Samoa</option>
  <option value="Pacific/Honolulu">Hawaii</option>
  <option value="Pacific/Marquesas">Taiohae</option>
  <!-- and so on -->
</select>
```

In either case, the date/time and time zone values would be submitted to the server as separate data points, and then you'd need to store them appropriately in the database on the server-side.

## Validation

By default, `` does not apply any validation to entered values. The UI implementations generally don't let you enter anything that isn't a date/time — which is helpful — but a user might still fill in no value and submit, or enter an invalid date and/or time (e.g., the 32nd of April).

You can use `min` and `max` to restrict the available dates (see Setting maximum and minimum dates), and you can use the `required` attribute to make filling in the date/time mandatory. As a result, browsers will display an error if you try to submit a date that is outside the set bounds or an empty date field.

Let's look at an example; here we've set minimum and maximum date/time values, and also made the field required:

```html
<form>
  <div>
    <label for="party">
      Choose your preferred party date and time (required, June 1st 8.30am to
      June 30th 4.30pm):
    </label>
    <input
      id="party"
      type="datetime-local"
      name="party-date"
      min="2017-06-01T08:30"
      max="2017-06-30T16:30"
      required />
    <span class="validity"></span>
  </div>
  <div>
    <input type="submit" value="Book party!" />
  </div>
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

If you try to submit the form with an incomplete date (or with a date outside the set bounds), the browser displays an error. Try playing with the example now:

Here's the CSS used in the above example. Here we make use of the `:valid` and `:invalid` CSS properties to style the input based on whether the current value is valid. We put the icons on a `` next to the input.

```css
div {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

label {
  display: inline-block;
  width: 300px;
}

input:invalid + span::after {
  content: "✖";
  padding-left: 5px;
}

input:valid + span::after {
  content: "✓";
  padding-left: 5px;
}
```

> **Warning:**
> HTML form validation is _not_ a substitute for scripts that ensure that the entered data is in the proper format. It's far too easy for someone to make adjustments to the HTML that allow them to bypass the validation, or to remove it entirely. It's also possible for someone to bypass your HTML entirely and submit the data directly to your server. If your server-side code fails to validate the data it receives, problems can arise when improperly-formatted data is submitted (or data that is too large, is of the wrong type, and so forth).

> **Note:**
> With a `datetime-local` input, the date value is always normalized to the format `YYYY-MM-DDTHH:mm`.

## Examples

### Basic uses of datetime-local

The most basic use of `` involves a basic `` and `` element combination, as seen below:

```html
<label for="party">Enter a date and time for your party booking:</label>
<input id="party" type="datetime-local" name="party-date" />
```

### Setting maximum and minimum dates and times

You can use the `min` and `max` attributes to restrict the dates/times that can be chosen by the user. In the following example, we are setting a minimum datetime of `2025-06-01T08:30` and a maximum datetime of `2025-06-30T16:30`:

```html
<label for="party">Enter a date and time for your party booking:</label>
<input
  id="party"
  type="datetime-local"
  name="party-date"
  min="2025-06-01T08:30"
  max="2025-06-30T16:30" />
```

Only days in June 2025 can be selected. Depending on what browser you are using, times outside the specified values might not be selectable. In other browsers, invalid dates and times are selectable but will match `:invalid` and `:out-of-range` and will fail validation.

In some browsers (Safari), the date picker will appear to allow any date, but the value will be clamped to the valid range when a date is selected.

The valid range included all times between the `min` and `max` values; the time of day is only constrained on the first and last dates in the range.

> **Note:**
> You should be able to use the `step` attribute to vary the number of days jumped each time the date is incremented (e.g., maybe you only want to make Saturdays selectable). However, this does not seem to work effectively in any implementation at the time of writing.

## Technical summary

       | Value
       |
        A string representing a date and time (in the
        local time zone), or empty.

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
- `` and ``
- Date and time formats used in HTML
- Date and Time picker tutorial
