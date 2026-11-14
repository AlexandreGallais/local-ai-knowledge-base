---
title: "PushSubscriptionOptions: userVisibleOnly property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushsubscriptionoptions/uservisibleonly/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushSubscriptionOptions: userVisibleOnly property

The **`userVisibleOnly`** read-only property of the `PushSubscriptionOptions` interface indicates if the returned push subscription will only be used for messages whose effect is made visible to the user.

## Value

A boolean value that indicates whether the returned push subscription will only be used for messages whose effect is made visible to the user.

## Examples

In the example below the value of `userVisibleOnly` is printed to the console.

```js
navigator.serviceWorker.ready.then((reg) => {
  reg.pushManager.getSubscription().then((subscription) => {
    const options = subscription.options;
    console.log(options.userVisibleOnly); // true if this is a user visible subscription
  });
});
```
