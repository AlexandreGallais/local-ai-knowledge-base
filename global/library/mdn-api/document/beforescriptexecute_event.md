---
title: "Document: beforescriptexecute event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/beforescriptexecute_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: beforescriptexecute event

The `beforescriptexecute` event fires when a static `<script>` is about to start executing. It does not fire if the element is added dynamically, such as with `appendChild()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("beforescriptexecute", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbeforescriptexecute = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
function starting(e) {
  logMessage(`Starting script with ID: ${e.target.id}`);
}

document.addEventListener("beforescriptexecute", starting);
// Or (but note that this replaces other event listeners
// added using onbeforescriptexecute, if any)
document.onbeforescriptexecute = starting;
```

View Live Example

## Specifications

Not part of any specification.

## See also

- `afterscriptexecute` event of `Document`
- `Document.currentScript`
