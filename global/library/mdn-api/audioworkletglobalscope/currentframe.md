---
title: "AudioWorkletGlobalScope: currentFrame property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletglobalscope/currentframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletGlobalScope: currentFrame property

The read-only **`currentFrame`** property of the `AudioWorkletGlobalScope` interface returns an integer that represents the ever-increasing current sample-frame of the audio block being processed. It is incremented by 128 (the size of a render quantum) after the processing of each audio block.

## Value

An integer number.

## Examples

The `AudioWorkletProcessor` has access to the specific `AudioWorkletGlobalScope` properties:

```js
// AudioWorkletProcessor defined in : test-processor.js
class TestProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    // Logs the current sample-frame and time at the moment of instantiation.
    // They are accessible from the AudioWorkletGlobalScope.
    console.log(currentFrame);
    console.log(currentTime);
  }

  // The process method is required - output silence,
  // which the outputs are already filled with.
  process(inputs, outputs, parameters) {
    return true;
  }
}

// Logs the sample rate, that is not going to change ever,
// because it's a read-only property of a BaseAudioContext
// and is set only during its instantiation.
console.log(sampleRate);

// You can declare any variables and use them in your processors
// for example it may be an ArrayBuffer with a wavetable.
const usefulVariable = 42;
console.log(usefulVariable);

registerProcessor("test-processor", TestProcessor);
```

The main script loads the processor, creates an instance of `AudioWorkletNode`, passes the name of the processor to it, and connects the node to an audio graph. We should see the output of `console.log()` calls in the console:

```js
const audioContext = new AudioContext();
await audioContext.audioWorklet.addModule("test-processor.js");
const testNode = new AudioWorkletNode(audioContext, "test-processor");
testNode.connect(audioContext.destination);
```

## See also

- Web Audio API
- Using the Web Audio API
