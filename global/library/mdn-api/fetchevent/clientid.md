---
title: "FetchEvent: clientId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetchevent/clientid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FetchEvent: clientId property

The **`clientId`** read-only property of the
`FetchEvent` interface returns the id of the `Client` that the
current service worker is controlling.

The `Clients.get()` method could then be passed this ID to retrieve the
associated client.

## Value

A string that represents the client ID.

## Examples

```js
self.addEventListener("fetch", (event) => {
  console.log(event.clientId);
});
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
