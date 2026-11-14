---
title: "Element: afterscriptexecute event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/afterscriptexecute_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: afterscriptexecute event

> **Warning:**
> This event was a proposal in an early version of the specification. Do not rely on it.

The **`afterscriptexecute`** event is fired after a script has been executed.

It is a proprietary event specific to Gecko (Firefox).

This event is not cancelable.

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

## Specifications

Not part of any specification.

## See also

- `beforescriptexecute` event
