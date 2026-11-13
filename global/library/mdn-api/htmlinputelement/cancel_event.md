---
title: "HTMLInputElement: cancel event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/cancel_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: cancel event

The **`cancel`** event fires on an `` element when the user cancels the file picker dialog via the `Esc` key or the cancel button and when the user re-selects the same files that were previously selected of `type="file"`.

This event is not cancelable but can bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("cancel", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncancel = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Canceling an input element

#### HTML

```html
<label for="file">Select a file. Or don't.</label>
<input type="file" id="file" name="file" />

<div id="result"></div>
```

```css
div {
  margin-bottom: 10px;
}
```

#### JavaScript

```js
const elem = document.getElementById("file");

const result = document.getElementById("result");

elem.addEventListener("cancel", () => {
  result.textContent = "Canceled.";
});

elem.addEventListener("change", () => {
  if (elem.files.length === 1) {
    result.textContent = "File Selected.";
  }
});
```

#### Result

Open the file selector, then close the selection dialog with the escape key or the cancel button. Both of these will cause the cancel event to be fired. Also, try selecting a local file on your machine; then reopen the file selection window and reselect the same file. This too causes the cancel event to be fired.

## See also

- HTML `` element
