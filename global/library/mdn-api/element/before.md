---
title: "Element: before() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/before/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: before() method

The **`before()`** method of the `Element` interface inserts a set of `Node` objects or strings in the children list of this `Element`'s parent, just before this `Element`. Strings are inserted as equivalent `Text` nodes. Nothing happens if `parentNode` is `null`.

## Syntax

```js
before(param1)
before(param1, param2)
before(param1, param2, /* …, */ paramN)
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
const container = document.createElement("div");
const p = document.createElement("p");
container.appendChild(p);
const span = document.createElement("span");

p.before(span);

console.log(container.outerHTML);
// "<div><span></span><p></p></div>"
```

### Inserting text

```js
const container = document.createElement("div");
const p = document.createElement("p");
container.appendChild(p);

p.before("Text");

console.log(container.outerHTML);
// "<div>Text<p></p></div>"
```

### Inserting an element and text

```js
const container = document.createElement("div");
const p = document.createElement("p");
container.appendChild(p);
const span = document.createElement("span");

p.before(span, "Text");

console.log(container.outerHTML);
// "<div><span></span>Text<p></p></div>"
```

## See also

- `Element.after()`
- `Element.append()`
- `Element.insertAdjacentElement()`
- `CharacterData.before()`
- `DocumentType.before()`
- `Node.appendChild()`
- `Node.insertBefore()`
- `NodeList`
