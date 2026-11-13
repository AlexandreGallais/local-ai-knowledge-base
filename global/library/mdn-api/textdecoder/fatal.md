---
title: "TextDecoder: fatal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textdecoder/fatal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextDecoder: fatal property

The **`fatal`** read-only property of the `TextDecoder` interface is a `Boolean` indicating whether the error mode is fatal.

If the property is `true`, then a decoder will throw a `TypeError` if it encounters malformed data while decoding.
If `false`, the decoder will substitute the invalid data with the replacement character `U+FFFD` (�).
The value of the property is set in the `fatal` argument to the decoder's constructor.

## Value

A boolean which will be `true` if the error mode is set to `fatal`.
Otherwise, it will be `false`, indicating that the error mode is `replacement`.
