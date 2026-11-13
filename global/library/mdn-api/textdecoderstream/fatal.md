---
title: "TextDecoderStream: fatal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textdecoderstream/fatal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextDecoderStream: fatal property

The **`fatal`** read-only property of the `TextDecoderStream` interface is a `Boolean` indicating if the error mode of the `TextDecoderStream` object is set to `fatal`.

If the property is `true` then a decoder will throw a `TypeError` if it encounters malformed data while decoding.
If `false` the decoder will substitute the invalid data with the replacement character `U+FFFD` (�).
The value of the property is set in the `TextDecoderStream()` constructor.

## Value

A `Boolean` which will return `true` if the error mode is set to "fatal".
Otherwise it returns `false`, indicating that the error mode is "replacement".

## Examples

```js
stream = new TextDecoderStream();
console.log(stream.fatal); // returns false
```
