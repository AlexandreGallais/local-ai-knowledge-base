---
title: "AudioWorkletProcessor: parameterDescriptors static property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletprocessor/parameterdescriptors_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletProcessor: parameterDescriptors static property

The **`parameterDescriptors`** static property of an `AudioWorkletProcessor`-derived class is an iterable of `AudioParamDescriptor`-based objects.

The property is not a part of the `AudioWorkletProcessor` interface, but, if defined, it is read by `registerProcessor()` to create a list of custom `AudioParam` objects in the `parameters` property of the associated `AudioWorkletNode`. It is never modified by built-in APIs, so it may be defined as a _static getter_.

Defining the property is optional.

## Value

An iterable of `AudioParamDescriptor`-based objects. The properties of
these objects are as follows:

- `name`
    The string which represents the name of the `AudioParam`. Under this name the `AudioParam` will be available in the `parameters` property of the node, and under this name the `AudioWorkletProcessor.process` method will acquire the calculated values of this `AudioParam`.
- `automationRate` (optional)
    Either `"a-rate"`, or `"k-rate"` string which represents an automation rate of this `AudioParam`. Defaults to `"a-rate"`.
- `minValue` (optional)
    A `float` which represents minimum value of the `AudioParam`. Defaults to `-3.4028235e38`.
- `maxValue` (optional)
    A `float` which represents maximum value of the `AudioParam`. Defaults to `3.4028235e38`.
- `defaultValue` (optional)
    A `float` which represents initial value of the `AudioParam`. Defaults to `0`.

## Examples

See `AudioWorkletNode.parameters` for example code showing how to add static `parameterDescriptors` getter to a custom `AudioWorkletProcessor`.

## See also

- Web Audio API
- Using the Web Audio API
