---
title: "HTMLLinkElement: as property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/as/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: as property

The **`as`** property of the `HTMLLinkElement` interface returns a string representing the type of content to be preloaded by a link element.

The `as` property must have a value for link elements when `rel="preload"`, or the resource will not be fetched.
It may also be applied to link elements where `rel="modulepreload"`, but if omitted, will default to `script`.
The property should not be set for other types of link elements, such as `rel="prefetch"`.

This property reflects the value of the `as` attribute of the `<link>` HTML element.

## Value

A string with the following allowed values: `"audio"`, `"document"`, `"embed"`, `"fetch"`, `"font"`, `"image"`, `"object"`, `"script"`, `"style"`, `"track"`, `"video"`, `"worker"`.
