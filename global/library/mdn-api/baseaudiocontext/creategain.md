---
title: "BaseAudioContext: createGain() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/creategain/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createGain() method

The `createGain()` method of the `BaseAudioContext`
interface creates a `GainNode`, which can be used to control the
overall gain (or volume) of the audio graph.

> **Note:**
> The `GainNode()`
> constructor is the recommended way to create a `GainNode`; see
> Creating an AudioNode.

## Syntax

```js
createGain()
```

### Parameters

None.

### Return value

A `GainNode` which takes as input one or more audio sources and outputs
audio whose volume has been adjusted in gain (volume) to a level specified by the node's
`GainNode.gain` a-rate
parameter.

## Examples

The following example shows basic usage of an `AudioContext` to create a
`GainNode`, which is then used to mute and unmute the audio when a Mute
button is clicked by changing the `gain` property value.

The below snippet wouldn't work as is — for a complete working example, check out our
Voice-change-O-matic demo (view source.)

```html
<div>
  <button class="mute">Mute button</button>
</div>
```

```js
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const mute = document.querySelector(".mute");
let source;

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia(
    // constraints - only audio needed for this app
    {
      audio: true,
    },

    // Success callback
    (stream) => {
      source = audioCtx.createMediaStreamSource(stream);
    },

    // Error callback
    (err) => {
      console.error(`The following gUM error occurred: ${err}`);
    },
  );
} else {
  console.error("getUserMedia not supported on your browser!");
}

source.connect(gainNode);
gainNode.connect(audioCtx.destination);

// …

mute.onclick = () => {
  if (mute.id === "") {
    // 0 means mute. If you still hear something, make sure you haven't
    // connected your source into the output in addition to using the GainNode.
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    mute.id = "activated";
    mute.textContent = "Unmute";
  } else {
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    mute.id = "";
    mute.textContent = "Mute";
  }
};
```

## See also

- Using the Web Audio API
