---
title: "PushManager: registrations() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmanager/registrations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushManager: registrations() method

The **`registrations`** method is used to ask the system about
existing push endpoint registrations.

> **Note:**
> This method has been superseded by the `PushManager.getSubscription()` method.

## Syntax

```js
registrations()
```

### Parameters

None.

### Return value

A `DOMRequest` object to handle the success or failure of the method call.

If the method call is successful, the request's `result` will be an array of
PushRegistration objects.

### PushRegistration

Those objects are anonymous JavaScript objects with the following properties:

- `pushEndpoint`
    A string representing the URL of the endpoint.
- `version`
    The current version that the push endpoint is at.

## Examples

```js
const req = navigator.push.registrations();

req.onsuccess = (e) => {
  if (req.result.length > 0) {
    req.result.forEach((result) => {
      console.log(
        `Existing registration ${result.pushEndpoint} ${result.version}`,
      );
    });
    // Reuse existing endpoints.
  } else {
    // Register for a new endpoint.
    const register = navigator.push.register();
    register.onsuccess = (e) => {
      console.log(`Registered new endpoint: ${register.result}`);
    };
  }
};
```

## Specifications

This feature is not part of any specification anymore. It is no longer on track to become a standard.

## See also

- `PushManager`
