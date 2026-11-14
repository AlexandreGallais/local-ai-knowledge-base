---
title: "PushManager"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmanager/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushManager

The **`PushManager`** interface of the Push API provides a way to receive notifications from third-party servers as well as request URLs for push notifications.

This interface is accessed via the `ServiceWorkerRegistration.pushManager` property.

## Static properties

- `PushManager.supportedContentEncodings` (read-only)
    Returns an array of supported content codings that can be used to encrypt the payload of a push message.

## Instance methods

- `PushManager.getSubscription()`
    Retrieves an existing push subscription. It returns a `Promise` that resolves to a `PushSubscription` object containing details of an existing subscription. If no existing subscription exists, this resolves to a `null` value.
- `PushManager.permissionState()`
    Returns a `Promise` that resolves to the permission state of the current `PushManager`, which will be one of `'granted'`, `'denied'`, or `'prompt'`.
- `PushManager.subscribe()`
    Subscribes to a push service. It returns a `Promise` that resolves to a `PushSubscription` object containing details of a push subscription. A new push subscription is created if the current service worker does not have an existing subscription.

### Deprecated methods

- `PushManager.hasPermission()` (deprecated) (non-standard)
    Returns a `Promise` that resolves to the `PushPermissionStatus` of the requesting webapp, which will be one of `granted`, `denied`, or `default`. Replaced by `PushManager.permissionState()`.
- `PushManager.register()` (deprecated) (non-standard)
    Subscribes to a push subscription. Replaced by `PushManager.subscribe()`.
- `PushManager.registrations()` (deprecated) (non-standard)
    Retrieves existing push subscriptions. Replaced by `PushManager.getSubscription()`.
- `PushManager.unregister()` (deprecated) (non-standard)
    Unregisters and deletes a specified subscription endpoint. In the updated API, a subscription is unregistered by calling the `PushSubscription.unsubscribe()` method.

## Example

```js
this.onpush = (event) => {
  console.log(event.data);
  // From here we can write the data to IndexedDB, send it to any open
  // windows, display a notification, etc.
};

navigator.serviceWorker
  .register("serviceworker.js")
  .then((serviceWorkerRegistration) => {
    serviceWorkerRegistration.pushManager.subscribe().then(
      (pushSubscription) => {
        console.log(pushSubscription.endpoint);
        // The push subscription details needed by the application
        // server are now available, and can be sent to it using,
        // for example, the fetch() API.
      },
      (error) => {
        console.error(error);
      },
    );
  });
```

## See also

- Push API
- Service Worker API
