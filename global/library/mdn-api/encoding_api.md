---
title: "Encoding API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encoding_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Encoding API

The **Encoding API** enables web developers to work with text that is represented in character encodings systems other than the encoding used internally by JavaScript strings. In particular, it enables developers to convert text between JavaScript strings and the UTF-8 encoding that is used for most documents on the web.

It provides two mechanisms:

- **Encoding**: taking a JavaScript string and converting it into an array of bytes representing the UTF-8 encoding of the string.
- **Decoding**: taking an array of bytes representing a particular character encoding of some text, and converting it into a JavaScript string.

Note that these operations are asymmetrical: encoding only encodes to UTF-8, while decoding can decode UTF-8 but also many legacy encoding systems.

The API provides synchronous interfaces for encoding and decoding, and also stream-based encoders and decoders, which could be used to, for example, decode text as it arrives over a network connection.

## Interfaces

- `TextDecoder`
    A decoder to convert a byte array containing a particular encoding into a JavaScript string.
- `TextDecoderStream`
    A decoder to convert a byte stream containing a particular encoding into a stream of JavaScript strings.
- `TextEncoder`
    An encoder to convert a JavaScript string into an array of bytes representing the UTF-8 encoding of the string.
- `TextEncoderStream`
    An encoder to convert a stream of JavaScript strings into a stream of bytes representing the UTF-8 encoding of the strings.

## See also

- Encoding API Encodings - Encodings that must be supported for decoding text.
