---
title: "Selection: removeRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/removerange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: removeRange() method

The **`Selection.removeRange()`** method removes a range from a
selection.

## Syntax

```js
removeRange(range)
```

### Parameters

- `range`
    A range object that will be removed from the selection.

### Return value

None (`undefined`).

## Examples

```js
/* Programmatically, more than one range can be selected.
 * This will remove all ranges except the first. */
const s = window.getSelection();
if (s.rangeCount > 1) {
  for (let i = 1; i < s.rangeCount; i++) {
    s.removeRange(s.getRangeAt(i));
  }
}
```

## See also

- `Selection`, the interface it belongs to.
