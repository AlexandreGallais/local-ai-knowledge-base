---
title: "AudioData: format property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodata/format/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioData: format property

The **`format`** read-only property of the `AudioData` interface returns the sample format of the `AudioData` object.

## Value

A string. One of:

- `"u8"`
    8-bit unsigned integer samples, in an interleaved format.
- `"s16"`
    16-bit signed integer samples, in an interleaved format.
- `"s32"`
    32-bit signed integer samples, in an interleaved format.
- `"f32"`
    32-bit float samples, in an interleaved format.
- `"u8-planar"`
    8-bit unsigned integer samples, in a planar format.
- `"s16-planar"`
    16-bit signed integer samples, in a planar format.
- `"s32-planar"`
    32-bit signed integer samples, in a planar format.
- `"f32-planar"`
    32-bit float samples, in a planar format.

## Examples

The below example prints the value of `format` to the console.

```js
console.log(AudioData.format);
```
