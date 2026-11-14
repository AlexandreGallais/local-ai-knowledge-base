---
title: "CharacterData: after() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/after/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: after() method

The **`after()`** method of the `CharacterData` interface inserts a set of `Node` objects or strings in the children list of the `CharacterData`'s parent, just after the `CharacterData`. Strings are inserted as equivalent `Text` nodes. Nothing happens if `parentNode` is `null`.

## Syntax

```js
after(param1)
after(param1, param2)
after(param1, param2, /* …, */ paramN)
```

### Parameters

- `param1`, …, `paramN`
    A set of `Node` objects or strings to insert.

### Return value

None (`undefined`).

### Exceptions

- `HierarchyRequestError` `DOMException`
    Thrown when the new nodes cannot be inserted at the specified point in the hierarchy,
    that is if one of the following conditions is met:
    - If the insertion of one of the added node would lead to a cycle, that is if one of them is an ancestor of this `CharacterData` node.
    - If one of the added node is not a `DocumentFragment`, a `DocumentType`, an `Element`, or a `CharacterData`.
    - If this `CharacterData` node is actually a `Text` node, and its parent is a `Document`.
    - If the parent of this `CharacterData` node is a `Document` and one of the nodes to insert is a `DocumentFragment` with more than one `Element` child, or that has a `Text` child.

## Examples

The `after()` method allows you to insert new nodes after a `CharacterData` node.

```js
const h1TextNode = document.querySelector("h1").firstChild;
h1TextNode.after(" #h1");

h1TextNode.parentElement.childNodes;
// NodeList [#text "CharacterData.after()", #text " #h1"]

h1TextNode.data;
// "CharacterData.after()"
```

> **Note:**
> If you rather want to append text to the current node,
> the `appendData()` method lets you append to the current node's data.

## See also

- `CharacterData.appendData()`
- `CharacterData.before()`
- `DocumentType.after()`
- `Element.after()`
- `Element.append()`
- `Node.appendChild()`
- `Element.insertAdjacentElement()`
