---
title: "HashChangeEvent: newURL property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hashchangeevent/newurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HashChangeEvent: newURL property

The **`newURL`** read-only property of the
`HashChangeEvent` interface returns the new URL to which the window is
navigating.

## Value

A string.

## Examples

```js
window.addEventListener("hashchange", (event) => {
  console.log(`Hash changed to ${event.newURL}`);
});
```
