---
title: "StorageManager: estimate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storagemanager/estimate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageManager: estimate() method

The **`estimate()`** method of the `StorageManager` interface asks the Storage Manager for how much storage the current origin takes up (`usage`), and how much space is available (`quota`).

This method operates asynchronously, so it returns a `Promise` which resolves once the information is available. The promise's fulfillment handler is called with an object containing the usage and quota data.

## Syntax

```js
estimate()
```

### Parameters

None.

### Return value

A `Promise` that resolves to an object with the following properties:

- `quota`
    A numeric value in bytes which provides a conservative approximation of the total storage the user's device or computer has available for the site origin or Web app. It's possible that there's more than this amount of space available though you can't rely on that being the case.
- `usage`
    A numeric value in bytes approximating the amount of storage space currently being used by the site or Web app, out of the available space as indicated by `quota`. Unit is byte.
- `usageDetails` (non-standard)
    An object containing a breakdown of `usage` by storage system. All included properties will have a `usage` greater than 0 and any storage system with 0 `usage` will be excluded from the object.

> **Note:**
> The returned values are not exact: between compression, deduplication, and obfuscation for security reasons, they will be imprecise.

You may find that the `quota` varies from origin to origin. This variance is based on factors such as:

- How often the user visits
- Public site popularity data
- User engagement signals like bookmarking, adding to homescreen, or accepting push notifications

### Exceptions

- `TypeError`
    Thrown if obtaining a local storage shelf failed. For example, if the current origin is an opaque origin or if the user has disabled storage.

## Examples

In this example, we obtain the usage estimates and present the percentage of storage capacity currently used to the user.

### HTML

```html
You're currently using about <span id="percent"></span>% of your estimated
storage quota (<span id="quota"></span>).
```

### JavaScript

```js
navigator.storage.estimate().then((estimate) => {
  document.getElementById("percent").textContent = (
    (estimate.usage / estimate.quota) *
    100
  ).toFixed(2);
  document.getElementById("quota").textContent =
    `${(estimate.quota / 1024 / 1024).toFixed(2)}MB`;
});
```

## See also

- Storage API
- `Storage`, the object returned by `Window.localStorage`
- `StorageManager`
- `navigator.storage`
