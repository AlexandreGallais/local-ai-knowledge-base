---
title: "EventSource: EventSource() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventsource/eventsource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventSource: EventSource() constructor

The **`EventSource()`**
constructor returns a newly-created `EventSource`, which represents a
remote resource.

## Syntax

```js
new EventSource(url)
new EventSource(url, options)
```

### Parameters

- `url`
    A string that represents the location of the remote resource
    serving the events/messages.
- `options` (optional)
    Provides options to configure the new connection. The possible entries are:
    - `withCredentials` (optional)
        A boolean value, defaulting to `false`, indicating
        if CORS should be set to `include` credentials.

## Examples

```js
const evtSource = new EventSource("sse.php");
const eventList = document.querySelector("ul");

evtSource.onmessage = (e) => {
  const newElement = document.createElement("li");

  newElement.textContent = `message: ${e.data}`;
  eventList.appendChild(newElement);
};
```

> **Note:**
> You can find a full example on GitHub — see Simple SSE demo using PHP.

## See also

- `EventSource`
