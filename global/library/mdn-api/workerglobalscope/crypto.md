---
title: "WorkerGlobalScope: crypto property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/crypto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: crypto property

The **`crypto`** read-only property of the `WorkerGlobalScope` interface returns the `Crypto` object for this worker. This object gives workers access to certain cryptographic related services.

Although the property itself is read-only, all of its methods (and the methods of its
child object, `SubtleCrypto`) are not read-only, and therefore vulnerable
to attack by polyfill.

Although `crypto` is available on all workers, the returned `Crypto` object only has one usable feature in insecure contexts: the `getRandomValues()` method. In general, you should use this API only in secure contexts.

## Value

An instance of the `Crypto` interface, providing access to general-purpose cryptography and a strong random-number generator.

## Examples

See the example on the page for `Window.crypto`, which uses the `crypto` property to access the `getRandomValues()` method.

## See also

- The `Crypto` interface
- `Window.crypto`
