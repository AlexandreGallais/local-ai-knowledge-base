---
title: "HTMLButtonElement: commandForElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/commandforelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: commandForElement property

The **`commandForElement`** property of the `HTMLButtonElement` interface gets and sets the element to control via a button.

It is the JavaScript equivalent of the `commandfor` HTML attribute.

## Value

A reference to an existing `Element` that the button controls.

## Examples

```js
const popover = document.getElementById("mypopover");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.commandForElement = popover;
```

## See also

- `Invoker Commands API`
- `HTMLButtonElement.command`
- `CommandEvent`
