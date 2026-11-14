---
title: "Element: prepend() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/prepend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: prepend() method

The **`Element.prepend()`** method inserts a set of
`Node` objects or strings before the first child
of the `Element`. Strings are inserted as
equivalent `Text` nodes.

## Syntax

```js
prepend(param1)
prepend(param1, param2)
prepend(param1, param2, /* …, */ paramN)
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

### Prepending an element

```js
let div = document.createElement("div");
let p = document.createElement("p");
let span = document.createElement("span");
div.append(p);
div.prepend(span);

console.log(div.childNodes); // NodeList [ <span>, <p> ]
```

### Prepending text

```js
let div = document.createElement("div");
div.append("Some text");
div.prepend("Headline: ");

console.log(div.textContent); // "Headline: Some text"
```

### Prepending an element and text

```js
let div = document.createElement("div");
let p = document.createElement("p");
div.prepend("Some text", p);

console.log(div.childNodes); // NodeList [ #text "Some text", <p> ]
```

### The prepend method is unscopable

The `prepend()` method is not scoped into the `with` statement.
See `Symbol.unscopables` for more information.

```js
let div = document.createElement("div");

with (div) {
  prepend("foo");
}
// ReferenceError: prepend is not defined
```

## See also

- `Element.append()`
- `Node.appendChild()`
- `Node.insertBefore()`
- `Element.before()`
- `Element.insertAdjacentElement()`
- `NodeList`
