---
title: "SpeechRecognition: abort() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/abort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: abort() method

The **`abort()`** method of the Web Speech API stops the speech
recognition service from listening to incoming audio, and doesn't attempt to return a
`SpeechRecognitionResult`.

## Syntax

```js
abort()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const recognition = new SpeechRecognition();

const diagnostic = document.querySelector(".output");
const bg = document.querySelector("html");
const startBtn = document.querySelector(".start");
const abortBtn = document.querySelector(".abort");

startBtn.onclick = () => {
  recognition.start();
  console.log("Ready to receive a color command.");
};

abortBtn.onclick = () => {
  recognition.abort();
  console.log("Speech recognition aborted.");
};

recognition.onspeechend = () => {
  recognition.stop();
  console.log("Speech recognition has stopped.");
};
```

## See also

- Web Speech API
