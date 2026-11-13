---
title: "SharedStorageWorkletGlobalScope: sharedStorage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorageworkletglobalscope/sharedstorage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorageWorkletGlobalScope: sharedStorage property

The **`context`** read-only property of the
`SharedStorageWorkletGlobalScope` interface contains a `WorkletSharedStorage` object instance, which represents the shared storage for a particular origin as exposed to a worklet context.

## Value

A `WorkletSharedStorage` object instance.

## Examples

```js
// ab-testing-worklet.js
class SelectURLOperation {
  async run(urls, data) {
    // Read the user's experiment group from shared storage
    const experimentGroup = await this.sharedStorage.get("ab-testing-group");

    // Return the group number
    return experimentGroup;
  }
}

register("ab-testing", SelectURLOperation);
```

## See also

- Shared Storage API
