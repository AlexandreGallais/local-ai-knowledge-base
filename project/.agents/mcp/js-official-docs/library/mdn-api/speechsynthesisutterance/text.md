---
title: "SpeechSynthesisUtterance: text property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: text property

The **`text`** property of the
`SpeechSynthesisUtterance` interface gets and sets the text that will be synthesized when the utterance is spoken.

The text may be provided as plain text, or a well-formed SSML document.
The SSML tags will be stripped away by devices that don't support SSML.

## Value

A string representing the text to the synthesized.
The maximum length of the text that can be spoken in each utterance is 32,767 characters.

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
  console.log(utterThis.text);
  synth.speak(utterThis);
  inputTxt.blur();
};
```

## See also

- Web Speech API
