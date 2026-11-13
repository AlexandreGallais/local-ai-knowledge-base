---
title: "HTMLInputElement: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: value property

The **`value`** property of the `HTMLInputElement` interface represents the current value of the `` element as a string.

This property can also be set directly, for example to set a default value based on some condition.

## Value

A string specifying the default value of the `` element.

## Examples

### Retrieving a text input's value

In this example, the log displays the current value as the user enters data into the input.

#### HTML

We include an `` and an associated ``, with a `<pre>` container for our output.

```html
<label for="given-name">Your name:</label>

<input name="given-name" id="given-name" />

<pre id="log"></pre>
```

#### JavaScript

The `<pre>` element's `innerText` is updated to the current value of the `` every time a `keyup` event is fired.

```js
const logElement = document.getElementById("log");
const inputElement = document.getElementById("given-name");

inputElement.addEventListener("keyup", () => {
  logElement.innerText = `Name: ${inputElement.value}`;
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

### Retrieving a color value

This example demonstrates that the `value` property with an `` of type `<color>`.

#### HTML

We include an `` of type `color`:

```html
<label for="color">Pick a color:</label>

<input name="color" id="color" type="color" />

<pre id="log"></pre>
```

#### JavaScript

The `<pre>` element's `innerText` is updated with the default color value (`#000000`) and then updated every time a `change` event is fired.

```js
const logElement = document.getElementById("log");
const inputElement = document.getElementById("color");

logElement.innerText = `Color: ${inputElement.value}`;

inputElement.addEventListener("change", () => {
  logElement.innerText = `Color: ${inputElement.value}`;
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
- `HTMLInputElement.valueAsDate`
- `HTMLInputElement.valueAsNumber`
