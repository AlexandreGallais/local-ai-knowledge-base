---
title: "CookieStoreManager: unsubscribe() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cookiestoremanager/unsubscribe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CookieStoreManager: unsubscribe() method

The **`unsubscribe()`** method of the `CookieStoreManager` interface stops the `ServiceWorkerRegistration` from receiving previously subscribed events.

## Syntax

```js
unsubscribe(subscriptions)
```

### Parameters

- `subscriptions`
    An object list, each object containing:
    - `name`
        A string with the name of a cookie.
    - `url`
        A string with the url of the scope used to subscribe to this cookie.

### Return value

A `Promise` that resolves with `undefined` when the service worker has been unsubscribed.

### Exceptions

- `TypeError`
    Thrown if the URL passed in `subscriptions` does not match the service worker registration's `scope`.

## Examples

In this example, the `ServiceWorkerRegistration` represented by `registration` is unsubscribing from change events on the cookie named `"cookie1"` with a scope of `"/path1"`.

```js
const subscriptions = [{ name: "cookie1", url: `/path1` }];
await registration.cookies.unsubscribe(subscriptions);
```
