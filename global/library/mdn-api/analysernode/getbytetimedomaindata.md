---
title: "AnalyserNode: getByteTimeDomainData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/analysernode/getbytetimedomaindata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnalyserNode: getByteTimeDomainData() method

The **`getByteTimeDomainData()`** method of the `AnalyserNode` Interface copies the current waveform, or time-domain, data into a `Uint8Array` (unsigned byte array) passed into it.

If the array has fewer elements than the `AnalyserNode.fftSize`, excess elements are dropped. If it has more elements than needed, excess elements are ignored.

## Syntax

```js
getByteTimeDomainData(array)
```

### Parameters

- `array`
    The `Uint8Array` that the time domain data will be copied to.
    If the array has fewer elements than the `AnalyserNode.fftSize`, excess elements are dropped. If it has more elements than needed, excess elements are ignored.

### Return value

None (`undefined`).

## Examples

The following example shows basic usage of an `AudioContext` to create an `AnalyserNode`, then `requestAnimationFrame` and `<canvas>` to collect time domain data repeatedly and draw an "oscilloscope style" output of the current audio input.
For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js lines 108–193 for relevant code).

```js
const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();

// …

analyser.fftSize = 2048;
const bufferLength = analyser.fftSize;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// draw an oscilloscope of the current audio source
function draw() {
  drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = "rgb(200 200 200)";
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0 0 0)";

  const sliceWidth = (WIDTH * 1.0) / bufferLength;
  let x = 0;

  canvasCtx.beginPath();
  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * HEIGHT) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(WIDTH, HEIGHT / 2);
  canvasCtx.stroke();
}

draw();
```

## See also

- Using the Web Audio API
