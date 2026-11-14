---
title: "HTMLTableElement: createCaption() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/createcaption/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: createCaption() method

The **`createCaption()`** method of the `HTMLTableElement` interface creates a `` element, inserts it as the first child of the given ``, and returns it. If the table already has a `` element child, this method returns the first such child without creating one.

When creation is needed, this method creates and inserts the element directly, without requiring separate calls to methods such as `Document.createElement()` and `Node.insertBefore()`.

## Syntax

```js
createCaption()
```

### Parameters

None.

### Return value

An `HTMLTableCaptionElement`.

## Examples

This example uses JavaScript to add a caption to a table that initially lacks one.

### HTML

```html
<table>
  <tbody>
    <tr>
      <td>Cell 1.1</td>
      <td>Cell 1.2</td>
      <td>Cell 1.3</td>
    </tr>
    <tr>
      <td>Cell 2.1</td>
      <td>Cell 2.2</td>
      <td>Cell 2.3</td>
    </tr>
  </tbody>
</table>
```

### JavaScript

```js
const table = document.querySelector("table");
const caption = table.createCaption();
caption.textContent = "This caption was created by JavaScript!";
```

## See also

- `HTMLTableElement.createTBody()`
- `HTMLTableElement.createTFoot()`
- `HTMLTableElement.createTHead()`
- `HTMLTableElement.deleteCaption()`
