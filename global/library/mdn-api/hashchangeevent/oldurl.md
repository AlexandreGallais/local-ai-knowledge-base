---
title: "HashChangeEvent: oldURL property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hashchangeevent/oldurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HashChangeEvent: oldURL property

The **`oldURL`** read-only property of the
`HashChangeEvent` interface returns the previous URL from which the window
was navigated.

## Value

A string.

## Examples

```js
window.addEventListener("hashchange", (event) => {
  console.log(`Hash changed from ${event.oldURL}`);
});
```
