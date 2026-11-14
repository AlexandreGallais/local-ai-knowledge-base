---
title: "TextDecoderStream: encoding property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textdecoderstream/encoding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextDecoderStream: encoding property

The **`encoding`** read-only property of the `TextDecoderStream` interface returns a string containing the name of the encoding algorithm used by the specific decoder.

The encoding is set by the constructor `label` parameter, and defaults to `utf-8`.

## Value

A string containing the lower-cased ASCII name of the encoding format.

The allowed values are the same as those listed in `TextDecoder.encoding` (the labels in Encoding API Encodings).

## Examples

Returning the value of `encoding` from a `TextDecoderStream`.

```js
stream = new TextDecoderStream();
console.log(stream.encoding); // returns the default "utf-8"
```
