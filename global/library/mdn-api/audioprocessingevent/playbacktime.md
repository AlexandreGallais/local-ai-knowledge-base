---
title: "AudioProcessingEvent: playbackTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioprocessingevent/playbacktime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioProcessingEvent: playbackTime property

The **`playbackTime`** read-only property of the `AudioProcessingEvent` interface represents the time when the audio will be played. It is in the same coordinate system as the time used by the `AudioContext`.

## Value

A number that doesn't need to be an integer.

## Examples

```js
const audioContext = new AudioContext();
const processor = audioContext.createScriptProcessor(256, 2, 2);

processor.addEventListener("audioprocess", (event) => {
  const inputBuffer = event.inputBuffer;
  const outputBuffer = event.outputBuffer;

  for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
    const inputData = inputBuffer.getChannelData(channel);
    const outputData = outputBuffer.getChannelData(channel);

    // Log the corresponding time for this audio buffer
    console.log(`Received audio data to be played at ${event.playbackTime}`);

    // Process the audio data here
    for (let i = 0; i < outputBuffer.length; i++) {
      outputData[i] = inputData[i] * 0.5;
    }
  }
});

processor.connect(audioContext.destination);
```

## See also

- `AudioProcessingEvent`
- `ScriptProcessorNode`
