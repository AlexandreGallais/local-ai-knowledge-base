---
title: "BaseAudioContext: createDelay() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createdelay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createDelay() method

The `createDelay()` method of the
`BaseAudioContext` Interface is used to create a `DelayNode`,
which is used to delay the incoming audio signal by a certain amount of time.

> **Note:**
> The `DelayNode()`
> constructor is the recommended way to create a `DelayNode`; see
> Creating an AudioNode.

## Syntax

```js
createDelay(maxDelayTime)
```

### Parameters

- `maxDelayTime` (optional)
    The maximum amount of time, in seconds, that the audio signal can be delayed by.
    Must be less than 180 seconds, and defaults to 1 second if not specified.

### Return value

A `DelayNode`. The default `DelayNode.delayTime` is 0
seconds.

## Examples

We have created an example that allows you to play three different samples on a
constant loop — see create-delay (you can also
view the source code). If
you just press the play buttons, the loops will start immediately; if you slide the
sliders up to the right, then press the play buttons, a delay will be introduced, so the
looping sounds don't start playing for a short amount of time.

```js
const audioCtx = new AudioContext();

const synthDelay = audioCtx.createDelay(5.0);

// …

let synthSource;

playSynth.onclick = () => {
  synthSource = audioCtx.createBufferSource();
  synthSource.buffer = buffers[2];
  synthSource.loop = true;
  synthSource.start();
  synthSource.connect(synthDelay);
  synthDelay.connect(destination);
  this.setAttribute("disabled", "disabled");
};

stopSynth.onclick = () => {
  synthSource.disconnect(synthDelay);
  synthDelay.disconnect(destination);
  synthSource.stop();
  playSynth.removeAttribute("disabled");
};

// …

let delay1;
rangeSynth.oninput = () => {
  delay1 = rangeSynth.value;
  synthDelay.delayTime.setValueAtTime(delay1, audioCtx.currentTime);
};
```

## See also

- Using the Web Audio API
