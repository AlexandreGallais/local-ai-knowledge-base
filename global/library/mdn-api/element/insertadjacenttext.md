---
title: "Element: insertAdjacentText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/insertadjacenttext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: insertAdjacentText() method

The **`insertAdjacentText()`** method of the `Element` interface, given a relative position and a string, inserts a new text node at the given position relative to the element it is called from.

## Syntax

```js
insertAdjacentText(where, data)
```

### Parameters

- `where`
    A string representing the position relative to the element the method is called from; must be one of the following strings:
    - `'beforebegin'`: Before the `element` itself.
    - `'afterbegin'`: Just inside the `element`, before its first child.
    - `'beforeend'`: Just inside the `element`, after its last child.
    - `'afterend'`: After the `element` itself.

- `data`
    A string from which to create a new text node to insert at the given position `where` relative to the element the method is called from.

### Return value

None (`undefined`).

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if `where` is not a recognized value.

### Visualization of position names

```html
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

> **Note:**
> The `beforebegin` and
> `afterend` positions work only if the node is in a tree and has an element
> parent.

## Examples

```js
beforeBtn.addEventListener("click", () => {
  para.insertAdjacentText("afterbegin", textInput.value);
});

afterBtn.addEventListener("click", () => {
  para.insertAdjacentText("beforeend", textInput.value);
});
```

Have a look at our insertAdjacentText.html
demo on GitHub (see the source code too.) Here we have a simple paragraph. You can enter some text into the form
element, then press the _Insert before_ and _Insert after_ buttons to
insert it before or after the existing paragraph text using
`insertAdjacentText()`. Note that the existing text node is not added to —
further text nodes are created containing the new additions.

## See also

- `Element.insertAdjacentElement()`
- `Element.insertAdjacentHTML()`
