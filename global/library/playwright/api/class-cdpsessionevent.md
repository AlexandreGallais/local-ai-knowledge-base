---
title: "class: CDPSessionEvent"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-cdpsessionevent.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: CDPSessionEvent
* since: v1.30
* langs: csharp

[CDPSessionEvent] objects are returned by page via the [`method: CDPSession.event`] method.

Each object represents a named event and allows handling of the event when it is raised.

## event: CDPSessionEvent.onEvent
* since: v1.30
* langs: csharp
- argument: <[JsonElement?]>

## property: CDPSessionEvent.eventName
* since: v1.30
* langs: csharp
- returns: <[string]>
