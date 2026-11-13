---
title: "TextEncoderStream: encoding property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textencoderstream/encoding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextEncoderStream: encoding property

The **`encoding`** read-only property of the `TextEncoderStream` interface returns a
string containing the name of the encoding algorithm used by the current `TextEncoderStream` object.

## Value

A string containing `utf-8` encoded data.

## Examples

The following example demonstrates how to return `encoding` from a `TextEncoderStream` object.

```js
const stream = new TextEncoderStream();
console.log(stream.encoding);
```
