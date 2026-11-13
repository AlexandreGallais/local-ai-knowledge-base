---
title: "encodeURIComponent()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/encodeuricomponent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# encodeURIComponent()

The **`encodeURIComponent()`** function encodes a URI by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two surrogate characters). Compared to `encodeURI()`, this function encodes more characters, including those that are part of the URI syntax.

```js
// Encodes characters such as ?,=,/,&,:
console.log(`?x=${encodeURIComponent("test?")}`);
// Expected output: "?x=test%3F"

console.log(`?x=${encodeURIComponent("шеллы")}`);
// Expected output: "?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"
```

## Syntax

```js
encodeURIComponent(uriComponent)
```

### Parameters

- `uriComponent`
    A string to be encoded as a URI component (a path, query string, fragment, etc.). Other values are converted to strings.

### Return value

A new string representing the provided `uriComponent` encoded as a URI component.

### Exceptions

- `URIError`
    Thrown if `uriComponent` contains a lone surrogate.

## Description

`encodeURIComponent()` is a function property of the global object.

`encodeURIComponent()` uses the same encoding algorithm as described in `encodeURI()`. It escapes all characters **except**:

```plain
A–Z a–z 0–9 - _ . ! ~ * ' ( )
```

Compared to `encodeURI()`, `encodeURIComponent()` escapes a larger set of characters. Use `encodeURIComponent()` on user-entered fields from forms sent to the server — this will encode `&` symbols that may inadvertently be generated during data entry for character references or other characters that require encoding/decoding. For example, if a user writes `Jack & Jill`, without `encodeURIComponent()`, the ampersand could be interpreted on the server as the start of a new field and jeopardize the integrity of the data.

For `application/x-www-form-urlencoded`, spaces are to be replaced by `+`, so one may wish to follow an `encodeURIComponent()` replacement with an additional replacement of `%20` with `+`.

## Examples

### Encoding for Content-Disposition and Link headers

The following example provides the special encoding required within UTF-8 `Content-Disposition` and `Link` server response header parameters (e.g., UTF-8 filenames):

```js
const fileName = "my file(2).txt";
const header = `Content-Disposition: attachment; filename*=UTF-8''${encodeRFC5987ValueChars(
  fileName,
)}`;

console.log(header);
// "Content-Disposition: attachment; filename*=UTF-8''my%20file%282%29.txt"

function encodeRFC5987ValueChars(str) {
  return (
    encodeURIComponent(str)
      // The following creates the sequences %27 %28 %29 %2A (Note that
      // the valid encoding of "*" is %2A, which necessitates calling
      // toUpperCase() to properly encode). Although RFC3986 reserves "!",
      // RFC5987 does not, so we do not need to escape it.
      .replace(
        /['()*]/g,
        (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
      )
      // The following are not required for percent-encoding per RFC5987,
      // so we can allow for a little better readability over the wire: |`^
      .replace(/%(7C|60|5E)/g, (str, hex) =>
        String.fromCharCode(parseInt(hex, 16)),
      )
  );
}
```

### Encoding for RFC3986

The more recent RFC3986 reserves `!`, `'`, `(`, `)`, and `*`, even though these characters have no formalized URI delimiting uses. The following function encodes a string for RFC3986-compliant URL component format. It also encodes `[` and `]`, which are part of the IPv6 URI syntax. An RFC3986-compliant `encodeURI` implementation should not escape them, which is demonstrated in the `encodeURI()` example.

```js
function encodeRFC3986URIComponent(str) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}
```

### Encoding a lone surrogate throws

A `URIError` will be thrown if one attempts to encode a surrogate which is not part of a high-low pair. For example:

```js
// High-low pair OK
encodeURIComponent("\uD800\uDFFF"); // "%F0%90%8F%BF"

// Lone high-surrogate code unit throws "URIError: malformed URI sequence"
encodeURIComponent("\uD800");

// Lone high-surrogate code unit throws "URIError: malformed URI sequence"
encodeURIComponent("\uDFFF");
```

You can use `String.prototype.toWellFormed()`, which replaces lone surrogates with the Unicode replacement character (U+FFFD), to avoid this error. You can also use `String.prototype.isWellFormed()` to check if a string contains lone surrogates before passing it to `encodeURIComponent()`.

## See also

- `decodeURI()`
- `encodeURI()`
- `decodeURIComponent()`
