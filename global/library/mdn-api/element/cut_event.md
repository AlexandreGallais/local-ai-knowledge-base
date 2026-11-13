---
title: "Element: cut event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/cut_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: cut event

The **`cut`** event of the Clipboard API is fired when the user has initiated a "cut" action through the browser's user interface.

If the user attempts a cut action on uneditable content, the `cut` event still fires but the event object contains no data.

The event's default action is to copy the current selection (if any) to the system clipboard and remove it from the document.

A handler for this event can _modify_ the clipboard contents by calling `setData(format, data)` on the event's `ClipboardEvent.clipboardData` property, and canceling the default action using `event.preventDefault()`.

Note though that canceling the default action will also prevent the document from being updated. So an event handler which wants to emulate the default action for "cut" while modifying the clipboard must also manually remove the selection from the document.

The handler cannot _read_ the clipboard data.

It's possible to construct and dispatch a synthetic `cut` event, but this will not affect the system clipboard or the document's contents.

This event bubbles up the DOM tree, eventually to `Document` and `Window`, is cancelable and is composed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("cut", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncut = (event) => { }
```

## Event type

A `ClipboardEvent`. Inherits from `Event`.

## Examples

### Live example

#### HTML

```html
<div class="source" contenteditable="true">Cut text from this box.</div>
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

source.addEventListener("cut", (event) => {
  const selection = document.getSelection();
  event.clipboardData.setData("text/plain", selection.toString().toUpperCase());
  selection.deleteFromDocument();
  event.preventDefault();
});
```

#### Result

## See also

- `copy` event
- `paste` event
