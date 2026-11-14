---
title: "CompositionEvent: locale property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/compositionevent/locale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CompositionEvent: locale property

The **`locale`** read-only property of the
`CompositionEvent` interface returns the locale of current input method
(for example, the keyboard layout locale if the composition is associated with an Input method editor).

> **Warning:**
> Even for browsers supporting it, don't trust the value contained in this property.
> Even if technically it is accessible, the way to set it up when creating a `CompositionEvent`
> is not guaranteed to be coherent.

## Value

A string representing the locale of current input method.

## Specifications

This property was in early versions of different specifications. It is now only kept for compatibility purposes, and the way
to set its value when creating a `CompositionEvent` is not well defined.

## See also

- `CompositionEvent`
