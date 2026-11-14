---
title: "Document: afterscriptexecute event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/afterscriptexecute_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: afterscriptexecute event

The `afterscriptexecute` event fires when a static `<script>` element finishes executing its script. It does not fire if the element is added dynamically, such as with `appendChild()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("afterscriptexecute", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onafterscriptexecute = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
function finished(e) {
  logMessage(`Finished script with ID: ${e.target.id}`);
}

document.addEventListener("afterscriptexecute", finished);
// Or (but note that this replaces other event listeners
// added using onafterscriptexecute, if any)
document.onafterscriptexecute = finished;
```

View Live Example

## Specifications

Not part of any specification.

## See also

- `beforescriptexecute` event of `Document`
- `Document.currentScript`
