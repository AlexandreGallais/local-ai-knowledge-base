---
title: "ServiceWorkerRegistration: getNotifications() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/getnotifications/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: getNotifications() method

The **`getNotifications()`** method of
the `ServiceWorkerRegistration` interface returns a list of the
notifications in the order that they were created from the current origin via the
current service worker registration. Origins can have many active but
differently-scoped service worker registrations. Notifications created by one service
worker on the same origin will not be available to other active service workers on
that same origin.

## Syntax

```js
getNotifications()
getNotifications(options)
```

### Parameters

- `options` (optional)
    An object containing options to filter the notifications returned. The available
    options are:
    - `tag` (optional)
        A string representing a notification tag. If
        specified, only notifications that have this tag will be returned.

### Return value

A `Promise` that resolves to a list of `Notification` objects.

## Examples

```js
navigator.serviceWorker.register("sw.js");

const options = { tag: "user_alerts" };

navigator.serviceWorker.ready.then((registration) => {
  registration.getNotifications(options).then((notifications) => {
    // do something with your notifications
  });
});
```
