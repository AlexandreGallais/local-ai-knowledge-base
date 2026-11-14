---
title: "SharedWorker: port property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedworker/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedWorker: port property

The **`port`** property of the `SharedWorker`
interface returns a `MessagePort` object used to communicate and control
the shared worker.

## Value

A `MessagePort` object.

## Examples

The following code snippet shows creation of a `SharedWorker` object using
the `SharedWorker()` constructor. Multiple
scripts can then access the worker through a `MessagePort` object accessed
using the `SharedWorker.port` property — the port is started using its
`start()` method:

```js
const myWorker = new SharedWorker("worker.js");
myWorker.port.start();
```

For a full example, see our Basic <example-value> worker example (run shared worker.)

## See also

- `SharedWorker`
