---
title: "AudioParam: cancelScheduledValues() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioparam/cancelscheduledvalues/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioParam: cancelScheduledValues() method

The `cancelScheduledValues()` method of the `AudioParam`
Interface cancels all scheduled future changes to the `AudioParam`.

## Syntax

```js
cancelScheduledValues(startTime)
```

### Parameters

- `startTime`
    A double representing the time (in seconds) after the `AudioContext`
    was first created after which all scheduled changes will be canceled.

### Return value

A reference to this `AudioParam` object. In some older implementations this
method returns `undefined`.

## Examples

```js
const gainNode = audioCtx.createGain();
gainNode.gain.setValueCurveAtTime(waveArray, audioCtx.currentTime, 2); // 'gain' is the AudioParam
gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
```

## See also

- Using the Web Audio API
