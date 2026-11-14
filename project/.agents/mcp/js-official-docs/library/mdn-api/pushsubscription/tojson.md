---
title: "PushSubscription: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushsubscription/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushSubscription: toJSON() method

The **`toJSON()`** method of the `PushSubscription` interface returns a JSON-serializable plain object representing the `PushSubscription` object.

The method is automatically called by `JSON.stringify()` when a `PushSubscription` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `endpoint`
- `expirationTime`
- `keys`: the `p256dh` and `auth` values returned by `getKey()`, encoded as base64url strings without padding

Unless stated otherwise, each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `PushSubscription` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
navigator.serviceWorker.ready.then((reg) => {
  reg.pushManager.getSubscription().then((subscription) => {
    const json = subscription.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.endpoint); // Same value as subscription.endpoint
  });
});
```

### Serializing to a JSON string

Within the `getSubscription()` callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(subscription));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "endpoint": "https://push.example.com/subscriptions/12345",
  "expirationTime": null,
  "keys": {
    "p256dh": "...",
    "auth": "..."
  }
}
```

The base64url-encoded key <example-value> are abbreviated as `"..."` for readability.
