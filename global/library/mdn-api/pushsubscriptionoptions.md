---
title: "PushSubscriptionOptions"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushsubscriptionoptions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushSubscriptionOptions

The **`PushSubscriptionOptions`** interface of the `Push API` represents the options associated with a push subscription.

The read-only `PushSubscriptionOptions` object is returned by calling `PushSubscription.options` on a `PushSubscription`. This interface has no constructor of its own.

## Instance properties

- `PushSubscriptionOptions.userVisibleOnly` (read-only)
    A boolean value indicating that the returned push
    subscription will only be used for messages whose effect is made visible to the user.
- `PushSubscriptionOptions.applicationServerKey` (read-only)
    A public key your push server will use to send
    messages to client apps via a push server.

## Examples

Calling `PushSubscription.options` on a `PushSubscription` returns a `PushSubscriptionOptions` object. In the example below this is printed to the console.

```js
navigator.serviceWorker.ready.then((reg) => {
  reg.pushManager.getSubscription().then((subscription) => {
    const options = subscription.options;
    console.log(options); // a PushSubscriptionOptions object
  });
});
```
