---
title: "CaretPosition: getClientRect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/caretposition/getclientrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaretPosition: getClientRect() method

The `getClientRect()` method of the `CaretPosition` interface returns the client rectangle for the caret range.

## Syntax

```js
getClientRect()
```

### Parameters

None.

### Return value

A `DOMRect` object.

## Examples

### Get the caret's screen position

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

  const rect = caret.getClientRect();

  log(`Caret bounding rect: ${JSON.stringify(rect)}`);
  log(`Caret is at (${rect.x.toFixed(2)}, ${rect.y.toFixed(2)})`);
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

- `DOMRect`
- `Document.caretPositionFromPoint()`
- `Element.getBoundingClientRect()`
