---
title: "HTMLInputElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: name property

The **`name`** property of the `HTMLInputElement` interface indicates the name of the `` element. It reflects the element's `name` attribute.

## Value

A string representing the element's name.

## Example

Given the following HTML:

```html
<p>
  <label for="planet">Which planet were you born on?</label>
  <input id="planet" type="text" name="origin" />
</p>
```

You can use the `name` property to retrieve or set the ``'s name:

```js
const inputElement = document.querySelector("#planet");
console.log(`Element's name: ${inputElement.name}`); // "Element's name: origin"
inputElement.name = "planet"; // updates the element's name
```

## See also

- `HTMLInputElement.value`
- `HTMLInputElement.type`
