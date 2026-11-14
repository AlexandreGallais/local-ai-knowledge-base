---
title: "BaseAudioContext: createStereoPanner() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createstereopanner/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createStereoPanner() method

The `createStereoPanner()` method of the `BaseAudioContext` interface creates a `StereoPannerNode`, which can be used to apply
stereo panning to an audio source.
It positions an incoming audio stream in a stereo image using a low-cost panning algorithm.

> **Note:**
> The `StereoPannerNode()`
> constructor is the recommended way to create a `StereoPannerNode`; see
> Creating an AudioNode.

## Syntax

```js
createStereoPanner()
```

### Parameters

None.

### Return value

A `StereoPannerNode`.

## Examples

In our StereoPannerNode example (see source code) HTML we have a simple `<audio>` element along with a
slider `` to increase and decrease pan value. In the JavaScript we
create a `MediaElementAudioSourceNode` and a
`StereoPannerNode`, and connect the two together using the
`connect()` method. We then use an `oninput` event handler to
change the value of the `StereoPannerNode.pan` parameter and update the pan
value display when the slider is moved.

Moving the slider left and right while the music is playing pans the music across to
the left and right speakers of the output, respectively.

```js
const audioCtx = new AudioContext();
const myAudio = document.querySelector("audio");

const panControl = document.querySelector(".panning-control");
const panValue = document.querySelector(".panning-value");

// Create a MediaElementAudioSourceNode
// Feed the HTMLMediaElement into it
const source = audioCtx.createMediaElementSource(myAudio);

// Create a stereo panner
const panNode = audioCtx.createStereoPanner();

// Event handler function to increase panning to the right and left
// when the slider is moved

panControl.oninput = () => {
  panNode.pan.setValueAtTime(panControl.value, audioCtx.currentTime);
  panValue.textContent = panControl.value;
};

// connect the MediaElementAudioSourceNode to the panNode
// and the panNode to the destination, so we can play the
// music and adjust the panning using the controls
source.connect(panNode);
panNode.connect(audioCtx.destination);
```

## See also

- Using the Web Audio API
