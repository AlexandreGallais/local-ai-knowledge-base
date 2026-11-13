---
title: "Event: stopPropagation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/event/stoppropagation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Event: stopPropagation() method

The **`stopPropagation()`** method of the `Event`
interface prevents further propagation of the current event in the capturing and
bubbling phases. It does not, however, prevent any default behaviors from occurring; for
instance, clicks on links are still processed. If you want to stop those behaviors, see
the `preventDefault()` method. It also does not
prevent propagation to other event-handlers of the current element. If you want to stop those,
see `stopImmediatePropagation()`.

## Syntax

```js
stopPropagation()
```

### Parameters

None.

### Return value

None.

## Examples

See Event Propagation.
Also see the example at `stopImmediatePropagation()`
