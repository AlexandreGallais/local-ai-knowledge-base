---
title: "HTMLElement: enterKeyHint property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/enterkeyhint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: enterKeyHint property

The **`enterKeyHint`** property is an enumerated property defining
what action label (or icon) to present for the enter key on virtual keyboards.
It reflects the `enterkeyhint`
HTML global attribute and is an enumerated property, only accepting the following values
as a string:

- `'enter'` typically indicating inserting a new line.
- `'done'` typically meaning there is nothing more to input and the input method editor (IME) will be closed.
- `'go'` typically meaning to take the user to the target of the text they typed.
- `'next'` typically taking the user to the next field that will accept text.
- `'previous'` typically taking the user to the previous field that will accept text.
- `'search'` typically taking the user to the results of searching for the text they have typed.
- `'send'` typically delivering the text to its target.

If no `enterKeyHint` value has been specified or if it was set to a different value than the allowed ones, it will return an empty string.

## Examples

Give a virtual keyboard a hint how to label the enter key (might render as `Send` and `Search`, depending on the OS or the user's language).

```js
const send = document.getElementById("sendInput");
const search = document.getElementById("searchInput");

send.enterKeyHint = "send";
search.enterKeyHint = "search";
```

## See also

- `enterkeyhint` HTML global attribute
