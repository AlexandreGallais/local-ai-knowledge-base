---
title: "Using the Web Speech API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_speech_api/using_the_web_speech_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Web Speech API (part 3 of 3)

## Speech synthesis

Speech synthesis (aka text-to-speech, or TTS) involves receiving synthesizing text contained within an app to speech, and playing it out of a device's speaker or audio output connection.

The Web Speech API has a main controller interface for this — `SpeechSynthesis` — plus a number of closely-related interfaces for representing text to be synthesized (known as utterances), voices to be used for the utterance, etc. Again, most OSes have some kind of speech synthesis system, which will be used by the API for this task as available.

### Demo

To demonstrate how to use web speech synthesis, we've created a sample app called Speech synthesizer. It has an input field for entering the text to be synthesized. You can adjust the rate and pitch and also select a voice from the dropdown menu to use for the spoken text. After you've entered your text, press `Enter`/`Return` or click the **Play** button to hear the text read aloud.

To run the demo, navigate to the live demo URL in a supporting browser.

### HTML and CSS

The HTML and CSS for this app are pretty basic. There's a title, some instructions for use, and a form with some basic controls. The `<select>` element is initially empty; it is populated with `<option>`s via JavaScript (covered later).

```html
<h1>Speech synthesizer</h1>

<p>
  Enter some text in the input below and press return to hear it. Change voices
  using the dropdown menu.
</p>

<form>
  <input type="text" class="txt" />
  <div>
    <label for="rate">Rate</label
    ><input type="range" min="0.5" max="2" value="1" step="0.1" id="rate" />
    <div class="rate-value">1</div>
    <div class="clearfix"></div>
  </div>
  <div>
    <label for="pitch">Pitch</label
    ><input type="range" min="0" max="2" value="1" step="0.1" id="pitch" />
    <div class="pitch-value">1</div>
    <div class="clearfix"></div>
  </div>
  <select></select>
</form>
```

### JavaScript

Let's investigate the JavaScript that powers this app.

#### Setting variables

First of all, we capture references to all the DOM elements involved in the UI, but more interestingly, we capture a reference to `Window.speechSynthesis`. This is API's entry point — it returns an instance of `SpeechSynthesis`, the controller interface for web speech synthesis.

```js
const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");

const voices = [];
```

#### Populating the select element

To populate the `<select>` element with the different voice options the device has available, we've written a `populateVoiceList()` function. We first invoke `SpeechSynthesis.getVoices()`, which returns a list of all the available voices, represented by `SpeechSynthesisVoice` objects. We then loop through this list — for each voice we create an `<option>` element, set its text content to display the name of the voice (grabbed from `SpeechSynthesisVoice.name`), the language of the voice (grabbed from `SpeechSynthesisVoice.lang`), and `-- DEFAULT` if the voice is the default voice for the synthesis engine (checked by seeing if `SpeechSynthesisVoice.default` returns `true`.)

We also create `data-` attributes for each option, containing the name and language of the associated voice, so we can grab them easily later on, and then append the options as children of the select.

```js
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
```

Older browser don't support the `voiceschanged` event, and just return a list of voices when `SpeechSynthesis.getVoices()` is fired.
While on others, such as Chrome, you have to wait for the event to fire before populating the list.
To allow for both cases, we run the function as shown below:

```js
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
```

#### Speaking the entered text

Next, we create an event handler to start speaking the text entered into the text field. We are using an onsubmit handler on the form so that the action happens when `Enter`/`Return` is pressed. We first create a new `SpeechSynthesisUtterance()` instance using its constructor — this is passed the text input's value as a parameter.

Next, we need to figure out which voice to use. We use the `HTMLSelectElement` `selectedOptions` property to return the currently selected `<option>` element. We then use this element's `data-name` attribute, finding the `SpeechSynthesisVoice` object whose name matches this attribute's value. We set the matching voice object to be the value of the `SpeechSynthesisUtterance.voice` property.

Finally, we set the `SpeechSynthesisUtterance.pitch` and `SpeechSynthesisUtterance.rate` to the values of the relevant range form elements. Then, with all necessary preparations made, we start the utterance being spoken by invoking `SpeechSynthesis.speak()`, passing it the `SpeechSynthesisUtterance` instance as a parameter.

```js
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

In the final part of the handler, we include a `pause` event to demonstrate how `SpeechSynthesisEvent` can be put to good use. When `SpeechSynthesis.pause()` is invoked, this returns a message reporting the character number and name that the speech was paused at.

Finally, we call `blur()` on the text input. This is mainly to hide the keyboard on Firefox OS.

#### Updating the displayed pitch and rate values

The last part of the code updates the `pitch`/`rate` values displayed in the UI, each time the slider positions are moved.

```js
pitch.onchange = () => {
  pitchValue.textContent = pitch.value;
};

rate.onchange = () => {
  rateValue.textContent = rate.value;
};
```
