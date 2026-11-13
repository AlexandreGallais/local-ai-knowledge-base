---
title: "SharedStorageWorkletGlobalScope"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorageworkletglobalscope/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorageWorkletGlobalScope

The **`SharedStorageWorkletGlobalScope`** interface of the `Shared Storage API` represents the global scope of a `SharedStorageWorklet` module.

## Instance properties

- `sharedStorage` (read-only) (deprecated) (non-standard)
    Contains an instance of the `WorkletSharedStorage` object, representing the shared storage for a particular origin as exposed in a worklet context.

## Instance methods

- `register()` (deprecated) (non-standard)
    Registers an `operation` defined inside the current worklet module.

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

See the Shared Storage API landing page for a walkthrough of this example and links to other examples.

## See also

- Shared Storage API
