---
title: "SharedStorageWorklet"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorageworklet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorageWorklet

The **`SharedStorageWorklet`** interface of the `Shared Storage API` represents the shared storage worklet for the current origin.

`SharedStorageWorklet` does not have its own properties or methods. Rather, it inherits the `addModule()` method from the `Worklet` interface. This method is used for adding a module.

Unlike a regular `Worklet`:

- If the calling site has not included the Shared Storage API in a privacy sandbox enrollment process, calls to `sharedStorageWorklet.addModule()` will be rejected.
- `SharedStorageWorklet` allows only a single module to be added, for privacy reasons. Even with a successful enrollment, repeated calls to `addModule()` on the same shared storage worklet will be rejected.

`SharedStorageWorklet` is accessed via `WindowSharedStorage.worklet`.

## Examples

```js
// Randomly assigns a user to a group 0 or 1
function getExperimentGroup() {
  return Math.round(Math.random());
}

async function injectContent() {
  // Add the module to the shared storage worklet
  await window.sharedStorage.worklet.addModule("ab-testing-worklet.js");

  // Assign user to a random group (0 or 1) and store it in shared storage
  window.sharedStorage.set("ab-testing-group", getExperimentGroup(), {
    ignoreIfPresent: true,
  });

  // Run the URL selection operation
  const fencedFrameConfig = await window.sharedStorage.selectURL(
    "ab-testing",
    [
      { url: `https://your-server.example/content/default-content.html` },
      { url: `https://your-server.example/content/experiment-content-a.html` },
    ],
    {
      resolveToConfig: true,
    },
  );

  // Render the chosen URL into a fenced frame
  document.getElementById("content-slot").config = fencedFrameConfig;
}

injectContent();
```

See the Shared Storage API landing page for a walkthrough of this example and links to other examples.

## See also

- Shared Storage API
