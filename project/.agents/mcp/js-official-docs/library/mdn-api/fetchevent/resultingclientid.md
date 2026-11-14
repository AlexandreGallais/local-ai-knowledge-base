---
title: "FetchEvent: resultingClientId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetchevent/resultingclientid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FetchEvent: resultingClientId property

The **`resultingClientId`** read-only property of the
`FetchEvent` interface is the `id` of the
`client` that replaces the previous client during a page
navigation.

For example, when navigating from page A to page B `resultingClientId` is
the ID of the client associated with page B.

If the fetch request is a subresource request or the request's
`destination` is
`report`, `resultingClientId` will be an empty string.

## Value

A string.

## Examples

```js
self.addEventListener("fetch", (event) => {
  console.log(event.resultingClientId);
});
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
