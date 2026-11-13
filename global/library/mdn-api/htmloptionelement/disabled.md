---
title: "HTMLOptionElement: disabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionelement/disabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionElement: disabled property

The **`disabled`** property of the `HTMLOptionElement` is a boolean value that indicates whether the `<option>` element is unavailable to be selected. The property reflects the value of the `disabled` HTML attribute.

The property reflects the value of the `disabled` attribute on the `<option>` element itself. If an option is disabled because it is a child of an `<optgroup>` element that is disabled, the `true` of the `HTMLOptGroupElement.disabled` property is not inherited by the option itself.

## Value

A boolean value.

## Examples

### HTML

```html
<label for="drink-options">Drink selection:</label>
<select id="drink-options">
  <option value="water">Water</option>
  <option value="lemonade">Lemonade</option>
  <option value="beer">Beer</option>
  <option value="whisky" disabled>Whisky</option>
</select>
```

### JavaScript

```js
const drinks = document.querySelectorAll("#drink-options option");
console.log(drinks[0].disabled); // false
console.log(drinks[3].disabled); // true
drinks[1].disabled = true; // disables the beer option
```

## See also

- `<option>`
- `<select>`
- `<optgroup>`
- `HTMLSelectElement.disabled`
- `HTMLOptGroupElement.disabled`
- `HTMLOptionElement.selected`
- `HTMLOptionElement.index`
- `HTMLOptionsCollection`
- `:disabled`
