---
title: "PresentationAvailability"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationavailability/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationAvailability

A **`PresentationAvailability`** object is associated with available presentation displays and represents the _presentation display availability_ for a presentation request. If the controlling user agent can monitor the list of available presentation displays in the background (without a pending request to `start()`), the `PresentationAvailability` object _MUST_ be implemented in a controlling browsing context.

The `value` attribute _MUST_ return the last value it was set to. The value is updated by the monitor the list of available presentation displays algorithm.

The `onchange` attribute is an event handler whose corresponding event handler event type is `change`.

## Instance properties

- `PresentationAvailability.value` (read-only) (experimental)
    A boolean value indicating whether the given presentation display is available. The `value` attribute _MUST_ return the last value it was set to.

### Event

- `change` (experimental)
    Indicates that the availability of the presentation display has changed.

## Instance methods

None.
