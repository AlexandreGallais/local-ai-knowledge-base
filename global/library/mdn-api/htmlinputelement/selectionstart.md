---
title: "HTMLInputElement: selectionStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/selectionstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: selectionStart property

The **`selectionStart`** property of the `HTMLInputElement` interface specifies the start position of the current text selection in an `` element.

## Value

A non-negative number, representing the zero-based index of the first selected character in a text ``. When nothing is selected, the value of both `selectionStart` and `selectionEnd` is the position of the cursor (caret) inside the `` element.

Setting `selectionStart` to a value greater than the current value of `selectionEnd` updates both properties to the new value. Values greater than the length of the input's value are treated as the end of the value. Setting `selectionStart` to a new value fires the `selectionchange` and `select` events.

The property value can be retrieved and set without the `` having focus, but the element must have focus for the `::selection` pseudo-element to match the selected text.

The `selectionStart` property applies only to inputs of types `text`, `search`, `url`, `tel`, and `password`. On other input types, reading the property returns `null`, and setting it throws an `InvalidStateError` `DOMException`.

## Examples

### Basic usage

This example reports the selected text and its start and end positions. Select some text in the input, and then click the button.

### HTML

```html
<label for="text-box">Select some text:</label>
<input id="text-box" type="text" value="The quick brown fox." />
<button id="show-selection" type="button">Show selection</button>
<p id="output">No selection reported yet.</p>
```

### JavaScript

```js
const textBox = document.querySelector("#text-box");
const output = document.querySelector("#output");

document.querySelector("#show-selection").addEventListener("click", () => {
  const start = textBox.selectionStart;
  const end = textBox.selectionEnd;
  const selectedText = textBox.value.substring(start, end);

  output.textContent = `You selected "${selectedText}" (start: ${start}, end: ${end}).`;
});
```

## See also

- ``
- `HTMLInputElement`
- `HTMLInputElement.selectionEnd`
- `HTMLInputElement.selectionDirection`
- `selectionchange` event
- `HTMLInputElement.select()`
- `HTMLInputElement.setSelectionRange()`
- `HTMLInputElement.setRangeText()`
- `HTMLTextAreaElement.selectionStart`
- `Selection`
- `::selection` pseudo-element
