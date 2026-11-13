---
title: "TextDecoder: TextDecoder() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textdecoder/textdecoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextDecoder: TextDecoder() constructor

The **`TextDecoder()`** constructor returns a new `TextDecoder` object.

## Syntax

```js
new TextDecoder()
new TextDecoder(label)
new TextDecoder(label, options)
```

### Parameters

- `label` (optional)
    A string identifying the character encoding that this decoder will use. This may be any valid label.

    Defaults to `"utf-8"`.

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

```js
const textDecoder1 = new TextDecoder("iso-8859-2");

const textDecoder2 = new TextDecoder();

const textDecoder3 = new TextDecoder("csiso2022kr", { fatal: true });
// Allows TypeError exception to be thrown.

const textDecoder4 = new TextDecoder("iso-2022-cn");
// Throws a RangeError exception.
```

## See also

- The `TextDecoder` interface it belongs to.
