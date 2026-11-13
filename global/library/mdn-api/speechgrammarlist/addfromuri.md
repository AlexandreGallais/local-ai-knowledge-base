---
title: "SpeechGrammarList: addFromURI() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechgrammarlist/addfromuri/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechGrammarList: addFromURI() method

The **`addFromURI()`** method of the
`SpeechGrammarList` interface takes a grammar present at a specific URI and
adds it to the `SpeechGrammarList` as a new `SpeechGrammar`
object.

Note that some speech recognition services may support built-in grammars that can be
specified by URI.

## Syntax

```js
addFromURI(src)
addFromURI(src, weight)
```

### Parameters

- `src`
    A string representing the URI of the grammar to be added.
- `weight` (optional)
    A float representing the weight of the grammar relative to other grammars present in
    the `SpeechGrammarList`. The weight means the importance of this grammar,
    or the likelihood that it will be recognized by the speech recognition service. The
    value can be between `0.0` and `1.0`; If not specified, the
    default used is `1.0`.

### Return value

None (`undefined`).

## See also

- Web Speech API
