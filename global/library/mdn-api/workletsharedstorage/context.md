---
title: "WorkletSharedStorage: context property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workletsharedstorage/context/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkletSharedStorage: context property

The **`context`** read-only property of the `WorkletSharedStorage` interface contains contextual data passed into the shared storage worklet from the associated browsing context via the `FencedFrameConfig.setSharedStorageContext()` method.

## Value

A string representing the data. The value will match the latest value that was passed into the `FencedFrameConfig.setSharedStorageContext()` method prior to navigation to the `FencedFrameConfig`. If no value was set by `setSharedStorageContext()` prior to navigation, then `context` will return `undefined`.

## Examples

See the main `WorkletSharedStorage` page for an example.

## Specifications

The `context` property is not currently defined in a specification.

## See also

- Shared Storage API
