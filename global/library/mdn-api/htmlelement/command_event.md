---
title: "HTMLElement: command event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/command_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: command event

The **`command`** event of the `HTMLElement` interface fires on an element that is controlled via a `button` with valid `commandForElement` and `command` values, whenever the button is interacted with (e.g., it is clicked).

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("command", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncommand = (event) => { }
```

## Event type

A `CommandEvent`. Inherits from `Event`.

## Examples

### Basic <example-value>

```js
const popover = document.getElementById("mypopover");

// …

popover.addEventListener("command", (event) => {
  if (event.command === "show-popover") {
    console.log("Popover is about to be shown");
  }
});
```

### Event dispatch and cancellation

It is worth pointing out that `command` events fire on the element being invoked. If the button is clicked, it will first dispatch a `click` event which, if canceled, then the `command` event will not fire and the default behavior will not be run.
In addition to canceling the `click` event on the button, it is also possible to cancel the `command` event.

For example:

```js
button.addEventListener("click", (event) => {
  event.preventDefault(); // the `command` event will never fire
});
```

```js
element.addEventListener("command", (event) => {
  event.preventDefault(); // the `command` event fires but the default behavior is canceled
});
```

## See also

- `Invoker Commands API`
- `HTMLButtonElement.command`
- `HTMLButtonElement.commandForElement`
