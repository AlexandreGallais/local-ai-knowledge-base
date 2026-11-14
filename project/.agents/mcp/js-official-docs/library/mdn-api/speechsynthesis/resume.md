---
title: "SpeechSynthesis: resume() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesis/resume/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesis: resume() method

The **`resume()`** method of the `SpeechSynthesis`
interface puts the `SpeechSynthesis` object into a non-paused state:
resumes it if it was already paused.

## Syntax

```js
resume()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
let synth = window.speechSynthesis;

let utterance1 = new SpeechSynthesisUtterance(
  "How about we say this now? This is quite a long sentence to say.",
);
let utterance2 = new SpeechSynthesisUtterance(
  "We should say another sentence too, just to be on the safe side.",
);

synth.speak(utterance1);
synth.speak(utterance2);

synth.pause(); // pauses utterances being spoken
synth.resume(); // resumes speaking
```

## See also

- Web Speech API
