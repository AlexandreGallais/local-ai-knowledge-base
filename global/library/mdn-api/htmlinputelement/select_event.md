---
title: "HTMLInputElement: select event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/select_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: select event

The **`select`** event of the `HTMLInputElement` interface fires when the selection's extent or direction is changed programmatically, or when the user selects text.

This event is not fired when nothing is selected and the caret is moved by the user. Only the `selectionchange` event fires in this case.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("select", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onselect = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Selection logger

```html
<input value="Try selecting some text in this element." />
<p id="log"></p>
```

```js
function logSelection(event) {
  const log = document.getElementById("log");
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd,
  );
  log.textContent = `You selected: ${selection}`;
}

const input = document.querySelector("input");
input.addEventListener("select", logSelection);
```

### Using the `onselect` event handler property

You can also set up the event handler using the `onselect` property (but note that this replaces other event listeners added using `onselect`, if any):

```js
input.onselect = logSelection;
```
