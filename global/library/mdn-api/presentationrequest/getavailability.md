---
title: "PresentationRequest: getAvailability() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationrequest/getavailability/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationRequest: getAvailability() method

When the `getAvailability()` method is called, the user agent _MUST_ run the following steps:

- Input
    _presentationUrls_, a list of presentation request URLs
- Output
    _P_, a Promise

1. If one of the following conditions is true:
   - The result of running the prohibits mixed security contexts algorithm on the document's settings object is `"Prohibits Mixed Security Contexts"` and _presentationUrl_ is an a priori unauthenticated URL.
   - The document object's active sandboxing flag set has the sandboxed presentation browsing context flag set.

   Run the following substeps:
   1. Return a Promise rejected with a `SecurityError` `DOMException`.
   2. Abort these steps.

2. Let _P_ be a new Promise.
3. Return _P_, but continue running these steps in parallel.
4. If the user agent is unable to monitor the list of available presentation displays for the entire duration of the controlling browsing context (e.g., because the user has disabled this feature), then:
   1. Resolve _P_ with a new `PresentationAvailability` object with its `value` property set to `false`.
   2. Abort all the remaining steps.

5. If the user agent is unable to continuously monitor the list of available presentation displays but can find presentation displays in order to start a connection, then:
   1. Reject _P_ with a `NotSupportedError` `DOMException`.
   2. Abort all the remaining steps.

6. If there exists a tuple (_A_, _presentationUrls_) in the set of availability objects, then:
   1. Resolve _P_ with _A_.
   2. Abort all the remaining steps.

7. Let _A_ be a new `PresentationAvailability` object with its `value` property set as follows:
   1. `false` if the list of available presentation displays is empty.
   2. `true` if there is at least one compatible presentation display for some member of _presentationUrls_. Meaning there is an entry _(presentationUrl, display)_ in the list of available presentation displays for some _presentationUrl_ in _presentationUrls_.
   3. `false` otherwise.

8. Create a tuple (_A_, _presentationUrls_) and add it to the set of availability objects.
9. Run the algorithm to monitor the list of available presentation displays.
10. Resolve _P_ with _A_.
