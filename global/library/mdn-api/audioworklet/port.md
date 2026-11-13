---
title: "AudioWorklet: port"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworklet/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorklet: port

The **`port`** read-only property of the `AudioWorklet` interface returns a `MessagePort` object that can be used to send and receive messages between the main thread and the associated `AudioWorkletGlobalScope`.

This allows for custom, asynchronous communication between code in the main thread and the global scope of an audio worklet, such as receiving control data or global settings.

## Value

The `MessagePort` object connecting the `AudioWorklet` and its associated `AudioWorkletGlobalScope`.

## Examples

See `AudioWorkletNode.port` for more examples.

### Using a port for global messages

In the following example, we can use `port.onmessage` to receive data and `port.postMessage` to send data:

```js
const context = new AudioContext();
// Load the module that contains worklet code
await context.audioWorklet.addModule("processor.js");

// Listener for messages from AudioWorkletGlobalScope
context.audioWorklet.port.onmessage = (event) => {
  console.log("Message from global worklet:", event.data);
};

// Set a global config, for example:
context.audioWorklet.port.postMessage({
  volume: 0.8,
});
```

## See also

- `AudioWorkletGlobalScope` — the global execution context of an `AudioWorklet`
- Web Audio API
- Using the Web Audio API
- Using AudioWorklet
