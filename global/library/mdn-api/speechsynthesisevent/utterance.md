---
title: "SpeechSynthesisEvent: utterance property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisevent/utterance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisEvent: utterance property

The **`utterance`** read-only property of the `SpeechSynthesisUtterance` interface returns the `SpeechSynthesisUtterance` instance that the event was triggered on.

## Value

A `SpeechSynthesisUtterance` object.

## Examples

```js
utterThis.onpause = (event) => {
  const char = event.utterance.text.charAt(event.charIndex);
  console.log(
    `Speech paused at character ${event.charIndex} of "${event.utterance.text}", which is "${char}".`,
  );
};
```

## See also

- Web Speech API
