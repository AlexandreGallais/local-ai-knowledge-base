---
title: "CompositionEvent: initCompositionEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/compositionevent/initcompositionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CompositionEvent: initCompositionEvent() method

The **`initCompositionEvent()`**
method of the `CompositionEvent` interface initializes the attributes of a
`CompositionEvent` object instance.

> **Note:**
> The correct way of creating a `CompositionEvent` is to use
> the constructor `CompositionEvent()`.

## Syntax

```js
initCompositionEvent(type, canBubble, cancelable, view, data, locale)
```

### Parameters

- `type`
    A string representing the type of composition event; this will be
    one of `compositionstart`, `compositionupdate`, or
    `compositionend`.
- `canBubble`
    A boolean value specifying whether or not the event can bubble.
- `cancelable`
    A boolean value indicating whether or not the event can be canceled.
- `view`
    The `Window` object from which the event was generated.
- `data`
    A string representing the value of the `data`
    attribute.
- `locale`
    A string representing the value of the `locale`
    attribute.

### Return value

None (`undefined`).

## See also

- `CompositionEvent`
