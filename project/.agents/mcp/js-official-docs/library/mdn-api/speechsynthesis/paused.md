---
title: "SpeechSynthesis: paused property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesis/paused/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesis: paused property

The **`paused`** read-only property of the
`SpeechSynthesis` interface is a boolean value that returns
`true` if the `SpeechSynthesis` object is in a paused state, or `false` if not.

It can be set to `paused` even if nothing is
currently being spoken through it. If
`utterances` are then added to the utterance
queue, they will not be spoken until the `SpeechSynthesis` object is
unpaused, using `SpeechSynthesis.resume()`.

## Value

A boolean value.

## Examples

```js
const synth = window.speechSynthesis;

synth.pause();

const amIPaused = synth.paused; // will return true
```

## See also

- Web Speech API
