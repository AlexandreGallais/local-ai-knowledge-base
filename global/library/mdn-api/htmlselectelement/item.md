---
title: "HTMLSelectElement: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: item() method

The **`HTMLSelectElement.item()`** method returns the
`Element` corresponding to the `HTMLOptionElement` whose
position in the options list corresponds to the index given in the parameter, or
`null` if there are none.

In JavaScript, using the array bracket syntax with an `unsigned long`, like
`selectElt[index]` is equivalent to
`selectElt.item(index)`.

## Syntax

```js
item(index)
// or collection[index]
```

### Parameters

- `index`
    A non-negative integer representing the position of the option in the list.

### Return value

An `HTMLOptionElement` or `null`.

## Examples

### HTML

```html
<form>
  <select id="myFormControl">
    <option id="o1">Opt 1</option>
    <option id="o2">Opt 2</option>
  </select>
</form>
```

### JavaScript

```js
// Returns the HTMLOptionElement representing #o2
elem1 = document.forms[0]["myFormControl"][1];
```

## See also

- `HTMLSelectElement` that implements it.
