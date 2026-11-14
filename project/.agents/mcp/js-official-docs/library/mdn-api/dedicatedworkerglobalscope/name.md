---
title: "DedicatedWorkerGlobalScope: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dedicatedworkerglobalscope/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DedicatedWorkerGlobalScope: name property

The **`name`** read-only property of the
`DedicatedWorkerGlobalScope` interface returns the name that the
`Worker` was (optionally) given when it was created. This is the name that
the `Worker()` constructor can pass to get a reference to
the `DedicatedWorkerGlobalScope`.

## Value

A string.

## Examples

If a worker is created using a constructor with a `name` option:

```js
const myWorker = new Worker("worker.js", { name: "myWorker" });
```

the `DedicatedWorkerGlobalScope` will now have a name of "myWorker",
returnable by running

```js
self.name;
```

from inside the worker.

## See also

- `DedicatedWorkerGlobalScope`
