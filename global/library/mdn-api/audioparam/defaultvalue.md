---
title: "AudioParam: defaultValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioparam/defaultvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioParam: defaultValue property

The **`defaultValue`**
read-only property of the `AudioParam` interface represents the initial
value of the attributes as defined by the specific `AudioNode` creating
the `AudioParam`.

## Value

A floating-point `Number`.

## Examples

```js
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const defaultVal = gainNode.gain.defaultValue;
console.log(defaultVal); // 1
console.log(defaultVal === gainNode.gain.value); // true
```

## See also

- Using the Web Audio API
