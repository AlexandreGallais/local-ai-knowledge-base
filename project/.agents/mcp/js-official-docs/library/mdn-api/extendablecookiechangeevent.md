---
title: "ExtendableCookieChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/extendablecookiechangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ExtendableCookieChangeEvent

The **`ExtendableCookieChangeEvent`** interface of the `Cookie Store API` is the event type passed to `cookiechange` event fired at the `ServiceWorkerGlobalScope` when any cookie changes occur which match the service worker's cookie change subscription list. A cookie change event consists of a cookie and a type (either "changed" or "deleted").

Cookie changes that cause the `ExtendableCookieChangeEvent` to be dispatched are:

- A cookie is newly created and not immediately removed, or if a cookies is replaced.
  In this case `type` is "changed".
- A cookie is newly created and immediately removed.
  In this case `type` is "deleted"
- A cookie is removed. In this case `type` is "deleted".

## Constructor

- `ExtendableCookieChangeEvent()`
    Creates a new `ExtendableCookieChangeEvent`.

## Instance properties

_This interface also inherits properties from `ExtendableEvent`._

- `ExtendableCookieChangeEvent.changed` (read-only)
    Returns an array containing the changed cookies.
- `ExtendableCookieChangeEvent.deleted` (read-only)
    Returns an array containing the deleted cookies.

## Instance methods

_This interface also inherits methods from `ExtendableEvent`._

## Examples

In the below example, we use `CookieStoreManager.getSubscriptions()` to get a list of existing subscriptions. (In service workers, a subscription is required in order to listen for events.) We unsubscribe from existing subscriptions using `CookieStoreManager.unsubscribe()`, then subscribe to the cookie with a name of 'COOKIE_NAME' using `CookieStoreManager.subscribe()`. If that cookie is changed, the event listener logs the event to the console. This will be an `ExtendableCookieChangeEvent` object, with the `changed` or `deleted` property containing the modified cookie.

```js
self.addEventListener("activate", (event) => {
  event.waitUntil(async () => {
    const subscriptions = await self.registration.cookies.getSubscriptions();

    await self.registration.cookies.unsubscribe(subscriptions);

    await self.registration.cookies.subscribe([
      {
        name: "COOKIE_NAME",
      },
    ]);
  });
});

self.addEventListener("cookiechange", (event) => {
  console.log(event);
});
```
