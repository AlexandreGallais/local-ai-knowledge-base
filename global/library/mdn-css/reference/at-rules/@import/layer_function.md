---
title: "`layer()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@import/layer_function/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `layer()` CSS function

The **`layer()`** CSS function is used along with the `@import` at-rule to put the imported resource in a separate named cascade layer.

## Syntax

```css
@import url layer(layer-name);
@import "dark.css" layer(framework.themes.dark);
```

The `framework.themes.dark` is the layer into which the CSS file would be imported.

## Formal syntax

{{CSSSyntaxRaw(`layer() = layer( <layer-name> )`)}}

## See also

- `@import`
- CSS at-rule functions
- CSS cascading and inheritance module
