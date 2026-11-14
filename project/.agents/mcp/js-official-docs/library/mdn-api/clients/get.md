---
title: "Clients: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clients/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clients: get() method

The **`get()`** method of the
`Clients` interface gets a service worker client matching a given
`id` and returns it in a `Promise`.

## Syntax

```js
get(id)
```

### Parameters

- `id`
    A string representing the id of the client you want to get.

### Return value

A `Promise` that resolves to a `Client` object or
`undefined`.

## Examples

```js
self.clients.get(id).then((client) => {
  self.clients.openWindow(client.url);
});
```
