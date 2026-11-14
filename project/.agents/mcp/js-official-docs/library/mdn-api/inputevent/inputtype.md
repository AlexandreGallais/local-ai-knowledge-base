---
title: "InputEvent: inputType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputevent/inputtype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputEvent: inputType property

The **`inputType`** read-only property of the
`InputEvent` interface returns the type of change made to editable content.
Possible changes include for example inserting, deleting, and formatting text.

## Value

A string containing the type of input that was made. There are many
possible values, such as `insertText`, `deleteContentBackward`,
`insertFromPaste`, and `formatBold`. For a complete list of the
available input types, see the Attributes section of the Input Events Level 2 spec.

## Examples

This example logs the `inputType` for input events on an editable
``.

### HTML

```html
<p id="log">Input type:</p>
<div contenteditable="true" class="sample-text">
  <p>
    Some sample text. Try inserting line breaks, or deleting text in different
    ways, or pasting different content in.
  </p>
  <hr />
  <ul>
    <li>A sample</li>
    <li>bulleted</li>
    <li>list.</li>
  </ul>
  <p>Another paragraph.</p>
</div>
```

### CSS

```css
.sample-text {
  margin: 20px;
  padding: 20px;
  border: 2px dashed red;
}
```

### JavaScript

```js
const log = document.getElementById("log");
const editable = document.querySelector("div[contenteditable]");
editable.addEventListener("input", logInputType);

function logInputType(event) {
  log.textContent = `Input type: ${event.inputType}`;
}
```

### Result

Try editing the text inside the `` and see what happens.

> **Note:**
> See also Masayuki Nakano's InputEvent test suite for a more detailed example.
