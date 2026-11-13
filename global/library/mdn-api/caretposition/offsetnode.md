---
title: "CaretPosition: offsetNode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/caretposition/offsetnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaretPosition: offsetNode property

The **`offsetNode`** property of the `CaretPosition` interface returns a `Node` containing the found node at the caret's position.

## Value

A `Node`.

## Examples

This example logs the `offsetNode` and `offset` of the caret position when clicking inside the input field.

```html
<input aria-label="text field" value="Click inside this input field" />
```

```html
<pre id="log"></pre>
```

```css
input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

#log {
  height: 200px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
document.querySelector("input").addEventListener("click", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  const caret = document.caretPositionFromPoint?.(x, y);
  if (!caret) {
    log("Not supported");
    return;
  }

  const node = caret.offsetNode;
  const offset = caret.offset;

  log(`offsetNode: ${node}`);
  log(`offset: ${offset}`);
});
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

## See also

- `Node`
- `Document.caretPositionFromPoint()`
