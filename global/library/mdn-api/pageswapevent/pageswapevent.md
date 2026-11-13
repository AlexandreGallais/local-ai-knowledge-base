---
title: "PageSwapEvent: PageSwapEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pageswapevent/pageswapevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PageSwapEvent: PageSwapEvent() constructor

The **`PageSwapEvent()`** constructor creates a new
`PageSwapEvent` object instance.

## Syntax

```js
new PageSwapEvent(type, init)
```

### Parameters

- `type`
    A string representing the type of event. In the case of `PageSwapEvent` this is always `pageswap`.
- `init`
    An object containing the following properties:
    - `activation`
        A `NavigationActivation` object representing the navigation type and current and destination document history entries. Defaults to `null` if the associated navigation is a cross-origin navigation.
    - `viewTransition`
        A `ViewTransition` object representing the active view transition for the related navigation. Defaults to `null` if there is no active view transition.

## Examples

A developer would not use this constructor manually. A new `PageSwapEvent` object is constructed when a handler is invoked as a result of the `pageswap` event firing.

## See also

- View Transition API
