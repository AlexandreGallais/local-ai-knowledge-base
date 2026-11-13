---
title: "HTMLTemplateElement: shadowRootCustomElementRegistry property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltemplateelement/shadowrootcustomelementregistry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTemplateElement: shadowRootCustomElementRegistry property

The **`shadowRootCustomElementRegistry`** property of the `HTMLTemplateElement` interface reflects the value of the `shadowrootcustomelementregistry` attribute of the associated `<template>` element.

> **Note:**
> This property is not useful for developers, and is only documented for completeness.
> If a `<template>` element is used to declaratively create a `ShadowRoot`, then this object and property do not exist.
> Otherwise, if an `HTMLTemplateElement` is created, the value of this property is irrelevant because the object is not a shadow root and cannot subsequently be changed to a shadow root.

## Value

A string that reflects the `shadowrootcustomelementregistry` attribute of the associated `<template>` element.

## See also

- `ShadowRoot.customElementRegistry`
- `HTMLTemplateElement.shadowRootMode`
- `CustomElementRegistry()` constructor
- Using custom elements
