---
title: "CommandEvent: source property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/commandevent/source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CommandEvent: source property

The **`source`** read-only property of the `CommandEvent` interface returns an `EventTarget` representing the control that invoked the given command.

## Value

An `EventTarget` object. Usually an `HTMLButtonElement`.

## Examples

In the following simple example we've set up an event listener to add a temporary class to the button element upon a CommandEvent:

```js
document.body.addEventListener(
  "command",
  (event) => {
    const theButton = event.source;

    theButton.classList.add("just-pressed");

    setTimeout(() => {
      theButton.classList.remove("just-pressed");
    }, 1000);
  },
  { capture: true },
);
```

## See also

- `Invoker Commands API`
- `HTMLButtonElement.command`
- `HTMLButtonElement.commandForElement`
