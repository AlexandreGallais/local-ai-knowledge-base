---
title: "MutationObserver"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationObserver

The **`MutationObserver`** interface provides the ability to watch for changes being made to the DOM tree. It is designed as a replacement for the older Mutation Events feature, which was part of the DOM3 Events specification.

## Constructor

- `MutationObserver()`
    Creates and returns a new `MutationObserver` which will invoke a specified callback function when DOM changes occur.

## Instance methods

- `disconnect()`
    Stops the `MutationObserver` instance from receiving further notifications until and unless `observe()` is called again.
- `observe()`
    Configures the `MutationObserver` to begin receiving notifications through its callback function when DOM changes matching the given options occur.
- `takeRecords()`
    Removes all pending notifications from the `MutationObserver`'s notification queue and returns them in a new `Array` of `MutationRecord` objects.

## Example

The following example was adapted from this blog post.

```js
// Select the node that will be observed for mutations
const targetNode = document.getElementById("some-id");

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
observer.disconnect();
```

## See also

- `PerformanceObserver`
- `ResizeObserver`
- `IntersectionObserver`
- A brief overview
- A more in-depth discussion
- A screencast by Chromium developer Rafael Weinstein
