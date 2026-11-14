---
title: "SpeechSynthesis: cancel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesis/cancel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesis: cancel() method

The **`cancel()`** method of the `SpeechSynthesis`
interface removes all utterances from the utterance queue.

If an utterance is currently being spoken, speaking will stop immediately.

## Syntax

```js
cancel()
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

synth.cancel(); // utterance1 stops being spoken immediately, and both are removed from the queue
```

## See also

- Web Speech API
