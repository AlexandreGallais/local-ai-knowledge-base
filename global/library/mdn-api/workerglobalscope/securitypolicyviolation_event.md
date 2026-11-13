---
title: "WorkerGlobalScope: securitypolicyviolation event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/securitypolicyviolation_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: securitypolicyviolation event

The **`securitypolicyviolation`** event is fired when a Content Security Policy is violated in a worker.

The handler can be assigned using the `onsecuritypolicyviolation` event handler property (but note that this replaces other event listeners added using `onsecuritypolicyviolation`, if any) or using `EventTarget.addEventListener()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("securitypolicyviolation", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsecuritypolicyviolation = (event) => { }
```

## Event type

A `SecurityPolicyViolationEvent`. Inherits from `Event`.

## Examples

The code below shows how you might add an event handler function using the `onsecuritypolicyviolation` event handler property (but note that this replaces other event listeners added using `onsecuritypolicyviolation`, if any) or call `addEventListener()` method.

```js
self.onsecuritypolicyviolation = (e) => {
  // Handle SecurityPolicyViolationEvent e here
};

self.addEventListener("securitypolicyviolation", (e) => {
  // Handle SecurityPolicyViolationEvent e here
});
```

## See also

- The `securitypolicyviolation` event of the `Document` interface
- The `securitypolicyviolation` event of the `Element` interface
- HTTP > Content Security Policy
