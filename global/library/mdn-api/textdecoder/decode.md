---
title: "TextDecoder: decode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textdecoder/decode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextDecoder: decode() method

The **`TextDecoder.decode()`** method returns a string containing text decoded from the buffer passed as a parameter.

The decoding method is defined in the current `TextDecoder` object.
This includes the expected encoding of the data, and how decoding errors are handled.

## Syntax

```js
decode()
decode(buffer)
decode(buffer, options)
```

### Parameters

- `buffer` (optional)
    An `ArrayBuffer`, a `TypedArray`, or a `DataView` object containing the encoded text to decode.
- `options` (optional)
    An object with the property:
    - `stream`
        A boolean flag indicating whether additional data will follow in subsequent calls to `decode()`.
        Set to `true` if processing the data in chunks, and `false` for the final chunk or if the data is not chunked.
        It defaults to `false`.

### Exceptions

- `TypeError`
    Thrown if there is a decoding error when the property `TextDecoder.fatal` is `true`.

### Return value

A string.

## Examples

This example encodes and decodes the euro symbol, €.

### HTML

```html
<p>Encoded value: <span id="encoded-value"></span></p>
<p>Decoded value: <span id="decoded-value"></span></p>
```

### JavaScript

```js
const encoder = new TextEncoder();
const array = encoder.encode("€"); // Uint8Array(3) [226, 130, 172]
document.getElementById("encoded-value").textContent = array;

const decoder = new TextDecoder();
const str = decoder.decode(array); // String "€"
document.getElementById("decoded-value").textContent = str;
```

## See also

- The `TextDecoder` interface it belongs to.
