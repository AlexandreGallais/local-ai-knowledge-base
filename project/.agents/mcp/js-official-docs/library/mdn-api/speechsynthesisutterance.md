---
title: "SpeechSynthesisUtterance"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance

The **`SpeechSynthesisUtterance`** interface of the Web Speech API represents a speech request.
It contains the content the speech service should read and information about how to read it (e.g., language, pitch and volume.)

## Constructor

- `SpeechSynthesisUtterance()`
    Returns a new `SpeechSynthesisUtterance` object instance.

## Instance properties

_`SpeechSynthesisUtterance` also inherits properties from its parent interface, `EventTarget`._

- `SpeechSynthesisUtterance.lang`
    Gets and sets the language of the utterance.
- `SpeechSynthesisUtterance.pitch`
    Gets and sets the pitch at which the utterance will be spoken at.
- `SpeechSynthesisUtterance.rate`
    Gets and sets the speed at which the utterance will be spoken at.
- `SpeechSynthesisUtterance.text`
    Gets and sets the text that will be synthesized when the utterance is spoken.
- `SpeechSynthesisUtterance.voice`
    Gets and sets the voice that will be used to speak the utterance.
- `SpeechSynthesisUtterance.volume`
    Gets and sets the volume that the utterance will be spoken at.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `boundary`
    Fired when the spoken utterance reaches a word or sentence boundary.
    Also available via the `onboundary` property.
- `end`
    Fired when the utterance has finished being spoken.
    Also available via the `onend` property.
- `error`
    Fired when an error occurs that prevents the utterance from being successfully spoken.
    Also available via the `onerror` property
- `mark`
    Fired when the spoken utterance reaches a named SSML "mark" tag.
    Also available via the `onmark` property.
- `pause`
    Fired when the utterance is paused part way through.
    Also available via the `onpause` property.
- `resume`
    Fired when a paused utterance is resumed.
    Also available via the `onresume` property.
- `start`
    Fired when the utterance has begun to be spoken.
    Also available via the `onstart` property.

## Examples

In our basic <example-value> synthesizer demo, we first grab a reference to the SpeechSynthesis controller using `window.speechSynthesis`.
After defining some necessary variables, we retrieve a list of the voices available using `SpeechSynthesis.getVoices()` and populate a select menu with them so the user can choose what voice they want.

Inside the `inputForm.onsubmit` handler, we stop the form submitting with `preventDefault()`, use the `constructor` to create a new utterance instance containing the text from the text ``, set the utterance's `voice` to the voice selected in the `<select>` element, and start the utterance speaking via the `SpeechSynthesis.speak()` method.

```js
const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector("input");
const voiceSelect = document.querySelector("select");

let voices;

function loadVoices() {
  voices = synth.getVoices();
  for (const [i, voice] of voices.entries()) {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = i;
    voiceSelect.appendChild(option);
  }
}

// in Google Chrome the voices are not ready on page load
if ("onvoiceschanged" in synth) {
  synth.onvoiceschanged = loadVoices;
} else {
  loadVoices();
}

inputForm.onsubmit = (event) => {
  event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  utterThis.voice = voices[voiceSelect.value];
  synth.speak(utterThis);
  inputTxt.blur();
};
```

## See also

- Web Speech API
