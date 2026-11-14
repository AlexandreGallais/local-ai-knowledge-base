---
title: "HTMLElement: toggle event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/toggle_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: toggle event

The **`toggle`** event of the `HTMLElement` interface fires on a `popover` element, `<dialog>` element, or `` element just after it is shown or hidden.

- If the element is transitioning from hidden to showing, the `event.oldState` property will be set to `closed` and the `event.newState` property will be set to `open`.
- If the element is transitioning from showing to hidden, then `event.oldState` will be `open` and `event.newState` will be `closed`.

This event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("toggle", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontoggle = (event) => { }
```

## Event type

A `ToggleEvent`. Inherits from `Event`.

## Examples

The example code below demonstrates how the `toggle` event might be used for `popover`.
The same code is might be used for a `<dialog>` or `` elements in the same way.

### Basic <example-value>

This example shows how to listen for the `toggle` event and log the result.

#### HTML

The HTML consists of a popover and a button for toggling it open and closed.

```html
<button popovertarget="mypopover">Toggle the popover</button>
<div id="mypopover" popover>Popover content</div>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 150px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

#### JavaScript

The code adds an event listener for the `toggle` event and logs the state.

```js
const popover = document.getElementById("mypopover");

popover.addEventListener("toggle", (event) => {
  if (event.newState === "open") {
    log("Popover has been shown");
  } else {
    log("Popover has been hidden");
  }
});
```

#### Result

### A note on toggle event coalescing

If multiple `toggle` events are fired before the event loop has a chance to cycle, only a single event will be fired.
This is referred to as "event coalescing".

For example:

```js
popover.addEventListener("toggle", () => {
  // …
});

popover.showPopover();
popover.hidePopover();
// `toggle` only fires once
```

### Other examples

- Opening a modal dialog example in `HTMLDialogElement`

## See also

- `popover` HTML global attribute
- Popover API
- Related event: `beforetoggle`
