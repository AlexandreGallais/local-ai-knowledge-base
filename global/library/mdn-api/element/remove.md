---
title: "Element: remove() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/remove/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: remove() method

The **`remove()`** method of the `Element` interface removes the element from its parent node. Nothing happens if `parentNode` is `null`.

## Syntax

```js
remove()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Using `remove()`

```html
<div id="div-01">Here is div-01</div>
<div id="div-02">Here is div-02</div>
<div id="div-03">Here is div-03</div>
```

```js
const element = document.getElementById("div-02");
element.remove(); // Removes the div with the 'div-02' id
```

### `Element.remove()` is unscopable

The `remove()` method is not scoped into the `with` statement.
See `Symbol.unscopables` for more information.

```js
with (node) {
  remove();
}
// ReferenceError: remove is not defined
```

## See also

- `CharacterData.remove()`
- `DocumentType.remove()`
