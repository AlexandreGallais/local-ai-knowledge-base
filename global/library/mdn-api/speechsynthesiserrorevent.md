---
title: "SpeechSynthesisErrorEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesiserrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisErrorEvent

The **`SpeechSynthesisErrorEvent`** interface of the Web Speech API contains information about any errors that occur while processing `SpeechSynthesisUtterance` objects in the speech service.

## Constructor

- `SpeechSynthesisErrorEvent()`
    Creates a new `SpeechSynthesisErrorEvent`.

## Instance properties

_`SpeechSynthesisErrorEvent` extends the `SpeechSynthesisEvent` interface, which inherits properties from its parent interface, `Event`._

- `SpeechSynthesisErrorEvent.error` (read-only)
    Returns an error code indicating what has gone wrong with a speech synthesis attempt.

## Instance methods

_`SpeechSynthesisErrorEvent` extends the `SpeechSynthesisEvent` interface, which inherits methods from its parent interface, `Event`._

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

  utterThis.onerror = (event) => {
    console.log(
      `An error has occurred with the speech synthesis: ${event.error}`,
    );
  };

  inputTxt.blur();
};
```

## See also

- Web Speech API
