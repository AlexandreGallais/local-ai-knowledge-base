---
title: "PushManager: getSubscription() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmanager/getsubscription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushManager: getSubscription() method

The **`PushManager.getSubscription()`** method of the `PushManager` interface retrieves an existing push subscription.

It returns a `Promise` that resolves to a `PushSubscription` object containing details of an existing subscription. If no existing subscription exists, this resolves to a `null` value.

## Syntax

```js
getSubscription()
```

### Parameters

None.

### Return value

A `Promise` that resolves to a `PushSubscription` object or `null`.

## Examples

This code snippet is taken from a push messaging and notification sample. (No live demo is available.)

```js
// We need the service worker registration to check for a subscription
navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
  // Do we already have a push message subscription?
  serviceWorkerRegistration.pushManager
    .getSubscription()
    .then((subscription) => {
      // Enable any UI which subscribes / unsubscribes from
      // push messages.
      const pushButton = document.querySelector(".js-push-button");
      pushButton.disabled = false;

      if (!subscription) {
        // We aren't subscribed to push, so set UI
        // to allow the user to enable push
        return;
      }

      // Keep your server in sync with the latest subscriptionId
      sendSubscriptionToServer(subscription);

      showCurlCommand(subscription);

      // Set your UI to show they have subscribed for
      // push messages
      pushButton.textContent = "Disable Push Messages";
      isPushEnabled = true;
    })
    .catch((err) => {
      console.error(`Error during getSubscription(): ${err}`);
    });
});
```
