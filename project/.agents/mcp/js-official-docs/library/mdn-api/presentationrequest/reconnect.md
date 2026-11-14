---
title: "PresentationRequest: reconnect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationrequest/reconnect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationRequest: reconnect() method

When the `reconnect(presentationId)` method is called on a `PresentationRequest` _presentationRequest_, the user agent _MUST_ run the following steps to _reconnect to a presentation_:

## Input

- _presentationRequest_, the `PresentationRequest` object that `reconnect()` was called on.
- _presentationId_, a valid presentation identifier

## Output

_P_, a Promise.

## Algorithm

1. Using the document's settings object run the prohibits mixed security contexts algorithm.
2. If the result of the algorithm is `"Prohibits Mixed Security Contexts"` and the presentation request URL of _presentationRequest_ is an a priori unauthenticated URL, then return a Promise rejected with a `SecurityError` and abort these steps.
3. If the document object's active sandboxing flag set has the sandboxed presentation browsing context flag set, then return a Promise rejected with a `SecurityError` and abort these steps.
4. Let _P_ be a new Promise.
5. Return _P_ but continue running these steps in parallel.
6. Search the set of controlled presentations for a `PresentationConnection` that meets the following criteria: its controlling browsing context is the current browsing context, its presentation connection state is not `terminated`, its presentation URL is equal to one of the presentation request URLs of _presentationRequest_ and its presentation identifier is equal to _presentationId_.
7. If such a `PresentationConnection` exists, run the following steps:
   1. Let _S_ be that `PresentationConnection`.
   2. Resolve _P_ with _S_.
   3. If the presentation connection state of _S_ is `connecting` or `connected`, then abort all remaining steps.
   4. Set the presentation connection state of _S_ to `connecting`.
   5. Establish a presentation connection with _S_.
   6. Abort all remaining steps.

8. Search the set of controlled presentations for the first `PresentationConnection` that meets the following criteria: its presentation connection state is not `terminated`, its presentation URL is equal to one of the presentation request URLs of _presentationRequest_, and its presentation identifier is equal to _presentationId_.
9. If such a `PresentationConnection` exists, let _E_ be that `PresentationConnection`, and run the following steps:
   1. Create a new `PresentationConnection` _S_.
   2. Set the presentation identifier of _S_ to _presentationId_.
   3. Set the presentation URL of _S_ to the presentation URL of _E_.
   4. Set the presentation connection state of _S_ to `connecting`.
   5. Add _S_ to the set of controlled presentations.
   6. Resolve _P_ with _S_.
   7. Queue a task to fire a trusted event with the name `connectionavailable`, that uses the `PresentationConnectionAvailableEvent` interface with the `connection` attribute initialized to _S_, at _presentationRequest_. The event must not bubble and cancelable and should have no default action.
   8. Establish a presentation connection with _S_.
   9. Abort all remaining steps.

10. Reject _P_ with a `NotFoundError` exception.
