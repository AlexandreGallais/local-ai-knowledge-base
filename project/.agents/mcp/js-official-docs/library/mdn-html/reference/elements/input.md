---
title: "`<input>` HTML input element (part 1 of 7)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input>` HTML input element

The **``** HTML element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent. The `` element is one of the most powerful and complex in all of HTML due to the sheer number of combinations of input types and attributes.

```html
<label for="name">Name (4 to 8 characters):</label>

<input
  type="text"
  id="name"
  name="name"
  required
  minlength="4"
  maxlength="8"
  size="10" />
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

## \ types

How an `` works varies considerably depending on the value of its `type` attribute, hence the different types are covered in their own separate reference pages. If this attribute is not specified, the default type adopted is `text`.

The available types are as follows:

       | Type
       | Description
       | Basic <example-value>

       | ``
       |
        A push button with no default behavior displaying the value of the `value` attribute, empty by default.

       |
        <pre class="brush: html hidden">
&#x3C;input type="button" name="button" value="Button" /></pre>

       | `<checkbox>`
       | A checkbox allowing single values to be selected/deselected.
       |
        <pre class="brush: html hidden">
&#x3C;input type="checkbox" name="checkbox"/></pre>

       | `<color>`
       |
        A control for specifying a color; opening a color picker when active in supporting browsers.

       |
        <pre class="brush: html hidden">
&#x3C;input type="color" name="color"/></pre>

       | `<date>`
       |
        A control for entering a date (year, month, and day, with no time).
        Opens a date picker or numeric wheels for year, month, day when active
        in supporting browsers.

       |
        <pre class="brush: html hidden">
&#x3C;input type="date" name="date"/></pre>

       |
        `<datetime-local>`

       |
        A control for entering a date and time, with no time zone. Opens a date
        picker or numeric wheels for date- and time-components when active in supporting browsers.

       |
        <pre class="brush: html hidden">
&#x3C;input type="datetime-local" name="datetime-local"/></pre>

       | `<email>`
       |
        A field for editing an email address. Looks like a
        `text` input, but has validation parameters and relevant
        keyboard in supporting browsers and devices with dynamic keyboards.

       |
        <pre class="brush: html hidden">
&#x3C;input type="email" name="email"/></pre>

       | `<file>`
       |
        A control that lets the user select a file.
        Use the `accept` attribute to define the types of files that the control can select.

       |
        <pre class="brush: html hidden">
&#x3C;input type="file" accept="image/*, text/*" name="file"/></pre>

       | `<hidden>`
       |
        A control that is not displayed but whose value is submitted to the
        server. There is an example in the next column, but it's hidden!

       |
        <pre class="brush: html hidden">
&#x3C;input id="userId" name="userId" type="hidden" value="abc123" /></pre
        >

       | `<image>`
       |
        A graphical `submit` button. Displays an image defined by the `src` attribute.
        The `alt` attribute displays if the image `src` is missing.

       |
        <pre class="brush: html hidden">
&#x3C;input type="image" name="image" src="" alt="image input"/></pre>

       | `<month>`
       | A control for entering a month and year, with no time zone.
       |
        <pre class="brush: html hidden">
&#x3C;input type="month" name="month"/></pre>

       | `<number>`
       |
        A control for entering a number. Displays a spinner and adds default
        validation. Displays a numeric keypad in some devices
        with dynamic keypads.

       |
        <pre class="brush: html hidden">
&#x3C;input type="number" name="number"/></pre>

       | `<password>`
       |
        A single-line text field whose value is obscured.
        Will alert user if site is not secure.

       |
        <pre class="brush: html hidden">
&#x3C;input type="<example-value>" name="<example-value>"/></pre>

       | `<radio>`
       |
        A radio button, allowing a single value to be selected out of multiple choices with the same `name` value.

       |
        <pre class="brush: html hidden">
&#x3C;input type="radio" name="radio"/></pre
        >

       | `<range>`
       |
        A control for entering a number whose exact value is not important.
        Displays as a range widget defaulting to the middle value.
        Used in conjunction `min` and `max` to define the range of acceptable values.

       |
        <pre class="brush: html hidden">
&#x3C;input type="range" name="range" min="0" max="25"/></pre>

       | `<reset>`
       |
        A button that resets the contents of the form to default values. Not recommended.

       |
        <pre class="brush: html hidden">
&#x3C;input type="reset" name="reset"/></pre
        >

       | `<search>`
       |
        A single-line text field for entering search strings. Line-breaks are
        automatically removed from the input value. May include a delete icon in
        supporting browsers that can be used to clear the field. Displays a
        search icon instead of enter key on some devices with dynamic keypads.

       |
        <pre class="brush: html hidden">
&#x3C;input type="search" name="search"/></pre>

       | `<submit>`
       | A button that submits the form.
       |
        <pre class="brush: html hidden">
&#x3C;input type="submit" name="submit"/></pre>

       | `<tel>`
       |
        A control for entering a telephone number. Displays a telephone keypad
        in some devices with dynamic keypads.

       |
        <pre class="brush: html hidden">
&#x3C;input type="tel" name="tel"/></pre>

       | `<text>`
       |
        The default value. A single-line text field. Line-breaks are
        automatically removed from the input value.

       |
        <pre class="brush: html hidden">
&#x3C;input type="text" name="text"/></pre
        >

       | `<time>`
       | A control for entering a time value with no time zone.
       |
        <pre class="brush: html hidden">
&#x3C;input type="time" name="time"/></pre>

       | `<url>`
       |
        A field for entering a URL. Looks like a `text` input, but
        has validation parameters and relevant keyboard in supporting browsers
        and devices with dynamic keyboards.

       |
        <pre class="brush: html hidden">
&#x3C;input type="url" name="url"/></pre
        >

       | `<week>`
       |
        A control for entering a date consisting of a week-year number and a week number with no time zone.

       |
        <pre class="brush: html hidden">
&#x3C;input type="week" name="week"/></pre>

       | Obsolete values

       | `datetime` (deprecated)
       |
        A control for entering a date and time (hour, minute, second, and fraction of a second) based on UTC time zone.

       |
        <pre class="brush: html hidden">
&#x3C;input type="datetime" name="datetime"/></pre>
