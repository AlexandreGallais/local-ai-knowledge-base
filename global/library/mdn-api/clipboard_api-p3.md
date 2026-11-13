---
title: "Clipboard API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard API (part 3 of 3)

### Overriding cut, copy, and paste events

This example listens for the `copy`, `cut`, and `paste` events fired on a text area, and for the `clipboardchange` event fired on `Navigator.clipboard`.
The `copy` event's default action is overridden to append a signature to the copied text, and the `paste` event's default action is overridden to insert the pasted text in upper case.
The `cut` and `clipboardchange` events are only logged, to show that they still fire even when their default action isn't overridden.

#### HTML

```html
<textarea id="event_source" rows="3">
Select some of this text, then copy, cut, or paste using your keyboard or the context menu.</textarea>
<pre id="event_log"></pre>
```

```css
#event_source {
  box-sizing: border-box;
  width: 100%;
}

#event_log {
  height: 100px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
  white-space: pre-wrap;
}
```

#### JavaScript

```js
const eventLog = document.querySelector("#event_log");
function log(text) {
  eventLog.textContent = `${eventLog.textContent}${text}\n`;
  eventLog.scrollTop = eventLog.scrollHeight;
}
```

The `copy` event's default action is overridden with `ClipboardEvent.clipboardData` to append a signature to whatever text was selected.

```js
const eventSource = document.querySelector("#event_source");

eventSource.addEventListener("copy", (event) => {
  const selected = eventSource.value.slice(
    eventSource.selectionStart,
    eventSource.selectionEnd,
  );
  event.clipboardData.setData("text/plain", `${selected} (MDN example)`);
  event.preventDefault();
  log("copy event: default action overridden to append a signature.");
});
```

The `cut` event isn't overridden, so cutting still removes the selected text as usual; only the event itself is logged.

```js
eventSource.addEventListener("cut", () => {
  log("cut event: fired, default action left in place.");
});
```

The `paste` event's default action is overridden to insert the pasted text in upper case instead of as-is.

```js
eventSource.addEventListener("paste", (event) => {
  const pasted = event.clipboardData.getData("text/plain");
  const { selectionStart, selectionEnd, value } = eventSource;
  eventSource.value =
    value.slice(0, selectionStart) +
    pasted.toUpperCase() +
    value.slice(selectionEnd);
  event.preventDefault();
  log("paste event: default action overridden to upper-case the pasted text.");
});
```

The `clipboardchange` fires on `Navigator.clipboard` whenever the system clipboard's contents change, from any source.

```js
navigator.clipboard.addEventListener("clipboardchange", () => {
  log("clipboardchange event: the system clipboard's contents changed.");
});
```

#### Result

Select some of the text above and copy it: the log shows the `copy` event firing, and a signature "(MDN example)" is appended to the text you just stored on the clipboard (paste it elsewhere to check).
Cut some text to see the `cut` event logged with its default action untouched.
Paste anything back into the box to see it inserted in upper case.

> **Note:**
> If prompted, grant permission in order to copy and paste.
