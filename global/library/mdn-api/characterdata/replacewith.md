---
title: "CharacterData: replaceWith() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/replacewith/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: replaceWith() method

The **`replaceWith()`** method of the `CharacterData` interface replaces this `CharacterData` in the children list of its parent with a set of `Node` objects or strings. Strings are inserted as equivalent `Text` nodes. Nothing happens if `parentNode` is `null`.

## Syntax

```js
replaceWith(param1)
replaceWith(param1, param2)
replaceWith(param1, param2, /* …, */ paramN)
```

### Parameters

- `param1`, …, `paramN`
    A set of `Node` objects or strings to insert.

### Return value

None (`undefined`).

### Exceptions

- `HierarchyRequestError` `DOMException`
    Thrown when the node cannot be inserted at the specified point in the hierarchy.

## Examples

```html
<p id="myText">Some text</p>
```

```js
const text = document.getElementById("myText").firstChild;
const em = document.createElement("em");
em.textContent = "Italic text";

text.replaceWith(em); // Replace `Some text` by `Italic text`
```

## See also

- `CharacterData.replaceData()`
- `DocumentType.replaceWith()`
- `Element.replaceWith()`
