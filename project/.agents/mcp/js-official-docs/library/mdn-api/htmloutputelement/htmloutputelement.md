---
title: "HTMLOutputElement: HTMLOutputElement() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloutputelement/htmloutputelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOutputElement: HTMLOutputElement() constructor

The **`HTMLOutputElement()`** constructor creates a new `HTMLOutputElement` object.

> **Note:**
> Currently only Safari implements this constructor, so using `Document.createElement()` is recommended for broader compatibility — see the example below.

## Syntax

```js
new HTMLOutputElement()
```

### Parameters

None.

### Return value

A new `HTMLOutputElement` object.

### Exceptions

- `TypeError`
    Thrown with the message `"Illegal constructor"` in browsers that do not support this constructor.

## Examples

### Creating an output element programmatically

> **Note:**
> In practice, you would usually create `<output>` elements using `Document.createElement()` instead of this constructor, since `createElement()` is supported across all browsers.

This example creates an `<output>` element using the `HTMLOutputElement()` constructor and inserts it into a form that adds two numbers together.

```html
<form id="my-form">
  <label>
    Number one
    <input type="number" id="a" value="5" />
  </label>
  +
  <label>
    Number two
    <input type="number" id="b" value="3" />
  </label>
  =
  <span id="output-container"></span>
</form>
<p id="warning" hidden>
  ⚠️ Your browser does not support the
  <code>HTMLOutputElement()</code> constructor.
</p>
```

```css
body {
  font-family: system-ui;
}

input {
  width: 3rem;
  font-size: inherit;
}

p {
  padding: 0.25rem;
  background-color: #fff2cc;
}
```

```js
try {
  new HTMLOutputElement();
} catch {
  document.getElementById("warning").hidden = false;
}

const output = new HTMLOutputElement();
output.id = "result";
output.setAttribute("for", "a b");
document.getElementById("output-container").appendChild(output);

function updateResult() {
  const a = document.getElementById("a");
  const b = document.getElementById("b");
  output.value = a.valueAsNumber + b.valueAsNumber;
}

document.getElementById("my-form").addEventListener("input", updateResult);
updateResult();
```

## See also

- `HTMLOutputElement`
- `<output>`
- `Document.createElement()`
