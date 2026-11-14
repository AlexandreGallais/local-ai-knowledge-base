---
title: "WindowClient: navigate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowclient/navigate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowClient: navigate() method

The **`navigate()`** method of the `WindowClient`
interface loads a specified URL into a controlled client page then returns a
`Promise` that resolves to the existing `WindowClient`.

## Syntax

```js
navigate(url)
```

### Parameters

- `url`
    The location to navigate to.

### Return value

A `Promise` that resolves to the existing `WindowClient` if the URL is from the same origin as the service worker, or `null` otherwise.
