---
title: "BaseAudioContext: createConstantSource() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createconstantsource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createConstantSource() method

The **`createConstantSource()`**
property of the `BaseAudioContext` interface creates a
`ConstantSourceNode` object, which is an audio source that continuously
outputs a monaural (one-channel) sound signal whose samples all have the same
value.

> **Note:**
> The `ConstantSourceNode()`
> constructor is the recommended way to create a `ConstantSourceNode`; see
> Creating an AudioNode.

## Syntax

```js
createConstantSource()
```

### Parameters

None.

### Return value

A `ConstantSourceNode` instance.
