---
title: "Element: keydown event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/keydown_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: keydown event

The **`keydown`** event is fired when a key is pressed.

Unlike the deprecated `keypress` event, the `keydown` event is fired for all keys, regardless of whether they produce a character value.

The `keydown` and `keyup` events provide a code indicating which key is pressed, while `keypress` indicates which character was entered. For example, a lowercase "a" will be reported as 65 by `keydown` and `keyup`, but as 97 by `keypress`. An uppercase "A" is reported as 65 by all events.

The event target of a key event is the currently focused element which is processing the keyboard activity. This includes: ``, `<textarea>`, anything that is `contentEditable`, and anything else that can be interacted with the keyboard, such as ``, ``, and `<summary>`. If no suitable element is in focus, the event target will be the `<body>` or the root. The event bubbles. It can reach `Document` and `Window`.

The event target might change between different key events. For example, the `keydown` target for pressing the `Tab` key would be different from the `keyup` target, because the focus has changed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("keydown", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onkeydown = (event) => { }
```

## Event type

A `KeyboardEvent`. Inherits from `UIEvent` and `Event`.

## Examples

### addEventListener keydown example

This example logs the `KeyboardEvent.code` value whenever you press down a key <example-value> the `` element.

```html
<input placeholder="Click here, then press down a key." size="40" />
<p id="log"></p>
```

```js
const input = document.querySelector("input");
const log = document.getElementById("log");

input.addEventListener("keydown", logKey);

function logKey(e) {
  log.textContent += ` ${e.code}`;
}
```

### keydown events with IME

Since Firefox 65, the `keydown` and `keyup` events are now fired during Input method editor composition, to improve cross-browser compatibility for CJKT users (Firefox bug 354358). To ignore all `keydown` events that are part of composition, do something like this (229 is a special value set for a `keyCode` relating to an event that has been processed by an IME):

```js
eventTarget.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  // do something
});
```

> **Note:**
> `compositionstart` may fire _after_ `keydown` when typing the first character that opens up the IME, and `compositionend` may fire _before_ `keydown` when typing the last character that closes the IME. In these cases, `isComposing` is false even when the event is part of composition. However, `KeyboardEvent.keyCode` is still `229` in these cases, so it's still advisable to check `keyCode` as well, although it's deprecated.

## See also

- `input`
- `keypress`
- `keyup`
