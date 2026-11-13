---
title: "SpeechRecognition"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition

The **`SpeechRecognition`** interface of the Web Speech API is the controller interface for the recognition service; this also handles the `SpeechRecognitionEvent` sent from the recognition service.

> **Note:**
> On some browsers, like Chrome, using Speech Recognition on a web page involves a server-based recognition engine. Your audio is sent to a web service for recognition processing, so it won't work offline.

## Constructor

- `SpeechRecognition()`
    Creates a new `SpeechRecognition` object.

## Instance properties

_`SpeechRecognition` also inherits properties from its parent interface, `EventTarget`._

- `SpeechRecognition.lang`
    Returns and sets the language of the current `SpeechRecognition`. If not specified, this defaults to the HTML `lang` attribute value, or the user agent's language setting if that isn't set either.
- `SpeechRecognition.continuous`
    Controls whether continuous results are returned for each recognition, or only a single result. Defaults to single (`false`.)
- `SpeechRecognition.interimResults`
    Controls whether interim results should be returned (`true`) or not (`false`.) Interim results are results that are not yet final (e.g., the `SpeechRecognitionResult.isFinal` property is `false`.)
- `SpeechRecognition.maxAlternatives`
    Sets the maximum number of `SpeechRecognitionAlternative`s provided per result. The default value is 1.
- `SpeechRecognition.phrases`
    Sets an array of `SpeechRecognitionPhrase` objects to be used for contextual biasing.
- `SpeechRecognition.processLocally`
    Specifies whether speech recognition must be performed locally on the user's device.
- `SpeechRecognition.unspokenPunctuation`
    Specifies whether the speech recognition engine will infer and insert punctuation marks based on the user's natural speech patterns.

### Deprecated properties

The concept of grammar has been removed from the Web Speech API. Related features remain in the specification and are still recognized by supporting browsers for backwards compatibility, but they have no effect on speech recognition services.

- `SpeechRecognition.grammars`
    Returns and sets a collection of `SpeechGrammar` objects that represent the grammars understood by the current `SpeechRecognition`.

## Static methods

- `SpeechRecognition.available()`
    Checks whether the specified languages are available for speech recognition.
- `SpeechRecognition.install()`
    Installs the required language packs for on-device speech recognition in the specified languages.

## Instance methods

_`SpeechRecognition` also inherits methods from its parent interface, `EventTarget`._

- `SpeechRecognition.abort()`
    Stops the speech recognition service from listening to incoming audio, and doesn't attempt to return a `SpeechRecognitionResult`.
- `SpeechRecognition.start()`
    Starts the speech recognition service to listen for incoming audio (from a microphone or an audio track) and returns the results of that recognition.
- `SpeechRecognition.stop()`
    Stops the speech recognition service from listening for incoming audio and attempts to return a `SpeechRecognitionResult` based on the results captured so far.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `audiostart`
    Fired when the user agent has started to capture audio.
- `audioend`
    Fired when the user agent has finished capturing audio.
- `end`
    Fired when the speech recognition service has disconnected.
- `error`
    Fired when a speech recognition error occurs.
- `nomatch`
    Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the `confidence` threshold.
- `result`
    Fired when the speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app.
- `soundstart`
    Fired when any sound — recognizable speech or not — has been detected.
- `soundend`
    Fired when any sound — recognizable speech or not — has stopped being detected.
- `speechstart`
    Fired when sound that is recognized by the speech recognition service as speech has been detected.
- `speechend`
    Fired when speech recognized by the speech recognition service has stopped being detected.
- `start`
    Fired when the speech recognition service begins listening for audio to recognize.

## Examples

In our Speech color changer example, we create a new `SpeechRecognition` object instance using the `SpeechRecognition()` constructor.

After some other values have been defined, we then set it so that the recognition service starts when a button is clicked (see `SpeechRecognition.start()`). When a result has been successfully recognized, the `result` event fires, we extract the color that was spoken from the event object, and then set the background color of the `<html>` element to that color.

```js
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector(".output");
const bg = document.querySelector("html");
const startBtn = document.querySelector("button");

startBtn.onclick = () => {
  recognition.start();
  console.log("Ready to receive a color command.");
};

recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}`;
  bg.style.backgroundColor = color;
};
```

## See also

- Web Speech API
