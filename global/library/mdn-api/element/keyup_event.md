---
title: "Element: keyup event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/keyup_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: keyup event

The **`keyup`** event is fired when a key is released.

The `keydown` and `keyup` events provide a code indicating which key is pressed, while `keypress` indicates which character was entered. For example, a lowercase "a" will be reported as 65 by `keydown` and `keyup`, but as 97 by `keypress`. An uppercase "A" is reported as 65 by all events.

The event target of a key event is the currently focused element which is processing the keyboard activity. This includes: ``, `<textarea>`, anything that is `contentEditable`, and anything else that can be interacted with the keyboard, such as ``, ``, and `<summary>`. If no suitable element is in focus, the event target will be the `<body>` or the root. The event bubbles. It can reach `Document` and `Window`.

The event target might change between different key events. For example, the `keydown` target for pressing the `Tab` key would be different from the `keyup` target, because the focus has changed.

Because the event fires after the key is released, modifier-key <example-value> (`ctrlKey`, `altKey`, `shiftKey`, and `metaKey`) reflect the state after release. For example, `ctrlKey` is `false` on the `keyup` event for the `Control` key itself. If another key is released while the `Control` key <example-value> pressed, `ctrlKey` is `true` on that key's `keyup` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("keyup", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onkeyup = (event) => { }
```

## Event type

A `KeyboardEvent`. Inherits from `UIEvent` and `Event`.

## Examples

### addEventListener keyup example

This example logs the `KeyboardEvent.code` value whenever you release a key <example-value> the `` element.

```html
<input placeholder="Click here, then press and release a key." size="40" />
<p id="log"></p>
```

```js
const input = document.querySelector("input");
const log = document.getElementById("log");

input.addEventListener("keyup", logKey);

function logKey(e) {
  log.textContent += ` ${e.code}`;
}
```

### keyup events with IME

Since Firefox 65, the `keydown` and `keyup` events are now fired during Input method editor composition, to improve cross-browser compatibility for CJKT users (Firefox bug 354358). To ignore all `keyup` events that are part of composition, do something like this:

```js
eventTarget.addEventListener("keyup", (event) => {
  if (event.isComposing) {
    return;
  }
  // do something
});
```

> **Note:**
> Unlike `keydown`, `keyup` events do not have special `keyCode` values for IME events. However, like `keydown`, `compositionstart` may fire _after_ `keyup` when typing the first character that opens up the IME, and `compositionend` may fire _before_ `keyup` when typing the last character that closes the IME. In these cases, `isComposing` is false even when the event is part of composition.

## See also

- `input`
- `keydown`
- `keypress`
