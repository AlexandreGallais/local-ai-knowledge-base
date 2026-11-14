---
title: "HTMLSelectElement: namedItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/nameditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: namedItem() method

The **`HTMLSelectElement.namedItem()`** method returns the
`HTMLOptionElement` corresponding to the `HTMLOptionElement`
whose `name` or `id` match the specified name, or
`null` if no option matches.

In JavaScript, using `selectElt.namedItem('value')` is equivalent to `selectElt.options.namedItem('value')`.

## Syntax

```js
namedItem(str)
```

### Parameters

- `str`
    A string representing the `name` or `id` of the option.

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
let selectElt = document.getElementById("myFormControl");
elem1 = selectElt.namedItem("o1"); // Returns the HTMLOptionElement representing #o1
```

But, you cannot write:

```js
let selectElt = document.getElementById("myFormControl");
elem1 = selectElt.o1; // Returns undefined
elem1 = selectElt["o1"]; // Returns undefined
```

## See also

- `HTMLSelectElement` that implements it.
