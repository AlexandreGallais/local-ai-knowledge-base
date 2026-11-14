---
title: "CharacterData: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: length property

The read-only **`CharacterData.length`** property
returns the number of characters in the contained data, as a positive integer.

## Value

A positive integer with the length of the `CharacterData.data` string.

## Example

> **Note:**
> `CharacterData` is an abstract interface.
> The examples below use `Text`, a concrete interface implementing it.

```html
Length of the string in the <code>Text</code> node: <output></output>
```

```js
const output = document.querySelector("output");
const textNode = new Text("This text has been set using 'textNode.data'.");

output.value = textNode.length;
```
