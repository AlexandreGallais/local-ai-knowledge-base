---
title: "Selection: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: type property

The **`type`** read-only property of the
`Selection` interface returns a string describing the
type of the current selection.

## Value

A string describing the type of the current selection. Possible
values are:

- `None`
    No selection has currently been made.
- `Caret`
    The selection is collapsed (i.e., the caret is placed on some
    text, but no range has been selected).
- `Range`
    A range has been selected.

## Examples

In this example, the event handler will fire each time a new selection is made.
`console.log(selection.type)` will return `Caret` or
`Range` depending on whether the caret is placed at a single point in the
text, or a range has been selected.

```js
let selection;

document.onselectionchange = () => {
  console.log("New selection made");
  selection = document.getSelection();
  console.log(selection.type);
};
```

## See also

- `Selection`
