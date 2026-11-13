---
title: "AudioWorkletGlobalScope: port"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletglobalscope/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletGlobalScope: port

The **`port`** read-only property of the `AudioWorkletGlobalScope` interface returns a `MessagePort` object that can be used to send and receive messages between the main thread and the associated `AudioWorklet`.

This allows for custom, asynchronous communication between code in the main thread and the global scope of an audio worklet, such as sending control data or global settings.

## Value

The `MessagePort` object that is connecting the `AudioWorklet` and its associated `AudioWorkletGlobalScope`.

## Examples

See `AudioWorkletNode.port` for examples.

## See also

- Web Audio API
- Using the Web Audio API
- Using AudioWorklet
