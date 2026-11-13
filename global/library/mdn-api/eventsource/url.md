---
title: "EventSource: url property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventsource/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventSource: url property

The **`url`** read-only property of the
`EventSource` interface returns a string representing the
URL of the source.

## Value

A string representing the URL of the source.

## Examples

```js
const evtSource = new EventSource("sse.php");
console.log(evtSource.url);
```

> **Note:**
> You can find a full example on GitHub — see Simple SSE demo using PHP.

## See also

- `EventSource`
