---
title: "Window: speechSynthesis property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/speechsynthesis/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: speechSynthesis property

The `speechSynthesis` read-only property of the Window object returns a `SpeechSynthesis` object, which is the entry point into using Web Speech API speech synthesis functionality.

## Value

A `SpeechSynthesis` object.

## Examples

In our basic <example-value> synthesizer demo, we first grab a reference to the SpeechSynthesis controller using `window.speechSynthesis`.
After defining some necessary variables, we retrieve a list of the voices available using `SpeechSynthesis.getVoices()` and populate a select menu with them so the user can choose what voice they want.

Inside the `inputForm.onsubmit` handler, we stop the form submitting with preventDefault(), create a new `SpeechSynthesisUtterance` instance containing the text from the text ``, set the utterance's voice to the voice selected in the `<select>` element, and start the utterance speaking via the `SpeechSynthesis.speak()` method.

```js
const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector("input");
const voiceSelect = document.querySelector("select");

function populateVoiceList() {
  voices = synth.getVoices();

  for (const voice of voices) {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.onsubmit = (event) => {
  event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");
  utterThis.voice = voices.find((v) => v.name === selectedOption);
  synth.speak(utterThis);
  inputTxt.blur();
};
```

## See also

- Web Speech API
