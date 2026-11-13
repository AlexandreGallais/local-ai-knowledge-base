---
title: "CSSFunctionDeclarations: style property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfunctiondeclarations/style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFunctionDeclarations: style property

The read-only **`style`** property of the `CSSFunctionDeclarations` interface contains a `CSSFunctionDescriptors` object representing the descriptors available in the `@function` rule's body.

## Value

A `CSSFunctionDescriptors` object.

Although the `style` property itself is read-only in the sense that you can't replace the `CSSFunctionDescriptors` object, you can still assign to the `style` property directly, which is equivalent to assigning to its `cssText` property. You can also modify the `CSSFunctionDescriptors` object using the `setProperty()` and `removeProperty()` methods.

## Examples

See the main `CSSFunctionDeclarations` reference page for examples.

## See also

- `@function`
