---
title: "HTMLTableElement: deleteTFoot() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/deletetfoot/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: deleteTFoot() method

The **`deleteTFoot()`** method of the `HTMLTableElement` interface removes the first `` element child from a given ``, if any.

## Syntax

```js
deleteTFoot()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

This example uses JavaScript to delete a table's footer.

### HTML

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bob</td>
      <td>541</td>
    </tr>
    <tr>
      <td>Jim</td>
      <td>225</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>Average</th>
      <td>383</td>
    </tr>
  </tfoot>
</table>
```

### JavaScript

```js
const table = document.querySelector("table");
table.deleteTFoot();
```

## See also

- `HTMLTableElement.createTFoot()`
- `HTMLTableElement.deleteCaption()`
- `HTMLTableElement.deleteTHead()`
