---
title: "HTMLTemplateElement: htmlFor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltemplateelement/htmlfor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTemplateElement: htmlFor property

The **`htmlFor`** property of the `HTMLTemplateElement` interface is the ID of the Processing Instruction marker to replace with the contents of the associated `<template>` element. It reflects the value of, and is used to set and get the `for` content attribute.

## Value

A string containing the ID of the Processing Instruction marker to replace with the contents of this `<template>` element.

## Description

The `for` attribute of a `<template>` element is used for template out-of-order patching using `<?marker>` and `<?start>`/`<?end>` processing instruction markers. Those markers are replaced with the contents of the `<template>` element when it is parsed and processed.

The `htmlFor` attribute provides JavaScript access to the attribute value. `htmlFor` is used instead of `for` to avoid clashing with the JavaScript `for` reserved word (this is no longer strictly necessary, so may change in the future).

## Examples

### Basic usage

```html
<template for="my-identifier"> Lorem Ipsum... </template>
```

```js
console.log(document.querySelector("template").htmlFor);
// my-identifier
```

## See also

- `HTMLTemplateElement`
