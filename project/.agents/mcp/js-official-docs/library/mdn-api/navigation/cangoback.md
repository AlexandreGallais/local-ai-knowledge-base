---
title: "Navigation: canGoBack property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/cangoback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: canGoBack property

The **`canGoBack`** read-only property of the
`Navigation` interface returns `true`
if it is possible to navigate backwards in the navigation history
(i.e., the `currentEntry` is
not the first one in the history entry list),
and `false` if it is not.

## Value

A boolean value: `true` if it is possible to navigate backwards in the navigation history, `false` otherwise.

## Examples

```js
async function backHandler() {
  if (navigation.canGoBack) {
    await navigation.back().finished;
    // Handle any required clean-up after
    // navigation has finished
  } else {
    displayBanner("You are on the first page");
  }
}

async function forwardHandler() {
  if (navigation.canGoForward) {
    await navigation.forward().finished;
    // Handle any required clean-up after
    // navigation has finished
  } else {
    displayBanner("You are on the last page");
  }
}
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
