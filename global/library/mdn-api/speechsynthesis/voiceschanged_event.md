---
title: "SpeechSynthesis: voiceschanged event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesis/voiceschanged_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesis: voiceschanged event

The **`voiceschanged`** event of the Web Speech API is fired when the list of `SpeechSynthesisVoice` objects that would be returned by the `SpeechSynthesis.getVoices()` method has changed (when the `voiceschanged` event fires.)

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("voiceschanged", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onvoiceschanged = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

This could be used to repopulate a list of voices that the user can choose between when the event fires. You can use the `voiceschanged` event in an `addEventListener` method:

```js
const synth = window.speechSynthesis;

synth.addEventListener("voiceschanged", () => {
  const voices = synth.getVoices();
  for (const voice of voices) {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  }
});
```

Or use the `onvoiceschanged` event handler property (but note that this replaces other event listeners added using `onvoiceschanged`, if any):

```js
const synth = window.speechSynthesis;
synth.onvoiceschanged = () => {
  const voices = synth.getVoices();
  for (const voice of voices) {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  }
};
```

## See also

- Web Speech API
