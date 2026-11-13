---
title: "MouseEvent: button property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/button/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: button property

The **`MouseEvent.button`** read-only property indicates which button was pressed or released on the mouse to trigger the event.

This property only guarantees to indicate which buttons are pressed or released during events caused by pressing or releasing one or multiple buttons.
As such, it is not reliable for events such as `mouseenter`, `mouseleave`, `mouseover`, `mouseout`, or `mousemove`.

Users may change the configuration of buttons on their pointing device so that if an event's button property is zero, it may not have been caused by the button that is physically left–most on the pointing device; however, it should behave as if the left button was clicked in the standard button layout.

> **Note:**
> Do not confuse this property with the `MouseEvent.buttons` property, which indicates which buttons are pressed for all mouse events types.

## Value

A number representing a given button:

- `0`: Main button, usually the left button or the un-initialized
  state
- `1`: Auxiliary button, usually the wheel button or the middle
  button (if present)
- `2`: Secondary button, usually the right button
- `3`: Fourth button, typically the _Browser Back_ button
- `4`: Fifth button, typically the _Browser Forward_ button

As noted above, buttons may be configured differently to the standard "left to right" layout.
A mouse configured for left-handed use may have the button actions reversed.
Some pointing devices only have one button and use keyboard or other input mechanisms to indicate main, secondary, auxiliary, etc.
Others may have many buttons mapped to different functions and button values.

## Examples

### HTML

```html
<button id="button">Click here with your mouse…</button>
<p id="log"></p>
```

### JavaScript

```js
const button = document.querySelector("#button");
const log = document.querySelector("#log");
button.addEventListener("mouseup", (e) => {
  switch (e.button) {
    case 0:
      log.textContent = "Left button clicked.";
      break;
    case 1:
      log.textContent = "Middle button clicked.";
      break;
    case 2:
      log.textContent = "Right button clicked.";
      break;
    default:
      log.textContent = `Unknown button code: ${e.button}`;
  }
});
button.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
```

## See also

- `MouseEvent`
