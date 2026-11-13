---
title: "TextDecoderStream: ignoreBOM property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textdecoderstream/ignorebom/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextDecoderStream: ignoreBOM property

The **`ignoreBOM`** read-only property of the `TextDecoderStream` interface is a `Boolean` indicating whether the byte order mark will be included in the output or skipped over.

## Value

`true` if the byte order mark will be included in the decoded text; `false` if it will be skipped over when decoding and omitted.

## Examples

```js
stream = new TextDecoderStream();
console.log(stream.ignoreBOM); // returns false
```
