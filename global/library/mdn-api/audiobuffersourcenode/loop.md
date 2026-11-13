---
title: "AudioBufferSourceNode: loop property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiobuffersourcenode/loop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioBufferSourceNode: loop property

The `loop` property of the `AudioBufferSourceNode`
interface is a Boolean indicating if the audio asset must be replayed when the end of
the `AudioBuffer` is reached.

The `loop` property's default value is `false`.

## Value

A Boolean which is `true` if looping is enabled; otherwise, the value is
`false`.

When looping is enabled, the sound begins playing at the time specified as the start
point when `start()` is called. When the
time specified by the `loopEnd` property
is reached, playback continues at the time specified by
`loopStart`

## Examples

### Setting `loop`

In this example, when the user presses "Play", we load an audio track, decode it, and put it into an `AudioBufferSourceNode`.

The example then sets the `loop` property to `true`, so the track loops, and plays the track.

The user can set the `loopStart` and `loopEnd` properties using range controls.

> **Note:**
> You can run the full example live (or view the source.)

```js
let audioCtx;
let buffer;
let source;

const play = document.getElementById("play");
const stop = document.getElementById("stop");

const loopstartControl = document.getElementById("loopstart-control");
const loopstartValue = document.getElementById("loopstart-value");

const loopendControl = document.getElementById("loopend-control");
const loopendValue = document.getElementById("loopend-value");

async function loadAudio() {
  try {
    // Load an audio file
    const response = await fetch("rnb-lofi-melody-loop.wav");
    // Decode it
    buffer = await audioCtx.decodeAudioData(await response.arrayBuffer());
    const max = Math.floor(buffer.duration);
    loopstartControl.setAttribute("max", max);
    loopendControl.setAttribute("max", max);
  } catch (err) {
    console.error(`Unable to fetch the audio file. Error: ${err.message}`);
  }
}

play.addEventListener("click", async () => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    await loadAudio();
  }
  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.loop = true;
  source.loopStart = loopstartControl.value;
  source.loopEnd = loopendControl.value;
  source.start();
  play.disabled = true;
  stop.disabled = false;
  loopstartControl.disabled = false;
  loopendControl.disabled = false;
});

stop.addEventListener("click", () => {
  source.stop();
  play.disabled = false;
  stop.disabled = true;
  loopstartControl.disabled = true;
  loopendControl.disabled = true;
});

loopstartControl.addEventListener("input", () => {
  source.loopStart = loopstartControl.value;
  loopstartValue.textContent = loopstartControl.value;
});

loopendControl.addEventListener("input", () => {
  source.loopEnd = loopendControl.value;
  loopendValue.textContent = loopendControl.value;
});
```

## See also

- Web Audio API
- Using the Web Audio API
- `AudioBufferSourceNode`
