---
title: "AudioParamDescriptor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioparamdescriptor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioParamDescriptor

The **`AudioParamDescriptor`** dictionary of the Web Audio API specifies properties for `AudioParam` objects.

It is used to create custom `AudioParam`s on an `AudioWorkletNode`. If the underlying `AudioWorkletProcessor` has a `parameterDescriptors` static getter, then the returned array of objects based on this dictionary is used internally by `AudioWorkletNode` constructor to populate its `parameters` property accordingly.

## Instance properties

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

The code fragment below shows a descriptor of this type being returned by a static `parameterDescriptors` method defined in a custom `AudioWorkletProcessor` (this is part of the more complete example in AudioWorkletNode.parameters).

```js
// white-noise-processor.js
class WhiteNoiseProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "customGain",
        defaultValue: 1,
        minValue: 0,
        maxValue: 1,
        automationRate: "a-rate",
      },
    ];
  }

  // …
}
```

## See also

- Web Audio API
- Using the Web Audio API
