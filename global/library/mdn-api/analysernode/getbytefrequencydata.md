---
title: "AnalyserNode: getByteFrequencyData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/analysernode/getbytefrequencydata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnalyserNode: getByteFrequencyData() method

The **`getByteFrequencyData()`** method of the `AnalyserNode` interface copies the current frequency data into a `Uint8Array` (unsigned byte array) passed into it.

The frequency data is composed of integers on a scale from 0 to 255.

Each item in the array represents the decibel value for a specific frequency. The frequencies are spread linearly from 0 to 1/2 of the sample rate. For example, for `48000` sample rate, the last item of the array will represent the decibel value for `24000` Hz.

If the array has fewer elements than the `AnalyserNode.frequencyBinCount`, excess elements are dropped. If it has more elements than needed, excess elements are ignored.

## Syntax

```js
getByteFrequencyData(array)
```

### Parameters

- `array`
    The `Uint8Array` that the frequency domain data will be copied to.
    If the array has fewer elements than the `AnalyserNode.frequencyBinCount`, excess elements are dropped. If it has more elements than needed, excess elements are ignored.

### Return value

None (`undefined`).

## Examples

The following example shows basic usage of an `AudioContext` to create an `AnalyserNode`, then `requestAnimationFrame` and `<canvas>` to collect frequency data repeatedly and draw a "winamp bar graph style" output of the current audio input. For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js lines 108–193 for relevant code).

```js
const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();

// …

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);
const dataArray = new Uint8Array(bufferLength);

canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
  drawVisual = requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = "rgb(0 0 0)";
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  const barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    canvasCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
    canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

    x += barWidth + 1;
  }
}

draw();
```

## See also

- Using the Web Audio API
