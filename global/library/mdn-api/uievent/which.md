---
title: "UIEvent: which property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/uievent/which/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# UIEvent: which property

The **`UIEvent.which`** read-only property of the `UIEvent` interface returns a number that indicates which button was pressed on the mouse, or the numeric `keyCode` or the character code (`charCode`) of the key <example-value> on the keyboard.

## Value

### Value for KeyboardEvent (non-standard)

For `KeyboardEvent`, `event.which` contains the numeric code for a particular key <example-value>, depending on whether an alphanumeric or non-alphanumeric key was pressed.
Please see deprecated `KeyboardEvent.charCode` and `KeyboardEvent.keyCode` for more details.

> **Note:**
> Consider `KeyboardEvent.key` or `KeyboardEvent.code` for new code.

### Value for MouseEvent (non-standard)

For `MouseEvent`, `event.which` is a number representing a given button:

- `0`: No button
- `1`: Left button
- `2`: Middle button (if present)
- `3`: Right button

For a mouse configured for left-handed use, the button actions are reversed.
In this case, the values are read from right to left.

> **Note:**
> Consider `MouseEvent.button` for new code.

## Examples

```html
<p>Please press any key.</p>
```

```js
function showKeyPress(evt) {
  console.log(
    `onkeypress handler:\n` +
      `keyCode property: ${evt.keyCode}\n` +
      `which property: ${evt.which}\n` +
      `charCode property: ${evt.charCode}\n` +
      `Character Key <example-value>: ${String.fromCharCode(evt.charCode)}\n`,
  );
}

function keyDown(evt) {
  console.log(
    `onkeydown handler:\n` +
      `keyCode property: ${evt.keyCode}\n` +
      `which property: ${evt.which}\n`,
  );
}

document.addEventListener("keypress", showKeyPress);
document.addEventListener("keydown", keyDown);
```

## See also

- `KeyboardEvent`
- `MouseEvent`
