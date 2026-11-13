---
title: "HTMLSelectElement: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: value property

The **`HTMLSelectElement.value`** property contains the value of the first selected `<option>` element associated with this `<select>` element.

This property can also be set directly, for example to set a default value based on some condition.

## Value

A string containing the value of the first selected `<option>` element in this `<select>` element, or the empty string if no options are selected.

## Examples

### Retrieving the selected value

```html
<label for="bird-select">Choose a bird:</label>

<select name="birds" id="bird-select">
  <option value="">--Please choose an option--</option>
  <option value="Scarlet ibis">Scarlet ibis</option>
  <option value="Marabou stork">Marabou stork</option>
  <option value="Roseate spoonbill">Roseate spoonbill</option>
</select>

<pre id="log"></pre>
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}

const select = document.querySelector("#bird-select");
select.addEventListener("change", () => {
  log(`Selection: ${select.value}`);
});
```

```css
#log {
  height: 20px;
  padding: 0.5rem;
  border: 1px solid black;
}
```

## See also

- The `<select>` HTML element, implementing this interface.
