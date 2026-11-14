---
title: "HTMLTemplateElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltemplateelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTemplateElement

The **`HTMLTemplateElement`** interface enables access to the contents of an HTML `<template>` element.

> **Note:**
> An HTML parser can create either an `HTMLTemplateElement` or a `ShadowRoot` when it parses a `<template>` element, depending on the `<template>` attributes.
> If an `HTMLTemplateElement` is created the "shadow" attributes are reflected from the template.
> However these are not useful, because an `HTMLTemplateElement` is not a shadow root and cannot subsequently be changed to a shadow root.

## Instance properties

_This interface inherits the properties of `HTMLElement`._

- `content` (read-only)
    A read-only `DocumentFragment` which contains the DOM subtree representing the `<template>` element's template contents.
- `htmlFor` (experimental)
    A string reflecting the `for` HTML attribute, containing the ID of the Processing Instruction marker to replace with the contents of this `<template>` element.
- `shadowRootMode`
    A string that reflects the value of the `shadowrootmode` attribute of the associated `<template>` element.
- `shadowRootDelegatesFocus`
    A boolean that reflects the value of the `shadowrootdelegatesfocus` attribute of the associated `<template>` element.
- `shadowRootClonable`
    A boolean that reflects the value of the `shadowrootclonable` attribute of the associated `<template>` element.
- `shadowRootCustomElementRegistry`
    A string that reflects the value of the `shadowrootcustomelementregistry` attribute of the associated `<template>` element, indicating that the declarative shadow root will use a scoped `CustomElementRegistry`.
- `shadowRootSerializable`
    A boolean that reflects the value of the `shadowrootserializable` attribute of the associated `<template>` element.
- `shadowRootSlotAssignment`
    A string that reflects the value of the `shadowrootslotassignment` attribute of the associated `<template>` element.

## Instance methods

_This interface inherits the methods of `HTMLElement`._
