---
title: "AudioEncoder: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioencoder/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioEncoder: state property

The **`state`** read-only property of the `AudioEncoder` interface returns the current state of the underlying codec.

## Value

A string containing one of the following values:

- `"unconfigured"`
    The codec is not configured for decoding.
- `"configured"`
    The codec has a valid configuration and is ready.
- `"closed"`
    The codec is no longer usable and system resources have been released.

## Examples

The following example prints the state of the `AudioEncoder` to the console.

```js
console.log(AudioEncoder.state);
```
