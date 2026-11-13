---
title: "Element: after() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/after/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: after() method

The **`after()`** method of the `Element` interface inserts a set of `Node` objects or strings in the children list of the `Element`'s parent, just after the `Element`. Strings are inserted as equivalent `Text` nodes. Nothing happens if `parentNode` is `null`.

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
    Thrown when the node cannot be inserted at the specified point in the hierarchy.

## Examples

### Inserting an element

```js
let container = document.createElement("div");
let p = document.createElement("p");
container.appendChild(p);
let span = document.createElement("span");

p.after(span);

console.log(container.outerHTML);
// "<div><p></p><span></span></div>"
```

### Inserting text

```js
const container = document.createElement("div");
const p = document.createElement("p");
container.appendChild(p);

p.after("Text");

console.log(container.outerHTML);
// "<div><p></p>Text</div>"
```

### Inserting an element and text

```js
const container = document.createElement("div");
const p = document.createElement("p");
container.appendChild(p);
const span = document.createElement("span");

p.after(span, "Text");

console.log(container.outerHTML);
// "<div><p></p><span></span>Text</div>"
```

## See also

- `Element.before()`
- `Element.append()`
- `Element.insertAdjacentElement()`
- `CharacterData.after()`
- `DocumentType.after()`
- `Node.appendChild()`
- `NodeList`
