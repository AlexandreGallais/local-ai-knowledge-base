---
title: "ScriptProcessorNode: audioprocess event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/scriptprocessornode/audioprocess_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScriptProcessorNode: audioprocess event

The **`audioprocess`** event of the `ScriptProcessorNode` interface is fired when an input buffer of a script processor is ready to be processed.

> **Note:**
> This feature was replaced by AudioWorklets and the `AudioWorkletNode` interface.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("audioprocess", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onaudioprocess = (event) => { }
```

## Event type

An `AudioProcessingEvent`. Inherits from `Event`.

## Examples

```js
scriptNode.addEventListener("audioprocess", (audioProcessingEvent) => {
  // The input buffer is a song we loaded earlier
  const inputBuffer = audioProcessingEvent.inputBuffer;

  // The output buffer contains the samples that will be modified and played
  const outputBuffer = audioProcessingEvent.outputBuffer;

  // Loop through the output channels (in this case there is only one)
  for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
    const inputData = inputBuffer.getChannelData(channel);
    const outputData = outputBuffer.getChannelData(channel);

    // Loop through the 4096 samples
    for (let sample = 0; sample < inputBuffer.length; sample++) {
      // make output equal to the same as the input
      outputData[sample] = inputData[sample];

      // add noise to each output sample
      outputData[sample] += (Math.random() * 2 - 1) * 0.2;
    }
  }
});
```

You could also set up the event handler using the `onaudioprocess` property (but note that this replaces other event listeners added using `onaudioprocess`, if any):

```js
scriptNode.onaudioprocess = (audioProcessingEvent) => {
  // …
};
```

## See also

- Web Audio API
