---
title: "EventSource: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventsource/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventSource: close() method

The **`close()`** method of the `EventSource`
interface closes the connection, if one is made, and sets the
`EventSource.readyState` attribute to `2` (closed).

> **Note:**
> If the connection is already closed, the method does nothing.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const button = document.querySelector("button");
const evtSource = new EventSource("sse.php");

button.onclick = () => {
  console.log("Connection closed");
  evtSource.close();
};
```

> **Note:**
> You can find a full example on GitHub — see Simple SSE demo using PHP.

## See also

- `EventSource`
