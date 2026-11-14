---
title: "DOMException: DOMException() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domexception/domexception/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMException: DOMException() constructor

The **`DOMException()`** constructor returns a
`DOMException` object with a specified message and name.

## Syntax

```js
new DOMException()
new DOMException(message)
new DOMException(message, name)
```

### Parameters

- `message` (optional)
    A description of the exception. If not present, the empty string `''` is used.
- `name` (optional)
    A string. If the specified name is a standard error name, then getting the `code` property of the `DOMException` object will return the code number corresponding to the specified name. If not present, the string `'Error'` is used.

### Return value

A newly created `DOMException` object.

## Examples

In this example, pressing the button causes a custom `DOMException` to be thrown, which is then caught and the custom error message shown in an alert.

### HTML

```html
<button>Trigger DOM Exception</button>

<p id="output"></p>
```

### JavaScript

```js
const button = document.querySelector("button");

button.onclick = () => {
  try {
    throw new DOMException("Custom DOM Exception Triggered.");
  } catch (error) {
    document.querySelector("#output").textContent = `Error: ${error.message}`;
  }
};
```

## See also

- A polyfill of `DOMException` constructor is available in `core-js`
