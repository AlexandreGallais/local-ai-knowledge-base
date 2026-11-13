---
title: "Document: hidden property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/hidden/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: hidden property

The **`Document.hidden`** read-only property returns a Boolean value indicating if the page is considered hidden or not.
This can be used to check whether the document is in the background or in a minimized window, or is otherwise not visible to the user.

The `Document.visibilityState` property provides an alternative way to determine whether the page is hidden.

## Value

A Boolean value, `true` if the page is hidden, and `false` otherwise.

## Examples

```js
document.addEventListener("visibilitychange", () => {
  console.log(document.hidden);
  // Modify behavior…
});
```

## See also

- `Document.visibilityState`
