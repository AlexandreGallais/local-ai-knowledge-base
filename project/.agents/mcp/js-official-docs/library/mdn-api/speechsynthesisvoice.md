---
title: "SpeechSynthesisVoice"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisvoice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisVoice

The **`SpeechSynthesisVoice`** interface of the Web Speech API represents a voice that the system supports.
Every `SpeechSynthesisVoice` has its own relative speech service including information about language, name and URI.

## Instance properties

- `SpeechSynthesisVoice.default` (read-only)
    A boolean value indicating whether the voice is the default voice for the current app language (`true`), or not (`false`.)
- `SpeechSynthesisVoice.lang` (read-only)
    Returns a BCP 47 language tag indicating the language of the voice.
- `SpeechSynthesisVoice.localService` (read-only)
    A boolean value indicating whether the voice is supplied by a local speech synthesizer service (`true`), or a remote speech synthesizer service (`false`.)
- `SpeechSynthesisVoice.name` (read-only)
    Returns a human-readable name that represents the voice.
- `SpeechSynthesisVoice.voiceURI` (read-only)
    Returns the type of URI and location of the speech synthesis service for this voice.

## Examples

The following snippet is excerpted from our Speech synthesizer demo.

```js
const synth = window.speechSynthesis;
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
  for (const voice of voices) {
    if (voice.name === selectedOption) {
      utterThis.voice = voice;
    }
  }
  utterThis.pitch = pitch.value;
  utterThis.rate = rate.value;
  synth.speak(utterThis);

  utterThis.onpause = (event) => {
    const char = event.utterance.text.charAt(event.charIndex);
    console.log(
      `Speech paused at character ${event.charIndex} of "${event.utterance.text}", which is "${char}".`,
    );
  };

  inputTxt.blur();
};
```

## See also

- Web Speech API
