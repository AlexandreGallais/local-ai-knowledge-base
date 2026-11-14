---
title: "PresentationConnectionAvailableEvent: connection property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationconnectionavailableevent/connection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationConnectionAvailableEvent: connection property

When an incoming connection is created, a receiving user agent fires a trusted event, named `connectionavailable`, on a `PresentationReceiver`. The trusted event is fired at the presentation controller's monitor, using the `PresentationConnectionAvailableEvent` interface, with the `connection` attribute set to the `PresentationConnection` object that was created.

The event is fired for all connections that are created when monitoring incoming presentation connections.
