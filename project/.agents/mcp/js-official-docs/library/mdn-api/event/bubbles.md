---
title: "Event: bubbles property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/event/bubbles/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Event: bubbles property

The **`bubbles`** read-only property of the `Event` interface indicates whether the event bubbles up through the DOM tree or not.

> **Note:**
> See Event bubbling for more information on bubbling.

## Value

A boolean value, which is `true` if the event bubbles up through the DOM tree.

## Example

```js
function handleInput(e) {
  // Check whether the event bubbles passes the event along
  if (!e.bubbles) {
    passItOn(e);
  }

  // Already bubbling
  doOutput(e);
}
```

## See also

- `stopPropagation()` to prevent further propagation of the current event in the capturing and bubbling phases
- `stopImmediatePropagation()` to not call any further listeners for the same event at the same level in the DOM
- `preventDefault()` to allow propagation to continue but to disallow the browser to perform its default action should no listeners handle the event
