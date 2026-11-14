---
title: "decodeURI()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/decodeuri/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# decodeURI()

The **`decodeURI()`** function decodes a Uniform Resource Identifier (URI) previously created by `encodeURI()` or a similar routine.

```js
const uri = "https://mozilla.org/?x=шеллы";
const encoded = encodeURI(uri);
console.log(encoded);
// Expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

try {
  console.log(decodeURI(encoded));
  // Expected output: "https://mozilla.org/?x=шеллы"
} catch (e) {
  // Catches a malformed URI
  console.error(e);
}
```

## Syntax

```js
decodeURI(encodedURI)
```

### Parameters

- `encodedURI`
    A complete, encoded Uniform Resource Identifier.

### Return value

A new string representing the unencoded version of the given encoded Uniform Resource Identifier (URI).

### Exceptions

- `URIError`
    Thrown if `encodedURI` contains a `%` not followed by two hexadecimal digits, or if the escape sequence does not encode a valid UTF-8 character.

## Description

`decodeURI()` is a function property of the global object.

The `decodeURI()` function decodes the URI by treating each escape sequence in the form `%XX` as one UTF-8 code unit (one byte). In UTF-8, the number of leading 1 bits in the first byte, which may be 0 (for 1-byte ASCII characters), 2, 3, or 4, indicates the number of bytes in the character. So by reading the first escape sequence, `decodeURI()` can determine how many more escape sequences to consume. If `decodeURI()` fails to find the expected number of sequences, or if the escape sequences don't encode a valid UTF-8 character, a `URIError` is thrown.

`decodeURI()` decodes all escape sequences, but if the escape sequence encodes one of the following characters, the escape sequence is preserved in the output string (because they are part of the URI syntax):

```plain
; / ? : @ & = + $ , #
```

## Examples

### Decoding a Cyrillic URL

```js
decodeURI(
  "https://developer.mozilla.org/ru/docs/JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B",
);
// "https://developer.mozilla.org/ru/docs/JavaScript_шеллы"
```

### decodeURI() vs. decodeURIComponent()

`decodeURI()` assumes the input is a full URI, so it does not decode characters that are part of the URI syntax.

```js
decodeURI(
  "https://developer.mozilla.org/docs/JavaScript%3A%20a_scripting_language",
);
// "https://developer.mozilla.org/docs/JavaScript%3A a_scripting_language"

decodeURIComponent(
  "https://developer.mozilla.org/docs/JavaScript%3A%20a_scripting_language",
);
// "https://developer.mozilla.org/docs/JavaScript: a_scripting_language"
```

### Catching errors

```js
try {
  const a = decodeURI("%E0%A4%A");
} catch (e) {
  console.error(e);
}

// URIError: malformed URI sequence
```

## See also

- `decodeURIComponent()`
- `encodeURI()`
- `encodeURIComponent()`
