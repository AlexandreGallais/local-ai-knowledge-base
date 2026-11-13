---
title: "WindowSharedStorage: worklet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowsharedstorage/worklet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowSharedStorage: worklet property

The **`worklet`** read-only property of the
`WindowSharedStorage` interface contains the `SharedStorageWorklet` instance representing the shared storage worklet for the current origin.

`SharedStorageWorklet` contains the `addModule()` method, which is used to add a module to the shared storage worklet.

## Value

A `SharedStorageWorklet` object.

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

See the Shared Storage API landing page for a walkthrough of this example and for links to other examples.

## See also

- Shared Storage API
