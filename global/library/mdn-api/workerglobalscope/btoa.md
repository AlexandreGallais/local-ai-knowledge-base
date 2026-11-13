---
title: "WorkerGlobalScope: btoa() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/btoa/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: btoa() method

The **`btoa()`** method of the `WorkerGlobalScope` interface creates a Base64-encoded ASCII string from a _binary string_ (i.e., a string in which each character in the string is treated as a byte of binary data).

You can use this method to encode data which may otherwise cause communication problems, transmit it, then use the `WorkerGlobalScope.atob()` method to decode the data again.
For example, you can encode control characters such as ASCII values 0 through 31.

## Syntax

```js
btoa(stringToEncode)
```

### Parameters

- `stringToEncode`
    The _binary string_ to encode.

### Return value

An ASCII string containing the Base64 representation of `stringToEncode`.

### Exceptions

- `InvalidCharacterError` `DOMException`
    The string contained a character that did not fit in a single byte. See "Unicode strings" below for more detail.

## Examples

```js
const encodedData = self.btoa("Hello, world"); // encode a string
const decodedData = self.atob(encodedData); // decode the string
```

## Unicode strings

Base64, by design, expects binary data as its input.
In terms of JavaScript strings, this means strings in which the code point of each character occupies only one byte.
So if you pass a string into `btoa()` containing characters that occupy more than one byte, you will get an error, because this is not considered binary data.

For more information and workarounds see `Window.btoa()`.

## See also

- A polyfill of `btoa` is available in `core-js`
- `data` URLs
- `WorkerGlobalScope.atob()`
- `Window.btoa()`: the same method, but in window scopes.
- `Uint8Array.prototype.toBase64()`
- Base64
