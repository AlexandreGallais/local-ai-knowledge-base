---
title: "ScriptProcessorNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/scriptprocessornode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScriptProcessorNode

The `ScriptProcessorNode` interface allows the generation, processing, or analyzing of audio using JavaScript.

> **Note:**
> This feature was replaced by AudioWorklets and the `AudioWorkletNode` interface.

The `ScriptProcessorNode` interface is an `AudioNode` audio-processing module that is linked to two buffers, one containing the input audio data, one containing the processed output audio data. An event, implementing the `AudioProcessingEvent` interface, is sent to the object each time the input buffer contains new data, and the event handler terminates when it has filled the output buffer with data.

The size of the input and output buffer are defined at the creation time, when the `BaseAudioContext.createScriptProcessor` method is called (both are defined by `BaseAudioContext.createScriptProcessor`'s `bufferSize` parameter). The buffer size must be a power of 2 between `256` and `16384`, that is `256`, `512`, `1024`, `2048`, `4096`, `8192` or `16384`. Small numbers lower the _latency_, but large number may be necessary to avoid audio breakup and glitches.

If the buffer size is not defined, which is recommended, the browser will pick one that its heuristic deems appropriate.

       | Number of inputs
       | `1`

       | Number of outputs
       | `1`

       | Channel count mode
       | `"max"`

       | Channel count
       | `2` (not used in the default count mode)

       | Channel interpretation
       | `"speakers"`

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `ScriptProcessorNode.bufferSize` (read-only) (deprecated)
    Returns an integer representing both the input and output buffer size. Its value can be a power of 2 value in the range `256` – `16384`.

## Instance methods

_No specific methods; inherits methods from its parent, `AudioNode`_.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface:

- `audioprocess` (deprecated)
    Fired when an input buffer of a `ScriptProcessorNode` is ready to be processed.
    Also available via the `onaudioprocess` event handler property.

## Examples

See `BaseAudioContext.createScriptProcessor()` for example code.

## See also

- Using the Web Audio API
