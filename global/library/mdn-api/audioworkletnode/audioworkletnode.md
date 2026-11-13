---
title: "AudioWorkletNode: AudioWorkletNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletnode/audioworkletnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletNode: AudioWorkletNode() constructor

The **`AudioWorkletNode()`**
constructor creates a new `AudioWorkletNode` object, which represents an
`AudioNode` that uses a JavaScript function to perform custom audio
processing.

## Syntax

```js
new AudioWorkletNode(context, name)
new AudioWorkletNode(context, name, options)
```

### Parameters

- `context`
    The `BaseAudioContext` instance this node will be associated with.
- `name`
    A string, which represents the name of the `AudioWorkletProcessor` this
    node will be based on. A processor with the provided name must first be registered
    using the `AudioWorkletGlobalScope.registerProcessor()` method.
- `options` (optional)
    An object containing zero or more of the following optional properties to configure the new node:

    > **Note:**
    > The result of the structured clone algorithm
    > applied to the object is also internally passed into the associated `AudioWorkletProcessor()` constructor
    > — this allows custom initialization of an underlying user-defined `AudioWorkletProcessor`.
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

### Exceptions

- `NotSupportedError` `DOMException`
    The specified `options.outputChannelCount` is `0` or larger
    than the current implementation supports.

    Both `options.numberOfInputs` and `options.numberOfOutputs` are 0.

- `IndexSizeError` `DOMException`
    The length of `options.outputChannelCount` array does not match
    `options.numberOfOutputs`.

## Usage notes

Different `options` parameter values can have the following effects.

If the number of inputs and number of outputs are both set to 0, a `NotSupportedError` will be thrown and the node construction process aborted. If the length of the `outputChannelCount` array doesn't match `numberOfOutputs`, an `IndexSizeError` `DOMException` will be thrown.

If `outputChannelCount` isn't specified, and `numberOfInputs` and `numberOfOutputs` are both 1, the `AudioWorkletNode`'s initial channel count is set to 1. This has the effect of changing the output channel count to dynamically change to the computed number of channels, based on the input's channel count and the current setting of the `AudioNode` property `channelCountMode`.

Otherwise, if `outputChannelCount` is provided _and_ if the values of `numberOfInputs` and `numberOfOutputs` are both 1, the audio worklet node's channel count is set to the value of `outputChannelCount`. Otherwise, the channel count of each channel in the set of output channels is set to match the corresponding value in the `outputChannelCount` array.

## Examples

_For a complete example demonstrating user-defined audio processing, see the
`AudioWorkletNode` page._

## See also

- Web Audio API
- Background audio processing using AudioWorklet
- `AudioWorkletNode` interface
