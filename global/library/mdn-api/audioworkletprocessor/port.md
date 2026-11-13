---
title: "AudioWorkletProcessor: port property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletprocessor/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletProcessor: port property

The read-only **`port`** property of the
`AudioWorkletProcessor` interface returns the associated
`MessagePort`. It can be used to communicate between the processor and the
`AudioWorkletNode` to which it belongs.

> **Note:**
> The port at the other end of the channel is
> available under the `port` property of the node.

## Value

The `MessagePort` object that is connecting the `AudioWorkletProcessor` and the associated `AudioWorkletNode`.

## Examples

See `AudioWorkletNode.port` for example code.

## See also

- Web Audio API
- Using the Web Audio API
