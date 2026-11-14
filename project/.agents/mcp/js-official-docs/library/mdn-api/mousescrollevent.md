---
title: "MouseScrollEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mousescrollevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseScrollEvent

The **`MouseScrollEvent`** interface represents events that occur due to the user moving a mouse wheel or similar input device.

> **Warning:**
> Do not use this interface for wheel events.
>
> Like `MouseWheelEvent`, this interface is non-standard and deprecated. It was used in Gecko-based browsers only. Instead use the standard _`WheelEvent`._

## Method overview

```webidl
void initMouseScrollEvent(
  in DOMString typeArg,
  in boolean canBubbleArg,
  in boolean cancelableArg,
  in nsIDOMAbstractView viewArg,
  in long detailArg,
  in long screenXArg,
  in long screenYArg,
  in long clientXArg,
  in long clientYArg,
  in boolean ctrlKeyArg,
  in boolean altKeyArg,
  in boolean shiftKeyArg,
  in boolean metaKeyArg,
  in unsigned short buttonArg,
  in nsIDOMEventTarget relatedTargetArg,
  in long axis);
```

## Attributes

| Attribute                 | Type   | Description                 |
| ------------------------- | ------ | --------------------------- |
| `axis` (read-only) | `long` | Indicates scroll direction. |

## Constants

### Delta modes

| Constant          | Value  | Description                                        |
| ----------------- | ------ | -------------------------------------------------- |
| `HORIZONTAL_AXIS` | `0x01` | The event is caused by horizontal wheel operation. |
| `VERTICAL_AXIS`   | `0x02` | The event is caused by vertical wheel operation.   |

## Instance methods

- `initMouseScrollEvent()`
    See `nsIDOMMouseScrollEvent::initMouseScrollEvent()`.

## See also

- `DOMMouseScroll`
- `MozMousePixelScroll`
- Standardized mouse wheel event object: `WheelEvent`
