---
title: "PushSubscription: endpoint property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushsubscription/endpoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushSubscription: endpoint property

The **`endpoint`** read-only property of the
`PushSubscription` interface returns a string containing
the endpoint associated with the push subscription.

The endpoint takes the form of a custom URL pointing to a push server, which can be
used to send a push message to the particular service worker instance that subscribed to
the push service. For this reason, it is a good idea to keep your endpoint a secret, so
others do not hijack it and abuse the push functionality.

## Value

A string.

## Examples

```js
navigator.serviceWorker.ready.then((reg) => {
  reg.pushManager.subscribe({ userVisibleOnly: true }).then((subscription) => {
    console.log(subscription.endpoint);

    // At this point you would most likely send the subscription
    // endpoint to your server, save it, then use it to send a
    // push message at a later date
  });
});
```
