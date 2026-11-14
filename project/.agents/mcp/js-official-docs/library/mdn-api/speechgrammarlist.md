---
title: "SpeechGrammarList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechgrammarlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechGrammarList

The **`SpeechGrammarList`** interface of the Web Speech API represents a list of `SpeechGrammar` objects containing words or patterns of words that we want the recognition service to recognize.

Grammar is defined using JSpeech Grammar Format (**JSGF**).

> **Note:**
> The concept of grammar has been removed from the Web Speech API. Related features remain in the specification and are still recognized by supporting browsers for backwards compatibility, but they have no effect on speech recognition services.

## Constructor

- `SpeechGrammarList()` (deprecated)
    Creates a new `SpeechGrammarList` object.

## Instance properties

- `SpeechGrammarList.length` (read-only) (deprecated)
    Returns the number of `SpeechGrammar` objects contained in the `SpeechGrammarList`.

## Instance methods

- `SpeechGrammarList.item()` (deprecated)
    Standard getter — allows individual `SpeechGrammar` objects to be retrieved from the `SpeechGrammarList` using array syntax.
- `SpeechGrammarList.addFromURI()` (deprecated)
    Takes a grammar present at a specific URI and adds it to the `SpeechGrammarList` as a new `SpeechGrammar` object.
- `SpeechGrammarList.addFromString()` (deprecated)
    Adds a grammar in a string to the `SpeechGrammarList` as a new `SpeechGrammar` object.

## Examples

```js
const grammar =
  "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
```

## See also

- Web Speech API
