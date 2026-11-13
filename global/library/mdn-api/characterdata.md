---
title: "CharacterData"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData

The **`CharacterData`** abstract interface represents a `Node` object that contains characters. This is an abstract interface, meaning there aren't any objects of type `CharacterData`: it is implemented by other interfaces like `Text`, `Comment`, `CDATASection`, or `ProcessingInstruction`, which aren't abstract.

## Instance properties

_This interface also inherits properties from its parents, `Node` and `EventTarget`._

- `CharacterData.data`
    A string representing the textual data contained in this object.
- `CharacterData.length` (read-only)
    Returns a number representing the size of the string contained in the object.
- `CharacterData.nextElementSibling` (read-only)
    Returns the first `Element` that _follows_ this node, and is a sibling.
- `CharacterData.previousElementSibling` (read-only)
    Returns the first `Element` that _precedes_ this node, and is a sibling.

## Instance methods

_This interface also inherits methods from its parents, `Node` and `EventTarget`._

- `CharacterData.after()`
    Inserts a set of `Node` objects or strings in the children list of the
    `CharacterData`'s parent, just after the `CharacterData` object.
- `CharacterData.appendData()`
    Appends the given string to the `CharacterData.data` string; when this method returns, `data` contains the concatenated string.
- `CharacterData.before()`
    Inserts a set of `Node` objects or strings in the children list of the
    `CharacterData`'s parent, just before the `CharacterData` object.
- `CharacterData.deleteData()`
    Removes the specified number of characters, starting at the specified offset, from the `CharacterData.data` string; when this method returns, `data` contains the shortened string.
- `CharacterData.insertData()`
    Inserts the specified characters, at the specified offset, in the `CharacterData.data` string; when this method returns, `data` contains the modified string.
- `CharacterData.remove()`
    Removes the object from its parent children list.
- `CharacterData.replaceData()`
    Replaces the specified number of characters, starting at the specified offset, with the specified string; when this method returns, `data` contains the modified string.
- `CharacterData.replaceWith()`
    Replaces the characters in the children list of its parent with a set of `Node` objects or strings.
- `CharacterData.substringData()`
    Returns a string containing the part of `CharacterData.data` of the specified length and starting at the specified offset.

## See also

- The DOM overview page.
- The concrete interfaces implemented it: `Text`, `CDATASection`, `ProcessingInstruction`, and `Comment`.
