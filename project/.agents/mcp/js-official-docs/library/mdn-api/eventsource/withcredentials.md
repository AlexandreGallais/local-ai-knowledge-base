---
title: "EventSource: withCredentials property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventsource/withcredentials/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventSource: withCredentials property

The **`withCredentials`** read-only property of the
`EventSource` interface returns a boolean value indicating whether
the `EventSource` object was instantiated with CORS credentials set.

## Value

A boolean value indicating whether the `EventSource` object was
instantiated with CORS credentials set (`true`), or not (`false`,
the default).

## Examples

```js
const evtSource = new EventSource("sse.php");
console.log(evtSource.withCredentials);
```

> **Note:**
> You can find a full example on GitHub — see Simple SSE demo using PHP.

## See also

- `EventSource`
