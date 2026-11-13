---
title: "CookieStoreManager: subscribe() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cookiestoremanager/subscribe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CookieStoreManager: subscribe() method

The **`subscribe()`** method of the `CookieStoreManager` interface subscribes a `ServiceWorkerRegistration` to cookie change events.

Duplicate subscriptions are ignored: that is, if a service worker subscribes more than once to the same cookie, it will only receive each change notification once.

## Syntax

```js
subscribe(subscriptions)
```

### Parameters

- `subscriptions`
    An array of objects, each of which has the following properties:
    - `name` (optional)
        A string equal to the name of a cookie. If `name` is omitted, the service worker is subscribed to change events for all cookies that are in scope.
    - `url` (optional)
        A string equal to the URL of a cookie scope. This may be narrower than the scope of the service worker registration. If `url` is omitted, it defaults to the scope of the service worker registration.

### Return value

A `Promise` that resolves with `undefined` when the subscription completes.

### Exceptions

- `TypeError`
    Thrown if the `url` is not a valid URL, or doesn't start with the service worker registration's `scope`.

## Examples

### Setting name and URL

In this example, the `ServiceWorkerRegistration` represented by `registration` is subscribing to change events on the cookie named `"cookie1"` with a scope of `"/path1"`.

```js
// Subscribe to a specific cookie and URL
const subscriptions = [{ name: "cookie1", url: `/path1` }];
await registration.cookies.subscribe(subscriptions);
```

### Setting name only

In this example, we set only `name` and omit `url`: the subscription applies to all cookies named `cookie1` within the service worker's scope.

```js
// Subscribe to all cookies named "cookie1" in the registration scope
await registration.cookies.subscribe([{ name: "cookie1" }]);
```

### Setting URL only

In this example we set only `url`, and omit `name`: the subscription applies to all cookies within the specified URL scope.

```js
// Subscribe to all cookie changes within a specific path
await registration.cookies.subscribe([{ url: "/path/one/" }]);
```

### Subscribing to all cookies

In this example, both `name` and `url` are omitted. The subscription applies to all cookies within the service worker's scope.

```js
// Subscribe to all cookie changes within the entire registration scope
await registration.cookies.subscribe([{}]);
```

### Setting a URL outside the service worker's scope

If the URL is outside the service worker's scope, `subscribe()` will throw a `TypeError`.

```js
await registration.cookies.subscribe([
  { name: "cookie1", url: "/out-of-scope/" },
]);
```
