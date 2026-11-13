---
title: "HTMLSelectElement: selectedIndex property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/selectedindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: selectedIndex property

The **`selectedIndex`** property of the `HTMLSelectElement` interface is the numeric index of the first selected `<option>` element in a `<select>` element, if any, or `−1` if no `<option>` is selected. Setting this property selects the option at that index and deselects all other options, while setting it to `-1` deselects any currently selected options.

## Value

A number.

## Examples

### HTML

```html
<p id="p">selectedIndex: 0</p>

<select id="select">
  <option selected>Option A</option>
  <option>Option B</option>
  <option>Option C</option>
  <option>Option D</option>
  <option>Option E</option>
</select>
```

### JavaScript

```js
const selectElem = document.getElementById("select");
const pElem = document.getElementById("p");

// When a new <option> is selected
selectElem.addEventListener("change", () => {
  const index = selectElem.selectedIndex;
  // Add that data to the <p>
  pElem.textContent = `selectedIndex: ${index}`;
});
```

## See also

- `HTMLSelectElement`
- `HTMLOptionElement`
- `HTMLOptionsCollection`
