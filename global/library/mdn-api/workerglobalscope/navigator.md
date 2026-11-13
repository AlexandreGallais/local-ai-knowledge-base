---
title: "WorkerGlobalScope: navigator property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/navigator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: navigator property

The **`navigator`** read-only property of the `WorkerGlobalScope` interface returns the `WorkerNavigator` associated with the worker. It is a specific navigator object, mostly a subset of the `Navigator` for browsing scopes, but adapted to workers.

## Value

A `WorkerNavigator` object.

## Examples

If you call the following:

```js
console.log(navigator);
```

inside a worker (which would basically be the equivalent of `self.console.log(self.navigator);`, as these are being called on the worker scope, which can be referenced with `WorkerGlobalScope.self`), you will get a `WorkerNavigator` object written to the console — something like the following:

```plain
Object {onLine: true, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) Ap…ML, like Gecko) Chrome/40.0.2214.93 Safari/537.36", product: "Gecko", platform: "MacIntel", appVersion: "5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKi…ML, like Gecko) Chrome/40.0.2214.93 Safari/537.36"…}
    appCodeName: "Mozilla"
    appName: "Netscape"
    appVersion: "5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36"
    hardwareConcurrency: 4
    onLine: true
    platform: "MacIntel"
    product: "Gecko"
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36"
    __proto__: Object
```

You could use this navigator object to return more information about the runtime environment, as you might do with a normal `Navigator` object.

## See also

- `WorkerNavigator`
