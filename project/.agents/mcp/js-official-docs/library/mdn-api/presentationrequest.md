---
title: "PresentationRequest"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationrequest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationRequest

A `PresentationRequest` object is used to initiate or reconnect to a presentation made by a controlling browsing context. The `PresentationRequest` object _MUST_ be implemented in a controlling browsing context provided by a controlling user agent.

When a `PresentationRequest` is constructed, the given `urls` _MUST_ be used as the list of _presentation request URLs_ which are each a possible presentation URL for the `PresentationRequest` instance.

## Constructor

- `PresentationRequest()` (experimental)
    Creates a `PresentationRequest`.

## Instance properties

None

## Instance methods

- `PresentationRequest.start()` (experimental)
    Returns a `Promise` that resolves with a `PresentationConnection` after the user agent prompts the user to select a display and grant permission to use that display.
- `PresentationRequest.reconnect()` (experimental)
    When the `reconnect(presentationId)` method is called on a `PresentationRequest` _presentationRequest_, the user agent _MUST_ run the following steps to _reconnect to a presentation_.
- `PresentationRequest.getAvailability()` (experimental)
    When the `getAvailability()` method is called, the user agent _MUST_ run the steps as the link.
