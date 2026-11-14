---
title: "AudioWorkletProcessor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletprocessor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletProcessor

The **`AudioWorkletProcessor`** interface of the Web Audio API represents an audio processing code behind a custom `AudioWorkletNode`. It lives in the `AudioWorkletGlobalScope` and runs on the Web Audio rendering thread. In turn, an `AudioWorkletNode` based on it runs on the main thread.

## Constructor

> **Note:**
> The `AudioWorkletProcessor` and classes that derive from it cannot be instantiated directly from user-supplied code. Instead, they are created only internally by the creation of an associated `AudioWorkletNode`. The constructor of the deriving class is getting called with an options object, so you can perform custom initialization procedures — see constructor page for details.

- `AudioWorkletProcessor()`
    Creates a new instance of an `AudioWorkletProcessor` object.

## Instance properties

- `port` (read-only)
    Returns a `MessagePort` used for bidirectional communication between the processor and the `AudioWorkletNode` which it belongs to. The other end is available under the `port` property of the node.

## Instance methods

_The `AudioWorkletProcessor` interface does not define any methods of its own. However, you must provide a `process()` method, which is called in order to process the audio stream._

## Events

_The `AudioWorkletProcessor` interface doesn't respond to any events._

## Usage notes

### Deriving classes

To define custom audio processing code you have to derive a class from the `AudioWorkletProcessor` interface. Although not defined on the interface, the deriving class must have the `process` method. This method gets called for each block of 128 sample-frames and takes input and output arrays and calculated values of custom `AudioParam`s (if they are defined) as parameters. You can use inputs and audio parameter values to fill the outputs array, which by default holds silence.

Optionally, if you want custom `AudioParam`s on your node, you can supply a `parameterDescriptors` property as a _static getter_ on the processor. The array of `AudioParamDescriptor`-based objects returned is used internally to create the `AudioParam`s during the instantiation of the `AudioWorkletNode`.

The resulting `AudioParam`s reside in the `parameters` property of the node and can be automated using standard methods such as `linearRampToValueAtTime`. Their calculated values will be passed into the `process()` method of the processor for you to shape the node output accordingly.

### Processing audio

An example algorithm of creating a custom audio processing mechanism is:

1. Create a separate file;
2. In the file:
   1. Extend the `AudioWorkletProcessor` class (see "Deriving classes" section) and supply your own `process()` method in it;
   2. Register the processor using `AudioWorkletGlobalScope.registerProcessor()` method;

3. Load the file using `addModule()` method on your audio context's `audioWorklet` property;
4. Create an `AudioWorkletNode` based on the processor. The processor will be instantiated internally by the `AudioWorkletNode` constructor.
5. Connect the node to the other nodes.

## Examples

In the example below we create a custom `AudioWorkletNode` that outputs white noise.

First, we need to define a custom `AudioWorkletProcessor`, which will output white noise, and register it. Note that this should be done in a separate file.

```js
// white-noise-processor.js
class WhiteNoiseProcessor extends AudioWorkletProcessor {
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

registerProcessor("white-noise-processor", WhiteNoiseProcessor);
```

Next, in our main script file we'll load the processor, create an instance of `AudioWorkletNode`, passing it the name of the processor, then connect the node to an audio graph.

```js
const audioContext = new AudioContext();
await audioContext.audioWorklet.addModule("white-noise-processor.js");
const whiteNoiseNode = new AudioWorkletNode(
  audioContext,
  "white-noise-processor",
);
whiteNoiseNode.connect(audioContext.destination);
```

## See also

- Web Audio API
- Using the Web Audio API
- Using AudioWorklet
