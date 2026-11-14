---
title: "CommandEvent: command property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/commandevent/command/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CommandEvent: command property

The **`command`** read-only property of the `CommandEvent` interface returns a string containing the value of the `command` property at the time the event was dispatched.

## Value

A string.

## Examples

In the following simple example we've set up an event listener to listen for the "show-modal" command:

```js
document.body.addEventListener(
  "command",
  (event) => {
    const theAction = event.command;

    if (theAction === "show-modal") {
      console.log("Showing modal dialog");
    }
  },
  { capture: true },
);
```

## See also

- `Invoker Commands API`
- `HTMLButtonElement.command`
- `HTMLButtonElement.commandForElement`
