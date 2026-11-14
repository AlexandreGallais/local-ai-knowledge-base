---
title: "WorkerGlobalScope: fonts property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/fonts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: fonts property

The **`fonts`** read-only property of the `WorkerGlobalScope` interface returns the `FontFaceSet` interface of the worker.

This property is part of the CSS Font Loading API.

## Value

The returned value is the `FontFaceSet` interface of the worker.
The `FontFaceSet` interface is useful for loading new fonts, checking the status of previously loaded fonts etc.

## Examples

### Doing operation after all fonts are loaded

```js
fonts.ready.then(() => {
  // Any operation that needs to be done only after all the fonts
  // have finished loading can go here.
});
```

## See also

- `FontFaceSet` interface
- `FontFace`
