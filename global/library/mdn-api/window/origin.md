---
title: "Window: origin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/origin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: origin property

The **`origin`** read-only property of the `Window` interface returns the origin of the global scope, serialized as a string.

## Value

A string.

## Examples

Executed from inside window scope, the following snippet will log the document's global scope's origin to the console.

```js
console.log(window.origin); // On this page returns 'https://developer.mozilla.org'
```

If the origin is not a scheme/host/port tuple (say you are trying to run it locally, i.e., via `file://` URL), `origin` will return the string `"null"`.

## See also

- `WorkerGlobalScope.origin`
- origin glossary term
