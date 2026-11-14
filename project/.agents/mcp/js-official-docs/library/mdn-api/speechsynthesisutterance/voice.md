---
title: "SpeechSynthesisUtterance: voice property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/voice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: voice property

The **`voice`** property of the `SpeechSynthesisUtterance` interface gets and sets the voice that will be used to speak the utterance.

This should be set to one of the `SpeechSynthesisVoice` objects returned by `SpeechSynthesis.getVoices()`.
If not set by the time the utterance is spoken, the voice used will be the most suitable default voice available for the utterance's `lang` setting.

## Value

A `SpeechSynthesisVoice` object.

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
  synth.speak(utterThis);
  inputTxt.blur();
};
```

## See also

- Web Speech API
