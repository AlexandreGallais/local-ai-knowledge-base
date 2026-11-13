---
title: "AnalyserNode: getFloatFrequencyData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/analysernode/getfloatfrequencydata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnalyserNode: getFloatFrequencyData() method

The **`getFloatFrequencyData()`** method of the `AnalyserNode` Interface copies the current frequency data into a `Float32Array` array passed into it.

Each item in the array represents the decibel value for a specific frequency. The frequencies are spread linearly from 0 to 1/2 of the sample rate. For example, for a `48000` Hz sample rate, the last item of the array will represent the decibel value for `24000` Hz.

If you need higher performance and don't care about precision, you can use `AnalyserNode.getByteFrequencyData()` instead, which works on a `Uint8Array`.

## Syntax

```js
getFloatFrequencyData(array)
```

### Parameters

- `array`
    The `Float32Array` that the frequency domain data will be copied to. For any sample which is silent, the value is `-Infinity`.
    If the array has fewer elements than the `AnalyserNode.frequencyBinCount`, excess elements are dropped. If it has more elements than needed, excess elements are ignored.

### Return value

None (`undefined`).

## Examples

```js
const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();
// Float32Array should be the same length as the frequencyBinCount
const myDataArray = new Float32Array(analyser.frequencyBinCount);
// fill the Float32Array with data returned from getFloatFrequencyData()
analyser.getFloatFrequencyData(myDataArray);
```

### Drawing a spectrum

The following example shows basic usage of an `AudioContext` to connect a `MediaElementAudioSourceNode` to an `AnalyserNode`. While the audio is playing, we collect the frequency data repeatedly with `requestAnimationFrame()` and draw a "winamp bar graph style" to a `<canvas>` element.

For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js lines 108–193 for relevant code).

```js
const audioCtx = new AudioContext();

// Create audio source
// Here, we use an audio file, but this could also be e.g. microphone input
const audioEle = new Audio();
audioEle.src = "my-audio.mp3"; // Insert file name here
audioEle.autoplay = true;
audioEle.preload = "auto";
const audioSourceNode = audioCtx.createMediaElementSource(audioEle);

// Create analyser node
const analyserNode = audioCtx.createAnalyser();
analyserNode.fftSize = 256;
const bufferLength = analyserNode.frequencyBinCount;
const dataArray = new Float32Array(bufferLength);

// Set up audio node network
audioSourceNode.connect(analyserNode);
analyserNode.connect(audioCtx.destination);

// Create 2D canvas
const canvas = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const canvasCtx = canvas.getContext("2d");
canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

function draw() {
  // Schedule next redraw
  requestAnimationFrame(draw);

  // Get spectrum data
  analyserNode.getFloatFrequencyData(dataArray);

  // Draw black background
  canvasCtx.fillStyle = "rgb(0 0 0)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw spectrum
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let posX = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (dataArray[i] + 140) * 2;
    canvasCtx.fillStyle = `rgb(${Math.floor(barHeight + 100)} 50 50)`;
    canvasCtx.fillRect(
      posX,
      canvas.height - barHeight / 2,
      barWidth,
      barHeight / 2,
    );
    posX += barWidth + 1;
  }
}

draw();
```

## See also

- Using the Web Audio API
