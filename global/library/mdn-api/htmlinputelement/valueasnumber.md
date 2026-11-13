---
title: "HTMLInputElement: valueAsNumber property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/valueasnumber/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: valueAsNumber property

The **`valueAsNumber`** property of the `HTMLInputElement` interface represents the current value of the `` element as a number or `NaN` if converting to a numeric value is not possible.

This property can also be set directly, for example to set a default numeric value based on some condition.

## Value

A number that represents the value of the element or `NaN` if numeric conversion is impossible.

## Examples

### Retrieving a number value

In this example, the log displays the current value of the `<number>` input when changed.

#### HTML

We include an `` of type `number` and an associated ``, with a `<pre>` container for our output.

```html
<label for="number">Pick a number between 1 and 10:</label>

<input name="number" id="number" min="1" max="10" type="number" />

<pre id="log"></pre>
```

#### JavaScript

The `<pre>` element's `innerText` is updated to the current value of the `` every time a `change` event is fired.

```js
const logElement = document.getElementById("log");
const inputElement = document.getElementById("number");

inputElement.addEventListener("change", () => {
  logElement.innerText = `Number: ${inputElement.valueAsNumber}`;
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

If you delete the number in the widget, the result is `NaN`.

### Retrieving a date value as a number

This example demonstrates the `valueAsNumber` property of an `` with type `<datetime-local>`.

#### HTML

We include an `` of type `datetime-local`:

```html
<label for="date">Pick a date and time:</label>

<input name="date" id="date" type="datetime-local" />

<pre id="log"></pre>
```

#### JavaScript

When no date or time is selected, the empty string resolves to `NaN`. Each time a selection is made, a `change` event is fired, updating the `<pre>` content showing the `HTMLInputElement.value` of the form control compared to that value as a number.

```js
const logElement = document.getElementById("log");
const inputElement = document.getElementById("date");

logElement.innerText = `Initial value: ${inputElement.valueAsNumber}`;

inputElement.addEventListener("change", () => {
  const d = new Date(inputElement.valueAsNumber);
  logElement.innerText = `${inputElement.value} resolves to ${inputElement.valueAsNumber}, \nwhich is ${d.toDateString()} at ${d.toTimeString()}`;
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

## See also

- ``
- `HTMLInputElement.value`
- `HTMLInputElement.valueAsDate`
