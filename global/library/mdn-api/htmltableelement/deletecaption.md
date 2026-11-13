---
title: "HTMLTableElement: deleteCaption() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/deletecaption/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: deleteCaption() method

The **`deleteCaption()`** method of the `HTMLTableElement` interface removes the first `` element child from a given ``, if any.

## Syntax

```js
deleteCaption()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

This example uses JavaScript to delete a table's caption.

### HTML

```html
<table>
  <caption>
    This caption will be deleted!
  </caption>
  <tbody>
    <tr>
      <td>Cell 1.1</td>
      <td>Cell 1.2</td>
    </tr>
    <tr>
      <td>Cell 2.1</td>
      <td>Cell 2.2</td>
    </tr>
  </tbody>
</table>
```

### JavaScript

```js
const table = document.querySelector("table");
table.deleteCaption();
```

## See also

- `HTMLTableElement.createCaption()`
- `HTMLTableElement.deleteTFoot()`
- `HTMLTableElement.deleteTHead()`
