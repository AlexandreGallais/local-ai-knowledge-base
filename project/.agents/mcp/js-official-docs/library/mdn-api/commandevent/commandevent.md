---
title: "CommandEvent: CommandEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/commandevent/commandevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CommandEvent: CommandEvent() constructor

The **`CommandEvent()`** constructor creates a new `CommandEvent` object.

## Syntax

```js
new CommandEvent(type)
new CommandEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `command`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `source` (optional)
        An `HTMLButtonElement` representing the button that was interacted with to cause this event. This can be any element but we recommend only using button as a source to avoid surprises.
    - `command` (optional)
        A string containing the command for the controlled element to take. While manually instantiating a `CommandEvent` it is possible to use any string value, but it is recommended to use one of the built-in names or prefix with two dashes (`--`) to ensure forward compatibility.

### Return value

A new `CommandEvent` object.

## See also

- `Invoker Commands API`
- `HTMLButtonElement.command`
- `HTMLButtonElement.commandForElement`
- `CommandEvent`
