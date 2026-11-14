---
title: "AudioWorkletNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletNode

> **Note:**
> Although the interface is available outside secure contexts, the `BaseAudioContext.audioWorklet` property is not, thus custom `AudioWorkletProcessor`s cannot be defined outside them.

The **`AudioWorkletNode`** interface of the Web Audio API represents a base class for a user-defined `AudioNode`, which can be connected to an audio routing graph along with other nodes. It has an associated `AudioWorkletProcessor`, which does the actual audio processing in a Web Audio rendering thread.

## Constructor

- `AudioWorkletNode()`
    Creates a new instance of an `AudioWorkletNode` object.

## Instance properties

_Also Inherits properties from its parent, `AudioNode`_.

- `AudioWorkletNode.port` (read-only)
    Returns a `MessagePort` used for bidirectional communication between the node and its associated `AudioWorkletProcessor`. The other end is available under the `port` property of the processor.
- `AudioWorkletNode.parameters` (read-only)
    Returns an `AudioParamMap` — a collection of `AudioParam` objects. They are instantiated during the creation of the underlying `AudioWorkletProcessor`. If the `AudioWorkletProcessor` has a static `parameterDescriptors` getter, the `AudioParamDescriptor` array returned from it is used to create `AudioParam` objects on the `AudioWorkletNode`. With this mechanism it is possible to make your own `AudioParam` objects accessible from your `AudioWorkletNode`. You can then use their values in the associated `AudioWorkletProcessor`.

## Instance methods

_Also inherits methods from its parent, `AudioNode`_.

_The `AudioWorkletNode` interface does not define any methods of its own._

## Events

- `processorerror`
    Fired when an error is thrown in associated `AudioWorkletProcessor`. Once fired, the processor and consequently the node will output silence throughout its lifetime.

## Examples

In this example we create a custom `AudioWorkletNode` that outputs random noise.

First, we need to define a custom `AudioWorkletProcessor`, which will output random noise, and register it. Note that this should be done in a separate file.

```js
// random-noise-processor.js
class RandomNoiseProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = Math.random() * 2 - 1;
      }
    });
    return true;
  }
}

registerProcessor("random-noise-processor", RandomNoiseProcessor);
```

Next, in our main script file we'll load the processor, create an instance of `AudioWorkletNode` passing it the name of the processor, and connect the node to an audio graph.

```js
const audioContext = new AudioContext();
await audioContext.audioWorklet.addModule("random-noise-processor.js");
const randomNoiseNode = new AudioWorkletNode(
  audioContext,
  "random-noise-processor",
);
randomNoiseNode.connect(audioContext.destination);
```

## See also

- Web Audio API
- Using the Web Audio API
- Using AudioWorklet
