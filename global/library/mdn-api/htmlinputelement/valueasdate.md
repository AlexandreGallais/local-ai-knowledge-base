---
title: "HTMLInputElement: valueAsDate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/valueasdate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: valueAsDate property

The **`valueAsDate`** property of the `HTMLInputElement` interface represents the current value of the `` element as a `Date`, or `null` if conversion is not possible.

This property can also be set directly, for example to set a default date based on some condition. If the provided value is neither `null` nor a `Date` object, a `TypeError` is thrown. If the provided value is `null` or an invalid date, the input value is set to the empty string.

This property always returns `null` when accessed on an input that isn't date- or time-based. When setting this property on such an input, an `InvalidStateError` `DOMException` is thrown.

## Value

A `Date` object or `null` if a conversion is impossible. The date returned should always be interpreted as a UTC time—for example, using methods like `getUTCDate()` instead of `getDate()`. If you are not careful, the result may be off by 1—for example, if the user lives in a negative UTC offset (the US, for example), then interpreting the date as a local date will result in the previous day from what the user selected.

The `month`, `date`, and `week` input types return a UTC date that represents the first instant of the inputted time span—that is, they are always midnight in UTC. For `month`, the date is the first day of the month. For `week`, the date is the Monday of the week. The `time` input type always has the date set to `1970-01-01`.

The `datetime-local` input type does not support the `valueAsDate` property, because it represents a date and time in the local time zone (a wall clock time), but `Date` objects represent an absolute point in time. However, some browsers may provide a non-standard implementation. WHATWG is working on integrating the `Temporal` API with the date/time inputs to account for this use case.

## Examples

### Retrieving a date value

This example demonstrates accessing the `valueAsDate` property on an `` of type `<week>`.

#### HTML

We include an `` of type `week`:

```html
<label for="date">Pick a date and time:</label>

<input name="date" id="date" type="week" />

<pre id="log"></pre>
```

#### JavaScript

When no date or time is selected, the empty input resolves to `null`. Each time a selection is made, a `change` event is fired, updating the `<pre>` content showing the `HTMLInputElement.value` of the form control compared to that value as a date.

```js
const logElement = document.getElementById("log");
const inputElement = document.getElementById("date");

logElement.innerText = `Initial value: ${inputElement.valueAsDate}`;

inputElement.addEventListener("change", () => {
  logElement.innerText = `${inputElement.value} resolves to ${inputElement.valueAsDate}`;
});
```

```css
#log {
  height: 20px;
  padding: 0.5rem;
  background-color: #ededed;
}
```

#### Results

### Using Date methods

This example demonstrates applying `Date` methods directly to the `valueAsDate` property of an `` of type `<date>`.

#### HTML

We include an `` of type `date`:

```html
<label for="date2">Pick a date:</label>

<input name="date2" id="date2" type="date" />

<pre id="log"></pre>
```

#### JavaScript

When no date is selected, the empty string resolves to `null`. Each time a selection is made, a `change` event is fired. We then populate the log with the date selected, formatted using the `Date` object's `toLocaleDateString()` method.

```js
const logElement = document.getElementById("log");
const inputElement = document.getElementById("date2");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

logElement.innerText = `Initial value: ${inputElement.valueAsDate}`;

inputElement.addEventListener("change", () => {
  if (inputElement.valueAsDate !== null) {
    logElement.innerText = `You selected ${inputElement.valueAsDate.toLocaleDateString("en-US", options)}`;
  } else {
    logElement.innerText = `${inputElement.value} resolves to ${inputElement.valueAsDate}`;
  }
});
```

```css
#log {
  height: 20px;
  padding: 0.5rem;
  background-color: #ededed;
}
```

#### Results

The date may be a day off due to your local timezone.

## See also

- ``
- `HTMLInputElement.value`
- `HTMLInputElement.valueAsNumber`
