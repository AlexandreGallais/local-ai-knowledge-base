---
title: "SharedWorkerGlobalScope: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedworkerglobalscope/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedWorkerGlobalScope: name property

The **`name`** read-only property of the
`SharedWorkerGlobalScope` interface returns the name that the
`SharedWorker` was (optionally) given when it was created. This is the name
that the `SharedWorker()` constructor can pass
to get a reference to the `SharedWorkerGlobalScope`.

## Value

A string.

## Examples

If a shared worker is created using a constructor with a `name` option:

```js
const myWorker = new SharedWorker("worker.js", { name: "mySharedWorker" });
```

the `SharedWorkerGlobalScope` will now have a name of "mySharedWorker",
returnable by running

```js
self.name;
```

from inside the shared worker.

## See also

- `SharedWorkerGlobalScope`
