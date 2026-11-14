---
title: "HTMLTableElement: tBodies property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/tbodies/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: tBodies property

The **`tBodies`** read-only property of the `HTMLTableElement` interface returns a live `HTMLCollection` of all `` element children of the given ``.

Although the property is read-only, the returned object is live and is automatically updated when the `HTMLTableElement` changes.

The collection returned includes implicit `` elements. For example:

```html
<table>
  <tr>
    <td>cell one</td>
  </tr>
</table>
```

The HTML DOM generated from the above HTML will have a `` element even though the tags are not included in the source HTML.

## Value

A live `HTMLCollection` of `HTMLTableSectionElement` (which are all `tbody`) objects.

## Examples

This snippet gets the number of bodies in a table.

```js
myTable.tBodies.length;
```

## See also

- `HTMLTableElement.caption`
- `HTMLTableElement.tFoot`
- `HTMLTableElement.tHead`
- `HTMLTableElement.createTBody()`
