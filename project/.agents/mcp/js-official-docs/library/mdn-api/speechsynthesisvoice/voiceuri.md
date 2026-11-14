---
title: "SpeechSynthesisVoice: voiceURI property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisvoice/voiceuri/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisVoice: voiceURI property

The **`voiceURI`** read-only property of the
`SpeechSynthesisVoice` interface returns the type of URI and location of
the speech synthesis service for this voice.

## Value

A string representing the URI of the voice. This is a generic URI and
can point to local or remote services, e.g., it could be a proprietary system URN or a URL to a remote service.

## Examples

```js
for (const voice of voices) {
  const option = document.createElement("option");
  option.textContent = `${voice.name} (${voice.lang})`;

  if (voice.default) {
    option.textContent += " — DEFAULT";
  }

  console.log(voice.voiceURI);
  // On Mac, this returns URNs, for example 'urn:moz-tts:osx:com.apple.speech.synthesis.voice.daniel'

  option.setAttribute("data-lang", voice.lang);
  option.setAttribute("data-name", voice.name);
  voiceSelect.appendChild(option);
}
```

## See also

- Web Speech API
