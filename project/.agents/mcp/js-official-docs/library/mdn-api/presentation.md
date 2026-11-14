---
title: "Presentation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Presentation

The **`Presentation`** can be defined as two possible user agents in the context: _Controlling user agent_ and _Receiving user agent_.

In controlling browsing context, the `Presentation` interface provides a mechanism to override the browser default behavior of launching presentation to external screen. In receiving browsing context, `Presentation` interface provides the access to the available presentation connections.

## Instance properties

- `Presentation.defaultRequest` (experimental)
    In a controlling user agent, the `defaultRequest` attribute _MUST_ return the default presentation request if any, `null` otherwise. In a receiving browsing context, it _MUST_ return `null`.
- `Presentation.receiver` (read-only) (experimental)
    In a receiving user agent, the `receiver` attribute _MUST_ return the `PresentationReceiver` instance associated with the receiving browsing context and created by the receiving user agent when the receiving browsing context is created.

## Instance methods

None.
