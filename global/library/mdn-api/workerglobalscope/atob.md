---
title: "WorkerGlobalScope: atob() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/atob/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: atob() method

The **`atob()`** method of the `WorkerGlobalScope` interface decodes a
string of data which has been encoded using Base64 encoding. You can use
the `WorkerGlobalScope.btoa()` method to encode and transmit
data which may otherwise cause communication problems, then transmit it and use the
`atob()` method to decode the data again. For example, you can encode,
transmit, and decode control characters such as ASCII values 0 through 31.

## Syntax

```js
atob(encodedData)
```

### Parameters

- `encodedData`
    A binary string (i.e., a string in which each character in the string is treated as a byte of binary data) containing base64-encoded data.

### Return value

An ASCII string containing decoded data from `encodedData`.

### Exceptions

- `InvalidCharacterError` `DOMException`
    Thrown if `encodedData` is not valid base64.

## Examples

```js
const encodedData = self.btoa("Hello, world"); // encode a string
const decodedData = self.atob(encodedData); // decode the string
```

## See also

- A polyfill of `atob` is available in `core-js`
- `data` URLs
- `Window.atob()`: the same method, but in window scopes.
- `WorkerGlobalScope.btoa()`
- `Uint8Array.fromBase64()`
