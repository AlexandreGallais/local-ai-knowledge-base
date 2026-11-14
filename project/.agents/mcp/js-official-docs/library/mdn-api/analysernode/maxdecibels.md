---
title: "AnalyserNode: maxDecibels property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/analysernode/maxdecibels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnalyserNode: maxDecibels property

The **`maxDecibels`** property of the `AnalyserNode` interface is a double value representing the maximum power value in the scaling range for the FFT analysis data, for conversion to unsigned byte values — basically, this specifies the maximum value for the range of results when using `getByteFrequencyData()`.

## Value

A double, representing the maximum decibel value for scaling the FFT analysis data, where `0` dB is the loudest possible sound, `-10` dB is a 10th of that, etc. The default value is `-30` dB.

When getting data from `getByteFrequencyData()`, any frequencies with an amplitude of `maxDecibels` or higher will be returned as `255`.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if a value less than or equal to `AnalyserNode.minDecibels` is set.

## Examples

The following example shows basic usage of an `AudioContext` to create an `AnalyserNode`, then `requestAnimationFrame` and `<canvas>` to collect frequency data repeatedly and draw a "winamp bar graph style" output of the current audio input.
For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js lines 108–193 for relevant code).

```js
const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;

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
