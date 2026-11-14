---
title: "HTMLTemplateElement: shadowRootSlotAssignment property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltemplateelement/shadowrootslotassignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTemplateElement: shadowRootSlotAssignment property

The **`shadowRootSlotAssignment`** property of the `HTMLTemplateElement` interface indicates whether the element has been configured to use named or unnamed slot assignment.

This property can be used to detect support for the declarative attribute on the `<template>` element.

The property can't be read to determine the slot assignment method of a shadow root.
This is because a `<template>` element declaration results in the creation of either an `HTMLTemplateElement` or a `ShadowRoot`.
If a shadow root is created, then the `HTMLTemplateElement` does not, so you can't use it to check the slot assignment.
If a `HTMLTemplateElement` is created then it isn't a shadow root, and it can't easily be changed into one - so the value is irrelevant

If defined, it reflects the value of the `shadowrootslotassignment` attribute of the associated `<template>` element.

## Value

A string that reflects the value of the `shadowrootslotassignment` attribute of the associated `<template>` element.
Possible values are `"named"` and `"manual"`.

## Examples

### Feature detection for `shadowrootslotassignment`

If you're declaratively creating shadow roots that rely on unnamed slot assignment, using `<template>` elements, you can use the existence of this property on the `HTMLTemplateElement` to feature check for support.
This works because the property was added as the same time as unnamed assignment using the `"manual"` value.

```js
const isShadowRootSlotAssignmentSupported = Object.hasOwn(
  HTMLTemplateElement.prototype,
  "shadowRootSlotAssignment",
);
```

The value of `isShadowRootSlotAssignmentSupported` could then be used to fall back to attaching the shadow root with `Element.attachShadow()`, or to inform the user of what browser versions they need to use.

Note that if you're using named slot assignment there is no need to feature check for `shadowrootslotassignment`, because named assignment is supported by default.

## See also

- `shadowrootslotassignment` attribute of the `<template>` element
- `ShadowRoot.slotAssignment`
