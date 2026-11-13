---
title: "SpeechSynthesisUtterance: SpeechSynthesisUtterance() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/speechsynthesisutterance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: SpeechSynthesisUtterance() constructor

The `SpeechSynthesisUtterance()` constructor of the `SpeechSynthesisUtterance` interface returns a new `SpeechSynthesisUtterance` object instance.

## Syntax

```js
new SpeechSynthesisUtterance(text)
```

### Parameters

- `text`
    A string containing the text that will be synthesized when the utterance is spoken.

## Examples

The following snippet is excerpted from our Speech synthesizer demo.

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
