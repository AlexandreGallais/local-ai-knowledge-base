---
title: "AudioDestinationNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodestinationnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioDestinationNode

The `AudioDestinationNode` interface represents the end destination of an audio graph in a given context — usually the speakers of your device. It can also be the node that will "record" the audio data when used with an `OfflineAudioContext`.

`AudioDestinationNode` has no output (as it _is_ the output, no more `AudioNode` can be linked after it in the audio graph) and one input. The number of channels in the input must be between `0` and the `maxChannelCount` value or an exception is raised.

The `AudioDestinationNode` of a given `AudioContext` can be retrieved using the `AudioContext.destination` property.

       | Number of inputs
       | `1`

       | Number of outputs
       | `0`

       | Channel count mode
       | `"explicit"`

       | Channel count
       | `2`

       | Channel interpretation
       | `"speakers"`

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `AudioDestinationNode.maxChannelCount` (read-only)
    An `unsigned long` defining the maximum number of channels that the physical device can handle.

## Instance methods

_No specific method; inherits methods from its parent, `AudioNode`_.

## Example

There is no complex set up for using an `AudioDestinationNode` — by default, this represents the output of the user's system (e.g., their speakers), so you can get it hooked up inside an audio graph using only a few lines of code:

```js
const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(myMediaElement);
source.connect(gainNode);
gainNode.connect(audioCtx.destination);
```

To see a more complete implementation, check out one of our MDN Web Audio examples, such as Voice-change-o-matic or Violent Theremin.

## See also

- Using the Web Audio API
