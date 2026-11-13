---
title: "Event: returnValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/event/returnvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Event: returnValue property

The `Event` property
**`returnValue`** indicates whether the default action for
this event has been prevented or not.

It is set to `true` by
default, allowing the default action to occur. Setting this property to
`false` prevents the default action.

> **Note:**
> While `returnValue` has been adopted into the DOM
> standard, it is present primarily to support existing code. Use
> `preventDefault()`, and
> `defaultPrevented` instead of this historical
> property.

## Value

A boolean value which is `true` if the event has not been
canceled; otherwise, if the event has been canceled or the default has been prevented,
the value is `false`.

The value of `returnValue` is the opposite of the value returned by
`defaultPrevented`.

## See also

- `HTMLDialogElement.returnValue`: the return value for the `<dialog>`.
