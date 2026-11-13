---
title: "HTMLTableElement: deleteTHead() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/deletethead/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: deleteTHead() method

The **`deleteTHead()`** method of the `HTMLTableElement` interface removes the first `` element child from a given ``, if any.

## Syntax

```js
deleteTHead()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

This example uses JavaScript to delete a table's header.

### HTML

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Occupation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bob</td>
      <td>Plumber</td>
    </tr>
    <tr>
      <td>Jim</td>
      <td>Roofer</td>
    </tr>
  </tbody>
</table>
```

### JavaScript

```js
const table = document.querySelector("table");
table.deleteTHead();
```

## See also

- `HTMLTableElement.createTHead()`
- `HTMLTableElement.deleteCaption()`
- `HTMLTableElement.deleteTFoot()`
