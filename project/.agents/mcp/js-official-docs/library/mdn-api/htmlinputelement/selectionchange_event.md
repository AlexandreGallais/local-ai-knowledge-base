---
title: "HTMLInputElement: selectionchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/selectionchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: selectionchange event

The **`selectionchange`** event of the Selection API is fired when the text selection within an `` element is changed in either extent or direction, whether the selection is a caret or a range of characters.

This event is not cancelable.

> **Note:**
> When you change the selection programmatically, for example by calling `setSelectionRange()`, the selection updates immediately, but the `selectionchange` event is queued as a task. Its listeners run later, after the current script finishes executing. This contrasts with events such as `focus` and `click`, whose listeners run synchronously when triggered by `focus()` and `click()`, respectively.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("selectionchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onselectionchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

The example below shows how to get the text selected in an `` element.

### HTML

```html
<div>
  Enter and select text here:<br /><input id="my-text" rows="2" cols="20" />
</div>
<div>selectionStart: <span id="start"></span></div>
<div>selectionEnd: <span id="end"></span></div>
<div>selectionDirection: <span id="direction"></span></div>
```

### JavaScript

```js
const myInput = document.getElementById("my-text");

myInput.addEventListener("selectionchange", () => {
  document.getElementById("start").textContent = myInput.selectionStart;
  document.getElementById("end").textContent = myInput.selectionEnd;
  document.getElementById("direction").textContent = myInput.selectionDirection;
});
```
