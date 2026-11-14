---
title: "HTMLFormElement: reset event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/reset_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: reset event

The **`reset`** event fires when a `<form>` is reset.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("reset", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onreset = (event) => { }
```

## Event type

A generic `Event`.

## Examples

This example uses `EventTarget.addEventListener()` to listen for form resets, and logs the current `Event.timeStamp` whenever that occurs.

### HTML

```html
<form id="form">
  <label>Test checkbox: <input type="checkbox" /></label>
  <br /><br />
  <button type="reset">Reset form</button>
</form>
<p id="log"></p>
```

### JavaScript

```js
const form = document.getElementById("form");
const log = document.getElementById("log");

function logReset(event) {
  log.textContent = `Form reset! Timestamp: ${event.timeStamp}`;
}

form.addEventListener("reset", logReset);
```

## See also

- HTML `<form>` element
