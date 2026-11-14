---
title: "CharacterData: data property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: data property

The **`data`** property of the `CharacterData` interface represents the value of the current object's data.

## Value

A string with the character information contained in the `CharacterData` node.

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `cd.data = null` is equivalent to `cd.data = ""`.

## Example

> **Note:**
> `CharacterData` is an abstract interface.
> The examples below use two concrete interfaces implementing it, `Text` and `Comment`.

### Reading a comment using data

```html
<!-- This is an HTML comment -->
<output id="result"></output>
```

```js
const comment = document.body.childNodes[1];
const output = document.getElementById("result");

output.value = comment.data;
```

### Setting the content of a text node using data

```html
<span>Result: </span>Not set.
```

```js
const span = document.querySelector("span");
const textNode = span.nextSibling;

textNode.data = "This text has been set using 'textNode.data'.";
```

## See also

- `CharacterData.length` returning the length of the data contained in the `CharacterData` node.
