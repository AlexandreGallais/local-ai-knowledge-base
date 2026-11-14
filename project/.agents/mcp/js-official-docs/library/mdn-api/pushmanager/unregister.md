---
title: "PushManager: unregister() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmanager/unregister/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushManager: unregister() method

The **`unregister()`** method was used to ask the system to
unregister and delete the specified endpoint.

> **Note:**
> In the updated API, a subscription can be unregistered via the `PushSubscription.unsubscribe()` method.

## Syntax

```js
unregister(pushEndpoint)
```

### Parameters

- `pushEndpoint`
    A pushEndpoint to be unregistered.

### Return value

A `DOMRequest` object to handle the success or failure of the method call.

If the method call is successful, the request's `result` will be a
PushRegistration object representing the endpoint that has been
unregistered.

### PushRegistration

Those objects are anonymous JavaScript objects with the following properties:

- `pushEndpoint`
    A string representing the URL of the unregistered endpoint.
- `version`
    `Undefined` when `unregister.onsuccess` is called.

## Examples

```js
const req = navigator.push.unregister(pushEndpoint);

req.onsuccess = (e) => {
  const endpoint = req.result;
  console.log(`Unregistered endpoint: ${endpoint}`);
};

req.onerror = (e) => {
  console.error(`Error unregistering the endpoint: ${e.error}`);
};
```

## Specifications

This feature is not part of any specification anymore. It is no longer on track to become a standard.

## See also

- `PushManager`
