---
title: "URIError: malformed URI sequence"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/malformed_uri/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URIError: malformed URI sequence

The JavaScript exception "malformed URI sequence" occurs when URI encoding or decoding
wasn't successful.

## Message

```plain
URIError: URI malformed (V8-based)
URIError: malformed URI sequence (Firefox)
URIError: String contained an illegal UTF-16 sequence. (Safari)
```

## Error type

`URIError`

## What went wrong?

URI encoding or decoding wasn't successful. An argument given to either the
`decodeURI`, `encodeURI`, `encodeURIComponent`, or
`decodeURIComponent` function was not valid, so that the function was unable
encode or decode properly.

## Examples

### Encoding

Encoding replaces each instance of certain characters by one, two, three, or four
escape sequences representing the UTF-8 encoding of the character. An
`URIError` will be thrown if there is an attempt to encode a surrogate which
is not part of a high-low pair, for example:

```js
encodeURI("\uD800");
// "URIError: malformed URI sequence"

encodeURI("\uDFFF");
// "URIError: malformed URI sequence"
```

A high-low pair is OK. For example:

```js
encodeURI("\uD800\uDFFF");
// "%F0%90%8F%BF"
```

### Decoding

Decoding replaces each escape sequence in the encoded URI component with the character
that it represents. If there isn't such a character, an error will be thrown:

```js
decodeURIComponent("%E0%A4%A");
// "URIError: malformed URI sequence"
```

With proper input, this should usually look like something like this:

```js
decodeURIComponent("JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B");
// "JavaScript_шеллы"
```

## See also

- `URIError`
- `decodeURI`
- `encodeURI`
- `encodeURIComponent`
- `decodeURIComponent`
