---
title: "AnalyserNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/analysernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnalyserNode

The **`AnalyserNode`** interface represents a node able to provide real-time frequency and time-domain analysis information. It is an `AudioNode` that passes the audio stream unchanged from the input to the output, but allows you to take the generated data, process it, and create audio visualizations.

An `AnalyserNode` has exactly one input and one output. The node works even if the output is not connected.

       | Number of inputs
       | `1`

       | Number of outputs
       | `1` (but may be left unconnected)

       | Channel count mode
       | `"max"`

       | Channel count
       | `2`

       | Channel interpretation
       | `"speakers"`

## Constructor

- `AnalyserNode()`
    Creates a new instance of an `AnalyserNode` object.

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `AnalyserNode.fftSize`
    An unsigned long value representing the size of the FFT (Fast Fourier Transform) to be used to determine the frequency domain.
- `AnalyserNode.frequencyBinCount` (read-only)
    An unsigned long value half that of the FFT size. This generally equates to the number of data values you will have to play with for the visualization.
- `AnalyserNode.minDecibels`
    A double value representing the minimum power value in the scaling range for the FFT analysis data, for conversion to unsigned byte values — basically, this specifies the minimum value for the range of results when using `getByteFrequencyData()`.
- `AnalyserNode.maxDecibels`
    A double value representing the maximum power value in the scaling range for the FFT analysis data, for conversion to unsigned byte values — basically, this specifies the maximum value for the range of results when using `getByteFrequencyData()`.
- `AnalyserNode.smoothingTimeConstant`
    A double value representing the averaging constant with the last analysis frame — basically, it makes the transition between values over time smoother.

## Instance methods

_Inherits methods from its parent, `AudioNode`_.

- `AnalyserNode.getFloatFrequencyData()`
    Copies the current frequency data into a `Float32Array` array passed into it.
- `AnalyserNode.getByteFrequencyData()`
    Copies the current frequency data into a `Uint8Array` (unsigned byte array) passed into it.
- `AnalyserNode.getFloatTimeDomainData()`
    Copies the current waveform, or time-domain, data into a `Float32Array` array passed into it.
- `AnalyserNode.getByteTimeDomainData()`
    Copies the current waveform, or time-domain, data into a `Uint8Array` (unsigned byte array) passed into it.

## Examples

> **Note:**
> See the guide Visualizations with Web Audio API for more information on creating audio visualizations.

### Basic usage

The following example shows basic usage of an `AudioContext` to create an `AnalyserNode`, then `requestAnimationFrame` and `<canvas>` to collect time domain data repeatedly and draw an "oscilloscope style" output of the current audio input.
For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js lines 108-193 for relevant code).

```js
const audioCtx = new AudioContext();

// …

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Connect the source to be analyzed
source.connect(analyser);

// Get a canvas defined with ID "oscilloscope"
const canvas = document.getElementById("oscilloscope");
const canvasCtx = canvas.getContext("2d");

// draw an oscilloscope of the current audio source

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = "rgb(200 200 200)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0 0 0)";

  canvasCtx.beginPath();

  const sliceWidth = (canvas.width * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * canvas.height) / 2;

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
