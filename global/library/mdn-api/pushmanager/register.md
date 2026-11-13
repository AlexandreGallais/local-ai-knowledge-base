---
title: "PushManager: register() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmanager/register/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushManager: register() method

The **`register`** method is used to ask the system to request
a new endpoint for notifications.

> **Note:**
> This method has been superseded by `PushManager.subscribe()`.

## Syntax

```js
register()
```

### Parameters

None.

### Return value

A `DOMRequest` object to handle the success or failure of the method call.

If the method call is successful, the request's `result` will be a string,
which is the endpoint URL.

> **Note:**
> If you do not need the URL any more, please use
> `PushManager.unregister()` to clean up after yourself.

## Examples

```js
const req = navigator.push.register();

req.onsuccess = (e) => {
  const endpoint = req.result;
  console.log(`New endpoint: ${endpoint}`);
};

req.onerror = (e) => {
  console.error(`Error getting a new endpoint: ${e.error}`);
};
```

## Specifications

This feature is not part of any specification. It is no longer on track to become a standard.

## See also

- `PushManager`
