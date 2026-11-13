---
title: "MutationObserver: disconnect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationobserver/disconnect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationObserver: disconnect() method

The `MutationObserver` method
**`disconnect()`** tells the observer to stop watching for
mutations.

The observer can be reused by calling its
`observe()` method again.

## Syntax

```js
disconnect()
```

### Parameters

None.

### Return value

`undefined`.

> **Note:**
> All notifications of mutations that have already been
> _detected_, but _not yet reported_ to the observer, are discarded.
> To hold on to and handle the detected but unreported mutations, use
> the `takeRecords()` method.

## Usage notes

If the element being observed is removed from the DOM, and then subsequently released
by the browser's garbage collection mechanism, the `MutationObserver` will stop observing
the removed element. However, the `MutationObserver` itself can continue to exist to observe
other existing elements.

## Examples

This example creates an observer, then disconnects from it, leaving it available for
possible reuse.

```js
const targetNode = document.querySelector("#someElement");
const observerOptions = {
  childList: true,
  attributes: true,
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, observerOptions);

/* some time later… */

observer.disconnect();
```
