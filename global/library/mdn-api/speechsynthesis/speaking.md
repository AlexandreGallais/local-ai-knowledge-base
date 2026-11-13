---
title: "SpeechSynthesis: speaking property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesis/speaking/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesis: speaking property

The **`speaking`** read-only property of the
`SpeechSynthesis` interface is a boolean value that returns
`true` if an utterance is currently in the process of being spoken — even
if `SpeechSynthesis` is in a
`paused` state.

## Value

A boolean value.

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

const amISpeaking = synth.speaking; // will return true if utterance 1 or utterance 2 are currently being spoken
```

## See also

- Web Speech API
