---
title: "HTMLSelectElement: add() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: add() method

The **`HTMLSelectElement.add()`** method adds an element to the
collection of `option` elements for this `select` element.

## Syntax

```js
add(item)
add(item, before)
```

### Parameters

- `item`
    An `HTMLOptionElement` or
    `HTMLOptGroupElement`
- `before` (optional)
    An element of the collection, or an index of type
    _long_, representing the _item_ should be inserted before. If this
    parameter is `null` (or the index does not exist), the new element is
    appended to the end of the collection.

### Return value

None (`undefined`).

### Exceptions

- `HierarchyRequestError` `DOMException`
    Thrown if the _item_ passed to the method is an ancestor of the `HTMLSelectElement`.

## Examples

### Creating Elements from Scratch

```js
const sel = document.createElement("select");
const opt1 = document.createElement("option");
const opt2 = document.createElement("option");

opt1.value = "1";
opt1.text = "Option: Value 1";

opt2.value = "2";
opt2.text = "Option: Value 2";

sel.add(opt1, null);
sel.add(opt2, null);

/*
  Produces the following, conceptually:

  <select>
    <option value="1">Option: Value 1</option>
    <option value="2">Option: Value 2</option>
  </select>
*/
```

The before parameter is optional. So the following is accepted.

```js
sel.add(opt1);
sel.add(opt2);
```

### Append to an Existing Collection

```js
const sel = document.getElementById("existingList");

const opt = document.createElement("option");
opt.value = "3";
opt.text = "Option: Value 3";

sel.add(opt, null);

/*
  Takes the existing following select object:

  <select id="existingList">
    <option value="1">Option: Value 1</option>
    <option value="2">Option: Value 2</option>
  </select>

  And changes it to:

  <select id="existingList">
    <option value="1">Option: Value 1</option>
    <option value="2">Option: Value 2</option>
    <option value="3">Option: Value 3</option>
  </select>
*/
```

The before parameter is optional. So the following is accepted.

```js
sel.add(opt);
```

### Inserting to an Existing Collection

```js
const sel = document.getElementById("existingList");

const opt = document.createElement("option");
opt.value = "3";
opt.text = "Option: Value 3";

sel.add(opt, sel.options[1]);

/*
  Takes the existing following select object:

  <select id="existingList">
    <option value="1">Option: Value 1</option>
    <option value="2">Option: Value 2</option>
  </select>

  And changes it to:

  <select id="existingList">
    <option value="1">Option: Value 1</option>
    <option value="3">Option: Value 3</option>
    <option value="2">Option: Value 2</option>
  </select>
*/
```
