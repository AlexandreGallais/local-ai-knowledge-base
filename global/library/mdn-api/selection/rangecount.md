---
title: "Selection: rangeCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/rangecount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: rangeCount property

The **`Selection.rangeCount`** read-only property returns the
number of ranges in the selection.

Before the user has clicked a freshly loaded page, the `rangeCount` is
`0`. After the user clicks on the page, `rangeCount` is
`1`, even if no selection is visible.

A user can normally only select one range at a time, so the `rangeCount`
will usually be `1`. Scripting can be used to make the selection contain more
than one range.

Gecko browsers allow multiple selections across table cells. Firefox allows you to select
multiple ranges in the document by using Ctrl+click (unless the click occurs within an
element that has the `display: table-cell` CSS property assigned).

## Value

A number.

## Examples

The following example will show the `rangeCount` every second. Select text
in the browser to see it change.

### HTML

```html
<table>
  <tbody>
    <tr>
      <td>a.1</td>
      <td>a.2</td>
    </tr>
    <tr>
      <td>b.1</td>
      <td>b.2</td>
    </tr>
    <tr>
      <td>c.1</td>
      <td>c.2</td>
    </tr>
  </tbody>
</table>
```

### JavaScript

```js
setInterval(() => {
  console.log(window.getSelection().rangeCount);
}, 1000);
```

### Result

Open your console to see how many ranges are in the selection. In Gecko browsers, you
can select multiple ranges across table cells by holding down `Ctrl` (or `Cmd` on macOS) while
dragging with the mouse.

## See also

- `Selection`, the interface it belongs to.
