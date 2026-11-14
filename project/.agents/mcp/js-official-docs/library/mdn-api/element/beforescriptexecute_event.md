---
title: "Element: beforescriptexecute event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/beforescriptexecute_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: beforescriptexecute event

> **Warning:**
> This event was a proposal in an early version of the specification. Do not rely on it.

The **`beforescriptexecute`** event is fired when a script is about to be executed. Canceling the event prevents the script from executing.

It is a proprietary event specific to Gecko (Firefox).

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

## Specifications

Not part of any specification.

## See also

- `afterscriptexecute` event
