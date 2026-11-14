---
title: "SpeechSynthesis: speak() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesis/speak/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesis: speak() method

The **`speak()`** method of the `SpeechSynthesis`
interface adds an `utterance` to the utterance
queue; it will be spoken when any other utterances queued before it have been spoken.

## Syntax

```js
speak(utterance)
```

### Parameters

- `utterance`
    A `SpeechSynthesisUtterance` object.

### Return value

None (`undefined`).

## Examples

This snippet is excerpted from our Speech synthesizer demo (see it live). When a form containing the text we want to speak is submitted,
we (among other things) create a new utterance containing this text, then speak it by
passing it into `speak()` as a parameter.

```js
const synth = window.speechSynthesis;

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
