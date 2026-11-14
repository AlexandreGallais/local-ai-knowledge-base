---
title: "AnalyserNode: getFloatTimeDomainData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/analysernode/getfloattimedomaindata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnalyserNode: getFloatTimeDomainData() method

The **`getFloatTimeDomainData()`** method of the `AnalyserNode` Interface copies the current waveform, or time-domain, data into a `Float32Array` array passed into it. Each array value is a _sample_, the magnitude of the signal at a particular time.

The waveform is represented as PCM data, which has a nominal range of -1.0 to 1.0, but values can exceed the range such as when down-mixing stereo to mono.

## Syntax

```js
getFloatTimeDomainData(array)
```

### Parameters

- `array`
    The `Float32Array` that the time domain data will be copied to.
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

analyser.fftSize = 1024;
const bufferLength = analyser.fftSize;
console.log(bufferLength);
const dataArray = new Float32Array(bufferLength);

canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
  drawVisual = requestAnimationFrame(draw);
  analyser.getFloatTimeDomainData(dataArray);

  canvasCtx.fillStyle = "rgb(200 200 200)";
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0 0 0)";
  canvasCtx.beginPath();

  const sliceWidth = (WIDTH * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] * 200.0;
    const y = HEIGHT / 2 + v;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }
    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}

draw();
```

## See also

- Using the Web Audio API
