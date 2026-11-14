---
title: "Document: createTextNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createtextnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createTextNode() method

Creates a new `Text` node. This method can be used to escape HTML
characters.

## Syntax

```js
createTextNode(data)
```

### Parameters

- `data`
    A string containing the data to be put in the text node.

### Return value

A `Text` node.

## Examples

```html
<button>YES!</button>
<button>NO!</button>
<button>WE CAN!</button>

<hr />

<p id="p1">First line of paragraph.</p>
```

```js
function addTextNode(text) {
  const newText = document.createTextNode(text);
  const p1 = document.getElementById("p1");

  p1.appendChild(newText);
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (event) => {
    addTextNode(`${event.target.textContent} `);
  });
});
```
