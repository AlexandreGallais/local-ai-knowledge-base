---
title: "Document: hasFocus() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/hasfocus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: hasFocus() method

The **`hasFocus()`** method of the `Document` interface returns a boolean value indicating whether the document or any element inside the document has focus.
This method can be used to determine whether the active element in a document has focus.

> **Note:**
> When viewing a document, an element with focus is always the active element in the document, but an active element does not necessarily have focus.
> For example, an active element within a popup window that is not the foreground doesn't have focus.

## Syntax

```js
hasFocus()
```

### Parameters

None.

### Return value

`false` if the active element in the document has no focus;
`true` if the active element in the document has focus.

## Examples

### Checking if the document has focus

The following example checks whether the document has focus or not.
A function called `checkPageFocus()` updates a paragraph element depending on the result of `document.hasFocus()`.
Opening a new window will cause the document to lose focus and switching back to the original window will cause the document to regain focus.

```html
<p id="log">Focus check results are shown here.</p>
<button id="newWindow">Open new window</button>
```

```css
body {
  padding: 1rem;
  background: gray;
  text-align: center;
  font: 1.5rem sans-serif;
}
```

```js
const body = document.querySelector("body");
const log = document.getElementById("log");

function checkDocumentFocus() {
  if (document.hasFocus()) {
    log.textContent = "This document has focus.";
    body.style.background = "white";
  } else {
    log.textContent = "This document does not have focus.";
    body.style.background = "gray";
  }
}

function openWindow() {
  window.open(
    "https://developer.mozilla.org/",
    "MDN",
    "width=640,height=320,left=150,top=150",
  );
}

document.getElementById("newWindow").addEventListener("click", openWindow);
setInterval(checkDocumentFocus, 300);
```

## See also

- `Document.activeElement`
- Using the Page Visibility API
