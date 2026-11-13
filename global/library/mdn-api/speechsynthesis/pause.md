---
title: "SpeechSynthesis: pause() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesis/pause/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesis: pause() method

The **`pause()`** method of the `SpeechSynthesis`
interface puts the `SpeechSynthesis` object into a paused state.

## Syntax

```js
pause()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const synth = window.speechSynthesis;

const utterance1 = new SpeechSynthesisUtterance(
  "How about we say this now? This is quite a long sentence to say.",
);
const utterance2 = new SpeechSynthesisUtterance(
  "We should say another sentence too, just to be on the safe side.",
);

synth.speak(utterance1);
synth.speak(utterance2);

synth.pause(); // pauses utterances being spoken
```

## See also

- Web Speech API
