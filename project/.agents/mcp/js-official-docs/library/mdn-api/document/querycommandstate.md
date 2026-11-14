---
title: "Document: queryCommandState() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/querycommandstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: queryCommandState() method

> **Note:**
> Although the `execCommand()` method is deprecated, there are still some valid use cases that do not yet have viable alternatives, as mentioned in the `execCommand()` article. In these cases, you may find this method useful to implement a complete user experience, but test to ensure cross-browser compatibility.

The **`queryCommandState()`** method will tell you if the current selection has a certain `Document.execCommand()` command applied.

## Syntax

```js
queryCommandState(command)
```

### Parameters

- `command`
    A command from `Document.execCommand()`

### Return value

`queryCommandState()` can return a boolean value or `null` if the state is unknown.

## Example

### HTML

```html
<div contenteditable="true">Select a part of this text!</div>
<button>Test the state of the 'bold' command</button>
<hr />
<div id="output"></div>
```

```css
hr,
button {
  margin: 1rem 0;
}
```

### JavaScript

```js
function makeBold() {
  const state = document.queryCommandState("bold");
  let message;
  switch (state) {
    case true:
      message = "The bold formatting will be removed from the selected text.";
      break;
    case false:
      message = "The selected text will be displayed in bold.";
      break;
    default:
      message = "The state of the 'bold' command is indeterminable.";
      break;
  }
  document.querySelector("#output").textContent = `Output: ${message}`;
  document.execCommand("bold");
}

document.querySelector("button").addEventListener("click", makeBold);
```

## Specifications

This feature is not part of any current specification. It is no longer on track to become a standard. There is an unofficial W3C execCommand spec draft.

## See also

- `HTMLElement.contentEditable`
- `document.designMode`
- `document.execCommand()`
- Browser bugs related to `queryCommandState()`: Scribe's "Browser Inconsistencies" documentation
