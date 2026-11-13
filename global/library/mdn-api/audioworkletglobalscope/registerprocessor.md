---
title: "AudioWorkletGlobalScope: registerProcessor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletglobalscope/registerprocessor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletGlobalScope: registerProcessor() method

The **`registerProcessor`** method of the
`AudioWorkletGlobalScope` interface registers a class constructor derived
from `AudioWorkletProcessor` interface under a specified _name_.

## Syntax

```js
registerProcessor(name, processorCtor)
```

### Parameters

- `name`
    A string representing the name under which the processor will be registered.
- `processorCtor`
    The constructor of a class derived from `AudioWorkletProcessor`.

> **Note:**
> A key-value pair `{ name: constructor }`
> is saved internally in the `AudioWorkletGlobalScope` once the processor
> is registered. The _name_ is to be referred to when creating an
> `AudioWorkletNode` based on the registered processor. A new processor by
> the given name is internally created and associated with the new node.

### Return value

None (`undefined`).

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown under the following conditions:
    - The _name_ is an empty string.
    - A constructor under the given _name_ is already registered. Registering
      the same name twice is not allowed.

- `TypeError`
    Thrown under the following conditions:
    - The _processorCtor_ is not a callable constructor.
    - The `parameterDescriptors` property of the constructor exists and doesn't return an array of `AudioParamDescriptor`-based objects.

## Examples

In this example we create a custom `AudioWorkletNode` that outputs silence.

First, we need to define a custom `AudioWorkletProcessor` and register it.
Note that this should be done in a separate file.

```js
// test-processor.js
class TestProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    return true;
  }
}

registerProcessor("test-processor", TestProcessor);
```

Next, in our main script file we'll load the processor, create an instance of
`AudioWorkletNode` — passing it the processor name that we used when calling
`registerProcessor` — and connect it to an audio graph.

```js
const audioContext = new AudioContext();
await audioContext.audioWorklet.addModule("test-processor.js");
const node = new AudioWorkletNode(audioContext, "test-processor");
node.connect(audioContext.destination);
```

## See also

- Using the Web Audio API
