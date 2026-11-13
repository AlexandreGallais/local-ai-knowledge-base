---
title: "Element: paste event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/paste_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: paste event

The **`paste`** event of the Clipboard API is fired when the user has initiated a "paste" action through the browser's user interface.

If the cursor is in an editable context (for example, in a `<textarea>` or an element with `contenteditable` attribute set to `true`) then the default action is to insert the contents of the clipboard into the document at the cursor position.

A handler for this event can access the clipboard contents by calling `getData()` on the event's `clipboardData` property.

To override the default behavior (for example to insert some different data or a transformation of the clipboard contents) an event handler must cancel the default action using `event.preventDefault()`, and then insert its desired data manually.

It's possible to construct and dispatch a synthetic `paste` event, but this will not affect the document's contents.

This event bubbles up the DOM tree, eventually to `Document` and `Window`, is cancelable and is composed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("paste", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpaste = (event) => { }
```

## Event type

A `ClipboardEvent`. Inherits from `Event`.

## Examples

### Live example

#### HTML

```html
<div class="source" contenteditable="true">Copy text from this box.</div>
<div class="target" contenteditable="true">And paste it into this one.</div>
```

```css
div.source,
div.target {
  border: 1px solid gray;
  margin: 0.5rem;
  padding: 0.5rem;
  height: 1rem;
  background-color: #e9eef1;
}
```

#### JavaScript

```js
const target = document.querySelector("div.target");

target.addEventListener("paste", (event) => {
  event.preventDefault();

  let paste = (event.clipboardData || window.clipboardData).getData("text");
  paste = paste.toUpperCase();
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(document.createTextNode(paste));
  selection.collapseToEnd();
});
```

#### Result

## See also

- `cut` event
- `copy` event
