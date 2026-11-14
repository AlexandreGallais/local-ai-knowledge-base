---
title: "SpeechSynthesisUtterance: pitch property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/pitch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: pitch property

The **`pitch`** property of the `SpeechSynthesisUtterance` interface gets and sets the pitch at which the utterance will be spoken at.

If unset, a default value of 1 will be used.

## Value

A float representing the pitch value.
It can range between 0 (lowest) and 2 (highest), with 1 being the default pitch for the current platform or voice. Some speech synthesis engines or voices may constrain the minimum and maximum rates further.
If SSML is used, this value will be overridden by prosody tags in the markup.

## Examples

```js
const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector("input");
const voiceSelect = document.querySelector("select");

const voices = synth.getVoices();

// …

inputForm.onsubmit = (event) => {
  event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (const voice of voices) {
    if (voice.name === selectedOption) {
      utterThis.voice = voice;
    }
  }
  utterThis.pitch = 1.5;
  synth.speak(utterThis);
  inputTxt.blur();
};
```

## See also

- Web Speech API
