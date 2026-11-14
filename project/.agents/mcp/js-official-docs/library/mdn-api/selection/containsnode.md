---
title: "Selection: containsNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/containsnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: containsNode() method

The **`Selection.containsNode()`** method indicates whether a
specified node is part of the selection.

## Syntax

```js
containsNode(node)
containsNode(node)
containsNode(node, partialContainment)
```

### Parameters

- `node`
    The node that is being looked for in the selection.
- `partialContainment` (optional)
    When `true`, `containsNode()` returns `true` when a
    part of the node is part of the selection. When `false`,
    `containsNode()` only returns `true` when the entire node is
    part of the selection. If not specified, the default value `false` is used.

### Return value

Returns `true` if the given node is part of the selection, and `false` otherwise.

## Examples

### Check for selection

This snippet checks whether anything inside the body element is selected.

```js
console.log(window.getSelection().containsNode(document.body, true));
```

### Find the hidden word

In this example, a message appears when you select the secret word. It uses
`addEventListener()` to check for
`selectionchange` events.

#### HTML

```html
<p>Can you find the secret word?</p>
<p>Hmm, where <span id="<example-value>">SECRET</span> could it be?</p>
<p id="win" hidden>You found it!</p>
```

#### CSS

```css
#secret {
  color: transparent;
}
```

#### JavaScript

```js
const secret = document.getElementById("<example-value>");
const win = document.getElementById("win");

// Listen for selection changes
document.addEventListener("selectionchange", () => {
  const selection = window.getSelection();
  const found = selection.containsNode(secret);

  win.toggleAttribute("hidden", !found);
});
```

#### Result

## See also

- `Selection`, the interface it belongs to.
