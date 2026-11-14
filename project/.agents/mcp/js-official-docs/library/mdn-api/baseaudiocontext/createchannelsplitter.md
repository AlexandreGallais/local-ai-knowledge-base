---
title: "BaseAudioContext: createChannelSplitter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createchannelsplitter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createChannelSplitter() method

The `createChannelSplitter()` method of the `BaseAudioContext` Interface is used to create a `ChannelSplitterNode`,
which is used to access the individual channels of an audio stream and process them separately.

> **Note:**
> The `ChannelSplitterNode()`
> constructor is the recommended way to create a `ChannelSplitterNode`; see
> Creating an AudioNode.

## Syntax

```js
createChannelSplitter(numberOfOutputs)
```

### Parameters

- `numberOfOutputs`
    The number of channels in the input audio stream that you want to output separately;
    the default is 6 if this parameter is not specified.

### Return value

A `ChannelSplitterNode`.

## Examples

The following simple example shows how you could separate a stereo track (say, a piece
of music), and process the left and right channel differently. To use them, you need to
use the second and third parameters of the `AudioNode.connect(AudioNode)`
method, which allow you to specify the index of the channel to connect from and the
index of the channel to connect to.

```js
const ac = new AudioContext();
ac.decodeAudioData(someStereoBuffer, (data) => {
  const source = ac.createBufferSource();
  source.buffer = data;
  const splitter = ac.createChannelSplitter(2);
  source.connect(splitter);
  const merger = ac.createChannelMerger(2);

  // Reduce the volume of the left channel only
  const gainNode = ac.createGain();
  gainNode.gain.setValueAtTime(0.5, ac.currentTime);
  splitter.connect(gainNode, 0);

  // Connect the splitter back to the second input of the merger: we
  // effectively swap the channels, here, reversing the stereo image.
  gainNode.connect(merger, 0, 1);
  splitter.connect(merger, 1, 0);

  const dest = ac.createMediaStreamDestination();

  // Because we have used a ChannelMergerNode, we now have a stereo
  // MediaStream we can use to pipe the Web Audio graph to WebRTC,
  // MediaRecorder, etc.
  merger.connect(dest);
});
```

## See also

- Using the Web Audio API
