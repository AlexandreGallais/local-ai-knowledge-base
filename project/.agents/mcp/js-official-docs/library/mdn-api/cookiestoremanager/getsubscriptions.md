---
title: "CookieStoreManager: getSubscriptions() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cookiestoremanager/getsubscriptions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CookieStoreManager: getSubscriptions() method

The **`getSubscriptions()`** method of the `CookieStoreManager` interface returns a list of all the cookie change subscriptions for this `ServiceWorkerRegistration`.

## Syntax

```js
getSubscriptions()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a list of objects, each containing:

- `name`
    A string with the name of a cookie.
- `url`
    A string with the url of the scope used to subscribe to the cookie(s).

## Examples

If the `ServiceWorkerRegistration` represented by `registration` has subscribed to any cookie change events, `subscriptions` will resolve to a list of objects containing the name and URL of those cookies.

```js
const subscriptions = await self.registration.cookies.getSubscriptions();
```
