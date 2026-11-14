---
title: "AudioWorkletProcessor: AudioWorkletProcessor() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletprocessor/audioworkletprocessor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletProcessor: AudioWorkletProcessor() constructor

The **`AudioWorkletProcessor()`**
constructor creates a new `AudioWorkletProcessor` object, which
represents an underlying audio processing mechanism of an
`AudioWorkletNode`.

> **Note:**
> The `AudioWorkletProcessor` and classes that derive from it
> cannot be instantiated directly from user-supplied code. Instead, they are created
> only internally by the creation of an associated `AudioWorkletNode`.

## Syntax

```js
new AudioWorkletProcessor(options)
```

### Parameters

- `options`
    An object that is passed as _options_ parameter to the
    `AudioWorkletNode()` constructor and
    passed through the structured clone algorithm.
    Available properties are as follows:

    - `numberOfInputs` (optional)
        The value to initialize the `numberOfInputs` property to. Defaults to 1.
    - `numberOfOutputs` (optional)
        The value to initialize the `numberOfOutputs` property to. Defaults to 1.
    - `outputChannelCount` (optional)
        An **array** defining the number of channels for each output. For example, _outputChannelCount: \[n, m]_ specifies the number of channels in the first output to be _n_ and the second output to be _m_. The array length must match `numberOfOutputs`.
    - `parameterData` (optional)
        An object containing the initial values of custom `AudioParam` objects on this node (in its `parameters` property), with `key` being the name of a custom parameter and `value` being its initial value.
    - `processorOptions` (optional)
        Any additional data that can be used for custom initialization of the underlying `AudioWorkletProcessor`.

    Note that there are default values for the first two properties, so even if there is no
    _options_ object passed to the `AudioWorkletNode()` constructor, the _options_ object passed by the node to the `AudioWorkletProcessor` constructor will exist and at minimum have `numberOfInputs` and `numberOfOutputs`.

### Return value

The newly constructed `AudioWorkletProcessor` instance.

## Examples

In this example we pass <example-value> options to the
`AudioWorkletNode()` constructor and
observe how a structured clone of them gets passed to our `AudioWorkletProcessor` constructor.

First, we need to define a custom `AudioWorkletProcessor` and register it.
Note that this should be done in a separate file.

```js
// test-processor.js
class TestProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    console.log(options.numberOfInputs);
    console.log(options.processorOptions.someUsefulVariable);
  }
  process(inputs, outputs, parameters) {
    return true;
  }
}

registerProcessor("test-processor", TestProcessor);
```

Next, in our main script file we'll load the processor, create an instance of
`AudioWorkletNode` passing it the name of the processor and _options_
object.

In the _options_ object we pass `processorOptions` with a
`Map` instance under `someUsefulVariable` key. We don't pass
`numberOfInputs` and see how it gets its default value.

```js
const audioContext = new AudioContext();
await audioContext.audioWorklet.addModule("test-processor.js");
const testNode = new AudioWorkletNode(audioContext, "test-processor", {
  processorOptions: {
    someUsefulVariable: new Map([
      [1, "one"],
      [2, "two"],
    ]),
  },
});
```

The console output will be as follows:

```plain
> 1 // AudioWorkletNode options.numberOfInputs set to default
> Map(2) { 1 => "one", 2 => "two" } // A cloned map under someUsefulVariable
```

## See also

- `AudioWorkletNode` interface
