---
title: "TextEncoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextEncoder

The **`TextEncoder`** interface enables you to encode a JavaScript string using UTF-8.

## Constructor

- `TextEncoder()`
    Creates and returns a new `TextEncoder`.

## Instance properties

_The `TextEncoder` interface doesn't inherit any properties._

- `TextEncoder.encoding` (read-only)
    Always returns `utf-8`.

## Instance methods

_The `TextEncoder` interface doesn't inherit any methods_.

- `TextEncoder.encode()`
    Takes a string as input, and returns a `Uint8Array` containing the string encoded using UTF-8.
- `TextEncoder.encodeInto()`
    Takes a string to encode and a destination `Uint8Array` to put the resulting UTF-8 encoded text into, and returns an object indicating the progress of the encoding.
    This is potentially more performant than the older `encode()` method.

## Examples

### Encoding to UTF-8

This example shows how to encode the "€" character to UTF-8.

```html
<button id="encode">Encode</button>
<button id="reset">Reset</button>
<div id="output"></div>
```

```css
div {
  margin: 1rem 0;
}
```

```js
const utf8encoder = new TextEncoder();
const text = "€";

const output = document.querySelector("#output");
const encodeButton = document.querySelector("#encode");
encodeButton.addEventListener("click", () => {
  output.textContent = utf8encoder.encode(text);
});

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
  window.location.reload();
});
```

## See also

- The `TextDecoder` interface describing the inverse operation.
