---
title: "SharedStorageWorkletGlobalScope: register() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorageworkletglobalscope/register/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorageWorkletGlobalScope: register() method

The **`register()`** method of the
`SharedStorageWorkletGlobalScope` interface registers an `operation` defined inside the current worklet module.

## Syntax

```js
register(name, operationCtor)
```

### Parameters

- `name`
    A string representing the name with which you want to register the operation. When the operation is invoked (say via `WindowSharedStorage.run()` or `WindowSharedStorage.selectURL()`), this name is used to identify the operation you want to run.
- `operationCtor`
    A string representing the class name of the operation to be registered. This is the class constructor that is invoked when the operation is run.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if:
    - An operation has already been registered with the specified name.
    - The `operationCtor` is not a valid constructor.
    - The class does not contain a valid `run()` method.
    - The worklet module has not been added with `SharedStorageWorklet.addModule()`.

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

See the Shared Storage API landing page for a walkthrough of this example and for links to other examples.

> **Note:**
> It is possible to define and register multiple operations in the same shared storage worklet module script with different names; see `SharedStorageOperation` for an example.

## See also

- Shared Storage API
