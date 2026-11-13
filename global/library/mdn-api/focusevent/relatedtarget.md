---
title: "FocusEvent: relatedTarget property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/focusevent/relatedtarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FocusEvent: relatedTarget property

The **`relatedTarget`** read-only property of the `FocusEvent` interface is the secondary target, depending on the type of event:

       | Event name
       | `target`
       | `relatedTarget`

       | `blur`
       | The `EventTarget` losing focus
       | The `EventTarget` receiving focus (if any).

       | `focus`
       | The `EventTarget` receiving focus
       | The `EventTarget` losing focus (if any)

       | `focusin`
       | The `EventTarget` receiving focus
       | The `EventTarget` losing focus (if any)

       | `focusout`
       | The `EventTarget` losing focus
       | The `EventTarget` receiving focus (if any)

Note that many elements can't have focus, which is a common reason for `relatedTarget` to be `null`. `relatedTarget` may also be set to `null` for security reasons, like when tabbing in or out of a page.

`MouseEvent.relatedTarget` is a similar property for mouse events.

## Value

An instance of `EventTarget`.

## See also

- `FocusEvent`
