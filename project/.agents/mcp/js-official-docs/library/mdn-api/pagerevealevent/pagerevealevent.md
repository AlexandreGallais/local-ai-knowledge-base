---
title: "PageRevealEvent: PageRevealEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pagerevealevent/pagerevealevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PageRevealEvent: PageRevealEvent() constructor

The **`PageRevealEvent()`** constructor creates a new
`PageRevealEvent` object instance.

## Syntax

```js
new PageRevealEvent(type, init)
```

### Parameters

- `type`
    A string representing the type of event. In the case of `PageRevealEvent` this is always `pagereveal`.
- `init`
    An object containing the following properties:
    - `viewTransition` (optional)
        A `ViewTransition` object representing the active view transition for the related navigation. Defaults to `null` if there is no active view transition.

## Examples

A developer would not use this constructor manually. A new `PageRevealEvent` object is constructed when a handler is invoked as a result of the `pagereveal` event firing.

## See also

- View Transition API
