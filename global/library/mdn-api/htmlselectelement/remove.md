---
title: "HTMLSelectElement: remove() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/remove/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: remove() method

The **`HTMLSelectElement.remove()`** method removes the element
at the specified index from the options collection for this select element.

## Syntax

```js
remove(index)
```

### Parameters

- `index`
    A zero-based integer for the index of the `HTMLOptionElement`
    to remove from the collection. If the index is not found the method has no effect.

### Return value

None (`undefined`).

## Examples

```html
<select id="existingList" name="existingList">
  <option value="1">Option: Value 1</option>
  <option value="2">Option: Value 2</option>
  <option value="3">Option: Value 3</option>
</select>
```

```js
let sel = document.getElementById("existingList");
sel.remove(1);
```

HTML is now:

```html
<select id="existingList" name="existingList">
  <option value="1">Option: Value 1</option>
  <option value="3">Option: Value 3</option>
</select>
```

## See also

- `Element.remove`, the method that gets called when remove is called
  without arguments on a `HTMLSelectElement`.
- `HTMLSelectElement` that implements it.
