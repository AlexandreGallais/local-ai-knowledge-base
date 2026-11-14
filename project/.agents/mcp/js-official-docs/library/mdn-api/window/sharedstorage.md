---
title: "Window: sharedStorage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/sharedstorage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: sharedStorage property

The global read-only **`sharedStorage`** property returns the `WindowSharedStorage` object for the current origin. This is the main entry point for writing data to shared storage using the Shared Storage API.

> **Note:**
> `sharedStorage` is not available inside workers. It is implemented by `Window` and is also available in shared storage worklets (see `SharedStorageWorkletGlobalScope.sharedStorage`, which returns `WorkletSharedStorage`).

## Value

A `WindowSharedStorage` object instance.

## Examples

```js
window.sharedStorage
  .set("ab-testing-group", "0")
  .then(() => console.log("Value saved to shared storage"));
```

## See also

- `WindowSharedStorage`
- Shared Storage API
