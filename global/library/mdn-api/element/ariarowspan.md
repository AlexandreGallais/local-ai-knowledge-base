---
title: "Element: ariaRowSpan property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariarowspan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaRowSpan property

The **`ariaRowSpan`** property of the `Element` interface reflects the value of the `aria-rowspan` attribute, which defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

## Value

A string which contains an integer.

## Examples

In this example the `aria-rowspan` attribute on the element with an ID of `spanning-heading` is set to "3". Using `ariaRowSpan` we update the value to "2".

```html
<table>
  <thead>
    <tr>
      <th id="spanning-heading" rowspan="3" aria-rowspan="3">
        Spanning heading
      </th>
      <th>Heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>One</td>
    </tr>
    <tr>
      <td>Two</td>
    </tr>
  </tbody>
</table>
```

```js
let el = document.getElementById("spanning-heading");
console.log(el.ariaRowSpan);
el.ariaRowSpan = "2";
console.log(el.ariaRowSpan);
```

## See also

- ARIA: table role
