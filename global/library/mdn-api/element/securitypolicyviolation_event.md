---
title: "Element: securitypolicyviolation event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/securitypolicyviolation_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: securitypolicyviolation event

The **`securitypolicyviolation`** event is fired when a Content Security Policy is violated.

The event is fired on the element when there is a violation of the CSP policy.

This event bubbles to the `Window` object, and is composed.

> **Note:**
> You should generally add the handler for this event to a top-level object (i.e., `Window` or `Document`).
> While HTML elements can technically be the target of the `securitypolicyviolation` event, in reality this event does not fire on them—for example, a blocked `` source directly triggers this event on `document` as the target, instead of bubbling from the `` element.

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

### Listening for securitypolicyviolation on Window

The code below shows how you might add an event handler function using the `onsecuritypolicyviolation` global event handler property (but note that this replaces other event listeners added using `onsecuritypolicyviolation`, if any) or `addEventListener()` on the top level `Window` (you could use exactly the same approach on `Document`).

```js
window.onsecuritypolicyviolation = (e) => {
  // Handle SecurityPolicyViolationEvent e here
};

window.addEventListener("securitypolicyviolation", (e) => {
  // Handle SecurityPolicyViolationEvent e here
});
```

## See also

- The `securitypolicyviolation` event of the `Document` interface
- The `securitypolicyviolation` event of the `WorkerGlobalScope` interface
- HTTP > Content Security Policy
