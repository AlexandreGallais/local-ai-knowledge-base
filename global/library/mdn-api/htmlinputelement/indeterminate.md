---
title: "HTMLInputElement: indeterminate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/indeterminate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: indeterminate property

The **`indeterminate`** property of the `HTMLInputElement` interface returns a boolean value that indicates whether the checkbox is in the _indeterminate_ state. For example, a "select all/deselect all" checkbox may be in the indeterminate state when some but not all of its sub-controls are checked. The `indeterminate` state can only be set via JavaScript and is only relevant to `checkbox` controls.

It is unrelated to the `HTMLInputElement.checked` property, and an indeterminate checkbox can be either checked or unchecked. Being indeterminate only affects the checkbox's appearance (see example below), not its presence when submitted (which is controlled by the checkedness).

## Value

A boolean.

## Examples

```html
<input type="checkbox" id="indeterminate-checkbox" />
<label for="indeterminate-checkbox">Indeterminate checkbox</label>
```

```js
const checkbox = document.getElementById("indeterminate-checkbox");
checkbox.indeterminate = true;
```

## See also

- `HTMLInputElement`
- `HTMLInputElement.checked`
- ``
- Indeterminate state checkboxes
- CSS `:indeterminate` property
