---
title: "WorkerGlobalScope: self property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/self/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: self property

The **`self`** read-only property of the `WorkerGlobalScope` interface returns a reference to the `WorkerGlobalScope` itself. Most of the time it is a specific scope like `DedicatedWorkerGlobalScope`, `SharedWorkerGlobalScope`, or `ServiceWorkerGlobalScope`.

## Value

A global scope object (differs depending on the type of worker you are dealing with, as indicated above).

## Examples

If you called

```js
console.log(self);
```

inside a worker, you will get a worker global scope of the same type as that worker object written to the console — something like the following:

```plain
DedicatedWorkerGlobalScope {
undefined: undefined, Infinity: Infinity, Math: MathConstructor, NaN: NaN, Intl: Object…}
    Infinity: Infinity
    Array: function Array() { [native code] }
      arguments: null
      caller: null
      isArray: function isArray() { [native code] }
      length: 1
      name: "Array"
      observe: function observe() { [native code] }
      prototype: Array[0]
      unobserve: function unobserve() { [native code] }
      __proto__: function Empty() {}
      <function scope>
    ArrayBuffer: function ArrayBuffer() { [native code] }
    Blob: function Blob() { [native code] }
    Boolean: function Boolean() { [native code] }
    DataView: function DataView() { [native code] }
    Date: function Date() { [native code] }
    DedicatedWorkerGlobalScope: function DedicatedWorkerGlobalScope() { [native code] }
    Error: function Error() { [native code] }
// etc. etc.
```

This provides a full list of the objects available to that worker scope, so it is quite a useful test if you want to see whether something is available to your worker or not. We also maintain a list of Functions and classes available to Web Workers.

## See also

- `WorkerGlobalScope`
