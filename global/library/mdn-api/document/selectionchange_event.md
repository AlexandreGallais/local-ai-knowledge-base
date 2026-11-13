---
title: "Document: selectionchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/selectionchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: selectionchange event

The browser fires the **`selectionchange`** event of the Selection API when the current `Selection` of a `Document` changes. A document selection represents either a range of selected content across DOM nodes or a collapsed caret position.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("selectionchange", (event) => {})
```

Alternatively, assign to the event handler property of the interface:

```js
onselectionchange = (event) => {}
```

## Event type

A generic `Event`.

## Description

The `Document` object `selectionchange` event is fired when:

- A user or script creates or clears a selection.
- The start or end boundary point of a selected range moves.
- A selected range changes completely.
- A selection collapses to a single caret position.

The event object itself does not contain the updated selection details. You can retrieve the current selection by calling `document.getSelection()` within your event listener.

> **Note:**
> When you change the selection programmatically, for example by calling `Selection.collapse()`, the selection updates immediately, but the `selectionchange` event is queued as a task. Its listeners run later, after the current script finishes executing. This contrasts with events such as `focus` and `click`, whose listeners run synchronously when triggered by `focus()` and `click()`, respectively.

This event differs significantly from the `selectionchange` event fired on `` and `<textarea>` text controls:

- Document selections use DOM node positions and require `Document.getSelection()` for inspection. Text inputs maintain independent selections within their internal text values, using character offsets inspected via `selectionStart`, `selectionEnd`, and `selectionDirection`.
- The document-level `selectionchange` event fires directly on the `Document` and does not bubble. The text input `selectionchange` event fires on the input/textarea element and bubbles up the DOM tree.

See the `selectionchange` event of `HTMLInputElement` and the `selectionchange` event of `HTMLTextAreaElement` for more details of the text input events.

## Examples

### Basic usage

```js
// addEventListener version
document.addEventListener("selectionchange", () => {
  console.log(document.getSelection());
});

// onselectionchange version (but note that this replaces other event listeners
// added using onselectionchange, if any)
document.onselectionchange = () => {
  console.log(document.getSelection());
};
```

## See also

- `selectstart`
- `Document.getSelection()`
- `Selection`
