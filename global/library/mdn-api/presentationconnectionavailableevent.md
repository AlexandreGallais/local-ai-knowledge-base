---
title: "PresentationConnectionAvailableEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationconnectionavailableevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationConnectionAvailableEvent

The **`PresentationConnectionAvailableEvent`** interface of the Presentation API is fired on a `PresentationRequest` when a connection associated with the object is created.

A controlling user agent fires a trusted event named `connectionavailable` on a `PresentationRequest` when a connection associated with the object is created. It is fired at the `PresentationRequest` instance, using the `PresentationConnectionAvailableEvent` interface, with the `connection` attribute set to the `PresentationConnection` object that was created. The event is fired for each connection that is created for the controller, either by the controller calling `start()` or `reconnect()`, or by the controlling user agent creating a connection on the controller's behalf via `defaultRequest`.

## Constructor

- `PresentationConnectionAvailableEvent()` (experimental)
    Creates a new PresentationConnectionAvailableEvent.

## Instance properties

- `PresentationConnectionAvailableEvent.connection` (read-only) (experimental)
    Returns a references to the `PresentationConnection` object that fired the event.
