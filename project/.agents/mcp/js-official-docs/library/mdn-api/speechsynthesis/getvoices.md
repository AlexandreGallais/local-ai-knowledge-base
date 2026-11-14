---
title: "SpeechSynthesis: getVoices() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesis/getvoices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesis: getVoices() method

The **`getVoices()`** method of the
`SpeechSynthesis` interface returns a list of
`SpeechSynthesisVoice` objects representing all the available voices on the
current device.

## Syntax

```js
getVoices()
```

### Parameters

None.

### Return value

A list (array) of `SpeechSynthesisVoice` objects.

## Examples

### HTML

```html
<select id="voiceSelect"></select>
```

### JavaScript

```js
function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  const voices = speechSynthesis.getVoices();

  for (const voice of voices) {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
```

## See also

- Web Speech API
