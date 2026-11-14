---
title: "SpeechSynthesis: pending property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesis/pending/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesis: pending property

The **`pending`** read-only property of the
`SpeechSynthesis` interface is a boolean value that returns
`true` if the utterance queue contains as-yet-unspoken utterances.

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

const amIPending = synth.pending; // will return true if utterance 1 is still being spoken and utterance 2 is in the queue
```

## See also

- Web Speech API
