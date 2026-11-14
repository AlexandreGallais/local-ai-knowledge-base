---
title: "Background audio processing using AudioWorklet (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_audio_api/using_audioworklet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Background audio processing using AudioWorklet (part 2 of 2)

## Supporting audio parameters

Just like any other Web Audio node, `AudioWorkletNode` supports parameters, which are shared with the `AudioWorkletProcessor` that does the actual work.

### Adding parameter support to the processor

To add parameters to an `AudioWorkletNode`, you need to define them within your `AudioWorkletProcessor`-based processor class in your module. This is done by adding the static getter `parameterDescriptors` to your class. This function should return an array of `AudioParam` objects, one for each parameter supported by the processor.

In the following implementation of `parameterDescriptors()`, the returned array has two `AudioParam` objects. The first defines `gain` as a value between 0 and 1, with a default value of 0.5. The second parameter is named `frequency` and defaults to 440.0, with a range from 27.5 to 4186.009, inclusively.

```js
class MyAudioProcessor extends AudioWorkletProcessor {
  // …
  static get parameterDescriptors() {
    return [
      {
        name: "gain",
        defaultValue: 0.5,
        minValue: 0,
        maxValue: 1,
      },
      {
        name: "frequency",
        defaultValue: 440.0,
        minValue: 27.5,
        maxValue: 4186.009,
      },
    ];
  }
}
```

If `automationRate` is not specified in a parameter descriptor, it defaults to
`"a-rate"` (sample-accurate updates).

To use block-rate processing, `"k-rate"` must be explicitly requested.
Making the automation rate explicit helps avoid incorrect assumptions about
whether a parameter is sample-accurate or block-rate by default.

Accessing your processor node's parameters is as simple as looking them up in the `parameters` object passed into your implementation of `process()`. Within the `parameters` object are arrays, one for each of your parameters, and sharing the same names as your parameters.

- A-rate parameters
    For a-rate parameters—parameters whose values automatically change over time—the parameter's entry in the `parameters` object is an array of `AudioParam` objects, one for each frame in the block being processed. These values are to be applied to the corresponding frames.
- K-rate parameters
    K-rate parameters, on the other hand, can only change once per block, so the parameter's array has only a single entry. Use that value for every frame in the block.

In the code below, we see a `process()` function that handles a `gain` parameter which can be used as either an a-rate or k-rate parameter. Our node only supports one input, so it just takes the first input in the list, applies the gain to it, and writes the resulting data to the first output's buffer.

```js
class MyAudioProcessor extends AudioWorkletProcessor {
  // …
  process(inputList, outputList, parameters) {
    const input = inputList[0];
    const output = outputList[0];
    const gain = parameters.gain;

    for (let channelNum = 0; channelNum < input.length; channelNum++) {
      const inputChannel = input[channelNum];
      const outputChannel = output[channelNum];

      // If gain.length is 1, it's a k-rate parameter, so apply
      // the first entry to every frame. Otherwise, apply each
      // entry to the corresponding frame.

      if (gain.length === 1) {
        for (let i = 0; i < inputChannel.length; i++) {
          outputChannel[i] = inputChannel[i] * gain[0];
        }
      } else {
        for (let i = 0; i < inputChannel.length; i++) {
          outputChannel[i] = inputChannel[i] * gain[i];
        }
      }
    }

    return true;
  }
}
```

Here, if `gain.length` indicates that there's only a single value in the `gain` parameter's array of values, the first entry in the array is applied to every frame in the block. Otherwise, for each frame in the block, the corresponding entry in `gain[]` is applied.

### Accessing parameters from the main thread script

Your main thread script can access the parameters just like it can any other node. To do so, first you need to get a reference to the parameter by calling the `AudioWorkletNode`'s `parameters` property's `get()` method:

```js
let gainParam = myAudioWorkletNode.parameters.get("gain");
```

The value returned and stored in `gainParam` is the `AudioParam` used to store the `gain` parameter. You can then change its value effective at a given time using the `AudioParam` method `setValueAtTime()`.

Here, for example, we set the value to `newValue`, effective immediately.

```js
gainParam.setValueAtTime(newValue, audioContext.currentTime);
```

You can similarly use any of the other methods in the `AudioParam` interface to apply changes over time, to cancel scheduled changes, and so forth.

Reading the value of a parameter is as simple as looking at its `value` property:

```js
let currentGain = gainParam.value;
```

## See also

- Web Audio API
- Enter Audio Worklet (Chrome Developers blog)
