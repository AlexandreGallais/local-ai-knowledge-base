---
title: "Navigation: forward() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/forward/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: forward() method

The **`forward()`** method of the
`Navigation` interface navigates forwards by one entry in the navigation history.

## Syntax

```js
forward(options)
```

### Parameters

- `options` (optional)
    An options object containing the following properties:
    - `info` (optional)
        Developer-defined information to be passed along to the `navigate` event, made available in `NavigateEvent.info`. This can be any data type. You might, for example, wish to display newly-navigated content with a different animation depending on how it was navigated to (swipe left, swipe right, or go home). A string indicating which animation to use could be passed in as `info`.

### Return value

An object with the following properties:

- `committed`
    A `Promise` which will fulfill when the visible URL has changed and a new `NavigationHistoryEntry` has been created.
- `finished`
    A `Promise` which will fulfill when all promises returned by the `NavigateEvent.intercept()` handler are fulfilled. This is equivalent to the `NavigationTransition.finished` promise fulfilling, when the `navigatesuccess` event fires.

Either one of these promises rejects if the navigation has failed for some reason.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `Navigation.currentEntry`'s `NavigationHistoryEntry.index` value is -1 or `navigation.entries().length - 1`, i.e., either the current `Document` is not yet active, or the current history entry is the last one in the history, meaning that forwards navigation is not possible, or if the current `Document` is unloading.

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
