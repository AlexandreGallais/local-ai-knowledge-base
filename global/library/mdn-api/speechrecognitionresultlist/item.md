---
title: "SpeechRecognitionResultList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionresultlist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionResultList: item() method

The **`item`** getter of the
`SpeechRecognitionResultList` interface is a standard getter — it allows
`SpeechRecognitionResult` objects in the list to be accessed via array
syntax.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    Index of the item to retrieve.

### Return value

A `SpeechRecognitionResult` object.

## Examples

This code is excerpted from our
Speech color changer example.

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
};
```

## See also

- Web Speech API
