---
title: "BaseAudioContext: createAnalyser() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createanalyser/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createAnalyser() method

The `createAnalyser()` method of the
`BaseAudioContext` interface creates an `AnalyserNode`, which
can be used to expose audio time and frequency data and create data visualizations.

> **Note:**
> The `AnalyserNode()` constructor is the
> recommended way to create an `AnalyserNode`; see
> Creating an AudioNode.

> **Note:**
> For more on using this node, see the
> `AnalyserNode` page.

## Syntax

```js
createAnalyser()
```

### Parameters

None.

### Return value

An `AnalyserNode`.

## Examples

The following example shows basic usage of an AudioContext to create an Analyser node,
then use requestAnimationFrame() to collect time domain data repeatedly and draw an
"oscilloscope style" output of the current audio input. For more complete applied
examples/information, check out our Voice-change-O-matic demo (see
app.js lines 108-193 for relevant code).

```js
const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();

// …

analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
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

  canvasCtx.beginPath();

  const sliceWidth = (WIDTH * 1.0) / bufferLength;
  let x = 0;

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

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}

draw();
```

## See also

- Using the Web Audio API
