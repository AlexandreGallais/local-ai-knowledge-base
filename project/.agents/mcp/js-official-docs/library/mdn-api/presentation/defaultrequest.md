---
title: "Presentation: defaultRequest property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentation/defaultrequest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Presentation: defaultRequest property

In a controlling user agent, the **`defaultRequest`** attribute _MUST_ return the default presentation request if any, otherwise `null`. In a receiving browsing context, it _MUST_ return `null`.

If set by the controller, the value of the `defaultRequest` attribute _SHOULD_ be used by the controlling user agent as the _default presentation request_ for that controlling browsing context. If the document object's active sandboxing flag set has the sandboxed presentation browsing context flag set, the controlling user agent _SHOULD_ act as if the default request is not set for that browsing context. When the controlling user agent wishes to initiate a `PresentationConnection` on the behalf of that browsing context, it _MUST_ start a presentation using the default presentation request for the controller (as if the controller had called `defaultRequest.start()`).

The controlling user agent _SHOULD_ initiate presentation using the default presentation request, only when the user has expressed an intention to do so via a user gesture. For example, by clicking a button in the browser.

> **Note:**
> Some controlling user agents may allow the user to initiate a default presentation connection and select a presentation display with the same user gesture. For example, the browser chrome could allow the user to pick a display from a menu, or allow the user to tap on a Near Field Communications (NFC) enabled display. In this case, when the controlling user agent asks for permission while starting a presentation, the browser could offer that display as the default choice, or consider the gesture as granting permission for the display and bypass <example-value> selection entirely.

> **Note:**
> If a controlling user agent does not support initiation of a presentation connection from the browser chrome, setting `defaultRequest` will have no effect.
