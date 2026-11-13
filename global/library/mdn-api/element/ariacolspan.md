---
title: "Element: ariaColSpan property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariacolspan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaColSpan property

The **`ariaColSpan`** property of the `Element` interface reflects the value of the `aria-colspan` attribute, which defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

## Value

A string which contains an integer.

## Examples

In this example the `aria-colspan` attribute on the element with an ID of `spanning-heading` is set to "2". Using `ariaColSpan` we update the value to "3".

```html
<table>
  <thead>
    <tr>
      <th>Heading 1</th>
      <th>Heading 2</th>
      <th>Heading 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" aria-colspan="2" id="spanning-column">Spanning</td>
      <td>One</td>
    </tr>
  </tbody>
</table>
```

```js
let el = document.getElementById("spanning-column");
console.log(el.ariaColSpan);
el.ariaColSpan = "3";
console.log(el.ariaColSpan);
```

## See also

- ARIA: table role
