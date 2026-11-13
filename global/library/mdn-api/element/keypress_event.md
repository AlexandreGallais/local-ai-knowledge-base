---
title: "Element: keypress event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/keypress_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: keypress event

The **`keypress`** event is fired when a letter, number, punctuation, or symbol key is pressed, or else when the `Enter` key is pressed — including when the `Enter` key is pressed in combination with the `Shift` key or `Ctrl` key. Otherwise, when a modifier key such as the `Alt`, `Shift`, `Ctrl`, `Meta`, `Esc`, or `Option` key is pressed in isolation, the `keypress` event is _not_ fired.

> **Warning:**
> Since this event has been deprecated, you should use `beforeinput` or `keydown` instead.

The event bubbles. It can reach `Document` and `Window`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("keypress", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onkeypress = (event) => { }
```

## Event type

A `KeyboardEvent`. Inherits from `UIEvent` and `Event`.

## Examples

### addEventListener keypress example

This example logs the `KeyboardEvent.code` value whenever you press a key after focusing the `` element.

To see which keys cause a `keypress` event to fire, and which keys don't, try pressing the following:

- letter keys, number keys, and punctuation keys
- symbol keys such as the `$`, `+`, `=`, `%`, and `+` keys
- modifier keys such as the `Alt`, `Shift`, `Ctrl`, `Meta`, `Esc`, `Option`, or `⌘` keys
- the `Enter` key
- the `Enter` key in combination with the `Shift` or `Ctrl` keys
- the `Enter` key in combination with modifier keys other than the `Shift` or `Ctrl` keys

```html
<div>
  <label for="sample">Focus the input and type something:</label>
  <input type="text" name="text" id="sample" />
</div>
<p id="log"></p>
```

```js
const log = document.getElementById("log");
const input = document.querySelector("input");

input.addEventListener("keypress", logKey);

function logKey(e) {
  log.textContent += ` ${e.code}`;
}
```

### Using the `onkeypress` event handler property

You can also use the `onkeypress` event handler property (but note that this replaces other event listeners added using `onkeypress`, if any):

```js
input.onkeypress = logKey;
```

## See also

- The `Document` interface, which the event also targets.
- Related events:
  - `input`
  - `keydown`
  - `keyup`
