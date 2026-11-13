---
title: "Element: copy event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/copy_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: copy event

The **`copy`** event of the Clipboard API fires when the user initiates a copy action through the browser's user interface.

The event's default action is to copy the selection (if any) to the clipboard.

A handler for this event can _modify_ the clipboard contents by calling `setData(format, data)` on the event's `ClipboardEvent.clipboardData` property, and canceling the event's default action using `event.preventDefault()`.

However, the handler cannot _read_ the clipboard data.

It's possible to construct and dispatch a synthetic `copy` event, but this will not affect the system clipboard.

This event bubbles up the DOM tree, eventually to `Document` and `Window`, is cancelable and is composed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("copy", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncopy = (event) => { }
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
const source = document.querySelector("div.source");

source.addEventListener("copy", (event) => {
  const selection = document.getSelection();
  event.clipboardData.setData("text/plain", selection.toString().toUpperCase());
  event.preventDefault();
});
```

#### Result

## See also

- `cut` event
- `paste` event
