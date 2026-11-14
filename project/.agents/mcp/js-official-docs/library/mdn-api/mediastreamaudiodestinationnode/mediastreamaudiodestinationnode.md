---
title: "MediaStreamAudioDestinationNode: MediaStreamAudioDestinationNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamaudiodestinationnode/mediastreamaudiodestinationnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamAudioDestinationNode: MediaStreamAudioDestinationNode() constructor

The **`MediaStreamAudioDestinationNode()`** constructor of the Web Audio API creates a new `MediaStreamAudioDestinationNode` object instance.

## Syntax

```js
new MediaStreamAudioDestinationNode(context)
new MediaStreamAudioDestinationNode(context, options)
```

### Parameters

- `context`
    An `AudioContext` representing the audio context you want the node to be associated with.
- `options` (optional)
    An object defining the properties you want the `MediaStreamAudioDestinationNode` to have:
    - `channelCount`
        An integer used to determine how many channels are used when
        up-mixing and down-mixing
        connections to any inputs to the node. (See
        `AudioNode.channelCount` for more information.) Its usage and precise
        definition depend on the value of `channelCountMode`.
    - `channelCountMode`
        A string describing the way channels must be matched between
        the node's inputs and outputs. (See `AudioNode.channelCountMode` for more
        information including default values.)
    - `channelInterpretation`
        A string describing the meaning of the channels. This interpretation will define how audio
        up-mixing and down-mixing
        will happen. The possible values are `"speakers"` or `"discrete"`. (See
        `AudioNode.channelCountMode` for more information including default
        values.)

## Examples

```js
const ac = new AudioContext();

const myDestination = new MediaStreamAudioDestinationNode(ac);
```
