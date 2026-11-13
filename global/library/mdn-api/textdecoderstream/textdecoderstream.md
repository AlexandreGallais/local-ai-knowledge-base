---
title: "TextDecoderStream: TextDecoderStream() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textdecoderstream/textdecoderstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextDecoderStream: TextDecoderStream() constructor

The **`TextDecoderStream()`** constructor creates a new `TextDecoderStream` object which is used to convert a stream of text in a binary encoding into strings.

## Syntax

```js
new TextDecoderStream(label)
new TextDecoderStream(label, options)
```

### Parameters

- `label`
    A string defaulting to `utf-8`.
    This may be any valid label.
- `options` (optional)
    An object with the following properties:
    - `fatal` (optional)
        A boolean value indicating if the `TextDecoder.decode()` method must throw a `TypeError` when decoding invalid data.
        It defaults to `false`, which means that the decoder will substitute malformed data with a replacement character.

    - `ignoreBOM` (optional)
        A boolean value indicating whether the byte order mark will be included in the output or skipped over.
        It defaults to `false`, which means that the byte order mark will be skipped over when decoding and will not be included in the decoded text.

### Exceptions

- `RangeError`
    Thrown if the value of `label` is unknown, or is one of the values leading to a `'replacement'` decoding algorithm (`"iso-2022-cn"` or `"iso-2022-cn-ext"`).

## Examples

The following example demonstrates how to decode binary data retrieved from a `fetch()` call.
The data will be interpreted as UTF-8, as no `label` has been passed.

```js
const response = await fetch("https://example.com");
const stream = response.body.pipeThrough(new TextDecoderStream());
```
