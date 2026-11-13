---
title: "AudioParam: setValueAtTime() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioparam/setvalueattime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioParam: setValueAtTime() method

The `setValueAtTime()` method of the
`AudioParam` interface schedules an instant change to the
`AudioParam` value at a precise time, as measured against
`AudioContext.currentTime`. The new value is given in the value parameter.

## Syntax

```js
setValueAtTime(value, startTime)
```

### Parameters

- `value`
    A floating point number representing the value the AudioParam will change to at the
    given time.
- `startTime`
    A double representing the time (in seconds) after the `AudioContext`
    was first created that the change in value will happen. If the time is less than `AudioContext.currentTime`, the change happens immediately. A `TypeError` is thrown if this value is negative.

### Return value

A reference to this `AudioParam` object. In some browsers older
implementations of this interface return `undefined`.

## Examples

This simple example features a media element source with two control buttons (see our
webaudio-examples repo for the source code, or view the example live). When the buttons are pressed, the `currGain` variable is
incremented/decremented by 0.25, then the `setValueAtTime()` method is used
to set the gain value equal to `currGain`, one second from now
(`audioCtx.currentTime + 1`.)

```js
// create audio context
const audioCtx = new AudioContext();

// set basic <example-value> for example
const myAudio = document.querySelector("audio");
const pre = document.querySelector("pre");
const myScript = document.querySelector("script");

pre.textContent = myScript.textContent;

const targetAtTimePlus = document.querySelector(".set-target-at-time-plus");
const targetAtTimeMinus = document.querySelector(".set-target-at-time-minus");

// Create a MediaElementAudioSourceNode
// Feed the HTMLMediaElement into it
const source = audioCtx.createMediaElementSource(myAudio);

// Create a gain node and set its gain value to 0.5
const gainNode = audioCtx.createGain();
gainNode.gain.value = 0.5;
let currGain = gainNode.gain.value;

// connect the AudioBufferSourceNode to the gainNode
// and the gainNode to the destination
source.connect(gainNode);
gainNode.connect(audioCtx.destination);

// set buttons to do something onclick
targetAtTimePlus.onclick = () => {
  currGain += 0.25;
  gainNode.gain.setValueAtTime(currGain, audioCtx.currentTime + 1);
};

targetAtTimeMinus.onclick = () => {
  currGain -= 0.25;
  gainNode.gain.setValueAtTime(currGain, audioCtx.currentTime + 1);
};
```

## See also

- Using the Web Audio API
