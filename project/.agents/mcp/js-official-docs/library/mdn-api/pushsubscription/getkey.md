---
title: "PushSubscription: getKey() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushsubscription/getkey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushSubscription: getKey() method

The `getKey()` method of the `PushSubscription` interface
returns an `ArrayBuffer` representing a client public key, which can then
be sent to a server and used in encrypting push message data.

## Syntax

```js
getKey(name)
```

### Parameters

- `name`
    A string representing the encryption method used to generate a
    client key. The value can be:
    - `p256dh`
        An Elliptic curve Diffie–Hellman public key on the P-256 curve (that is, the NIST
        secp256r1 elliptic curve). The resulting key is an uncompressed point in ANSI
        X9.62 format.
    - `auth`
        An authentication secret, as described in Message Encryption for Web Push.

### Return value

An `ArrayBuffer` or `null` if no public key can be found.

## Examples

```js
reg.pushManager.getSubscription().then((subscription) => {
  // Enable any UI which subscribes / unsubscribes from
  // push messages.

  subBtn.disabled = false;

  if (!subscription) {
    console.log("Not yet subscribed to Push");
    // We aren't subscribed to push, so set UI
    // to allow the user to enable push
    return;
  }

  // Set your UI to show they have subscribed for
  // push messages
  subBtn.textContent = "Unsubscribe from Push Messaging";
  isPushEnabled = true;

  // initialize status, which includes setting UI elements for subscribed status
  // and updating Subscribers list via push
  const endpoint = subscription.endpoint;
  const key = subscription.getKey("p256dh");
  const auth = subscription.getKey("auth");

  // …
});
```
