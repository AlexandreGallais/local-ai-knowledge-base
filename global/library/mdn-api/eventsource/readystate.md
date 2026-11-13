---
title: "EventSource: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventsource/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventSource: readyState property

The **`readyState`** read-only property of the
`EventSource` interface returns a number representing the state of the
connection.

## Value

A number which is one of the three possible state constants defined on the `EventSource` interface:

- `EventSource.CONNECTING` (0)
    The connection is not yet open.
- `EventSource.OPEN` (1)
    The connection is open and ready to communicate.
- `EventSource.CLOSED` (2)
    The connection is closed or couldn't be opened.

## Examples

```js
const evtSource = new EventSource("sse.php");
console.log(evtSource.readyState);
```

> **Note:**
> You can find a full example on GitHub — see Simple SSE demo using PHP.

## See also

- `EventSource`
