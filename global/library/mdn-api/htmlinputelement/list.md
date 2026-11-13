---
title: "HTMLInputElement: list property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/list/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: list property

The **`list`** read-only property of the `HTMLInputElement` interface returns the `HTMLDataListElement` pointed to by the `list` attribute of the element, or `null` if the `list` attribute is not defined or the `list` attribute's value is not associated with any `<datalist>` in the same tree.

> **Note:**
> This is a read-only property. To associate a `<datalist>` with an element, set the value of the `list` attribute with `setAttribute()`.

## Value

An `HTMLDataListElement` or `null`.

## Example

Given the following HTML:

```html
<label for="planet">Which planet are you from?</label>
<input id="planet" type="text" list="superhero" />
<datalist id="superhero">
  <option value="Azarath"></option>
  <option value="Krypton"></option>
  <option value="Tamaran"></option>
</datalist>
```

You can retrieve the `<datalist>` element associated with the ``:

```js
const inputElement = document.querySelector("#planet");
console.log(inputElement.list); // returns the superhero HTMLDatalistElement
```

## See also

- `HTMLInputElement.value`
- `HTMLInputElement.type`
- `HTMLDataListElement`
- `HTMLOptionElement`
- `HTMLCollection`
- ``
- `<datalist>`
- `<option>`
