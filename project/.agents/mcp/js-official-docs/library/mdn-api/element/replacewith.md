---
title: "Element: replaceWith() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/replacewith/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: replaceWith() method

The **`replaceWith()`** method of the `Element` interface replaces this `Element` in the children list of its parent with a set of `Node` objects or strings. Strings are inserted as equivalent `Text` nodes. Nothing happens if `parentNode` is `null`.

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

### Using `replaceWith()`

```js
const div = document.createElement("div");
const p = document.createElement("p");
div.appendChild(p);
const span = document.createElement("span");

p.replaceWith(span);

console.log(div.outerHTML);
// "<div><span></span></div>"
```

### `replaceWith()` is unscopable

The `replaceWith()` method is not scoped into the `with`
statement. See `Symbol.unscopables` for more information.

```js
with (node) {
  replaceWith("foo");
}
// ReferenceError: replaceWith is not defined
```

## See also

- `Node.replaceChild()`
- `NodeList`
- `CharacterData.replaceWith()`
- `DocumentType.replaceWith()`
