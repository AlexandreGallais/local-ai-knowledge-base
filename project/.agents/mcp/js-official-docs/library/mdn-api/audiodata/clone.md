---
title: "AudioData: clone() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodata/clone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioData: clone() method

The **`clone()`** method of the `AudioData` interface creates a new `AudioData` object with reference to the same media resource as the original.

## Syntax

```js
clone()
```

### Parameters

None.

### Return value

The cloned `AudioData` object.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `AudioData` object has been transferred.

## Examples

The following example clones a copy of `AudioData` as `audioData2`.

```js
let audioData2 = AudioData.clone();
```
