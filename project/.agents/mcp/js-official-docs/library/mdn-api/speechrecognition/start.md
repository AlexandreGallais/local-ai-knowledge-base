---
title: "SpeechRecognition: start() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: start() method

The **`start()`** method of the Web Speech API starts the speech recognition service to listen for incoming audio (from a microphone or an audio track) and returns the results of that recognition.

## Syntax

```js
start()
start(audioTrack)
```

### Parameters

- `audioTrack` (optional)
    A `MediaStreamTrack` instance to perform speech recognition on. If not specified, the service attempts to recognize audio from the user's microphone instead.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if an `audioTrack` is specified and one or both of the following are true:
    - The track's `kind` property is not `audio`.
    - The track's `readyState` property is not `live`.

## Examples

### Recognizing speech from a microphone

In our Speech color changer example, we create a new `SpeechRecognition` object instance using the `SpeechRecognition()` constructor. Later on, we create a `click` event handler on a `` so that when it's clicked, we start the speech recognition service and await audio input from the user's microphone:

```js
const recognition = new SpeechRecognition();

const diagnostic = document.querySelector(".output");
const bg = document.querySelector("html");
const startBtn = document.querySelector("button");

startBtn.onclick = () => {
  recognition.start();
  console.log("Ready to receive a color command.");
};
```

When a result has been successfully recognized, the `result` event fires. We extract the color that was spoken from the event object by grabbing the `transcript` of the first `SpeechRecognitionAlternative` of the first `SpeechRecognitionResult` in the returned `results` list. We then set the background color of the `<html>` element to that color.

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}`;
  bg.style.backgroundColor = color;
};
```

### Recognizing speech from an audio track

This code (excerpted from our audio track recognition demo) shows how to recognize speech from an audio track. To begin with, we create a new `SpeechRecognition` instance and set its `lang` to `en-US`. We then grab a reference to a `` element and a `` element to output results and diagnostic information.

```js
const recognition = new SpeechRecognition();
recognition.lang = "en-US";

const startBtn = document.querySelector("button");
const diagnostic = document.querySelector(".output");
```

Next, we add a `click` event handler to the ``. When it is clicked, we create a new `<audio>` element using the `Audio()` constructor and load an MP3 file into it. Once the MP3 is ready to play (determined by the `canplay` event), we capture it as a `MediaStream` using the `captureStream()` method, then extract its audio `MediaStreamTrack` using `getAudioTracks()`.

We then play the audio (required for the recognition to take place), and pass the `MediaStreamTrack` into the `start()` method to start the recognition.

```js
startBtn.addEventListener("click", () => {
  diagnostic.textContent = "";
  console.log("Loading audio track");
  const audioElement = new Audio("cheese-on-toast.mp3");
  audioElement.addEventListener("canplay", () => {
    const stream = audioElement.captureStream();
    const audioTrack = stream.getAudioTracks()[0];
    audioElement.play();
    recognition.start(audioTrack);
    console.log("Recognition started");
  });
});
```

To output the recognized audio, we listen for the `result` event. When that fires, we grab the `transcript` of the first `SpeechRecognitionAlternative` of the first `SpeechRecognitionResult` in the returned `results` list. We output the transcript itself to the output `` and log its confidence rating to the console.

```js
recognition.addEventListener("result", (event) => {
  const speech = event.results[0][0].transcript;
  diagnostic.textContent = `Speech recognized: ${speech}.`;
  console.log(`Confidence: ${event.results[0][0].confidence}`);
});
```

## See also

- Web Speech API
