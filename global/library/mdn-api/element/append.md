---
title: "Element: append() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/append/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: append() method

The **`Element.append()`** method
inserts a set of `Node` objects or strings after
the last child of the `Element`. Strings
are inserted as equivalent `Text` nodes.

Differences from `Node.appendChild()`:

- `Element.append()` allows you to also append strings, whereas `Node.appendChild()` only accepts `Node`
  objects.
- `Element.append()` has no return value, whereas
  `Node.appendChild()` returns the appended `Node` object.
- `Element.append()` can append several nodes and strings, whereas
  `Node.appendChild()` can only append one node.

## Syntax

```js
append(param1)
append(param1, param2)
append(param1, param2, /* …, */ paramN)
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

### Appending an element

```js
let div = document.createElement("div");
let p = document.createElement("p");
div.append(p);

console.log(div.childNodes); // NodeList [ <p> ]
```

### Appending text

```js
let div = document.createElement("div");
div.append("Some text");

console.log(div.textContent); // "Some text"
```

### Appending an element and text

```js
let div = document.createElement("div");
let p = document.createElement("p");
div.append("Some text", p);

console.log(div.childNodes); // NodeList [ #text "Some text", <p> ]
```

### The append method is unscopable

The `append()` method is not scoped into the `with` statement.
See `Symbol.unscopables` for more information.

```js
let div = document.createElement("div");

with (div) {
  append("foo");
}
// ReferenceError: append is not defined
```

## See also

- `Element.prepend()`
- `Node.appendChild()`
- `Element.after()`
- `Element.insertAdjacentElement()`
- `NodeList`
