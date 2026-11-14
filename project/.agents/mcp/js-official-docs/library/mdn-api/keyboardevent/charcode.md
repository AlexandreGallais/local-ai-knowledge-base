---
title: "KeyboardEvent: charCode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/charcode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: charCode property

The **`charCode`** read-only property of the
`KeyboardEvent` interface returns the Unicode value of a character key
pressed during a `keypress` event.

> **Warning:**
> Do not use this property, as it is deprecated. Instead, get the
> Unicode value of the character using the `key`
> property.

## Value

A number that represents the Unicode value of the character key that was pressed.

## Examples

### HTML

```html
<p>Type anything into the input box below to log a <code>charCode</code>.</p>
<input type="text" />
<p id="log"></p>
```

### JavaScript

```js
const input = document.querySelector("input");
const log = document.querySelector("#log");

input.addEventListener("keypress", (e) => {
  log.innerText = `Key <example-value>: ${String.fromCharCode(e.charCode)}\ncharCode: ${
    e.charCode
  }`;
});
```

## Notes

- In a `keypress` event, the Unicode value of the key <example-value> is stored in
  either the `keyCode` or `charCode`
  property, but never both. If the key <example-value> generates a character (e.g., 'a'),
  `charCode` is set to the code of that character; `charCode`
  respects the letter case (in other words, `charCode` takes into account
  whether the `shift` key is held down). Otherwise, the code of the pressed key
  is stored in `keyCode`.
- `charCode` is never set in the `keydown` and
  `keyup` events. In these cases, `keyCode` is set instead.
- To get the code of the key <example-value> of whether it was stored in
  `keyCode` or `charCode`, query the `which` property.
- Characters entered through an Input method editor do not register through `keyCode` or
  `charCode`.
- For a list of the `charCode` values associated with particular keys, run
  Displaying event object properties and view the resulting HTML table.
