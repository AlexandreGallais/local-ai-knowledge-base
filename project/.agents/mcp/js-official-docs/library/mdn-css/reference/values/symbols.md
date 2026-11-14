---
title: "`symbols()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/symbols/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `symbols()` CSS function

The **`symbols()`** CSS function enables defining counter styles inline, directly as a value of properties such as `list-style`, providing a less powerful but simpler alternative to the `@counter-style` method of defining a counter style.

Unlike `@counter-style`, which defines a reusable counter style, `symbols()` is _anonymous_ (i.e., it can only be used once). This function accepts strings and images as values. In comparison, the `@counter-style`'s `symbols` descriptor also accepts identifiers.

## Syntax

```css
symbols() = symbols( <symbols-type>? [ <string> | <image> ]+ );
```

`<symbols-type>` can be one of the following:

- `cyclic`: The system cycles through the given values in the order of their definition, and returns to the start when it reaches the end.
- `numeric`: The system interprets the given values as the successive units of a place-value numbering system.
- `alphabetic`: The system interprets the given values as the digits of an alphabetic numbering system, like a place-value numbering system but without `0`.
- `symbolic`: The system cycles through the values, printing them an additional time at each cycle (one time for the first cycle, two times for the second, etc.).
- `fixed`: The system cycles through the given values once, then falls back to Arabic numerals.

## Examples

### HTML

```html
<ol>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
</ol>
```

### CSS

```css
ol {
  list-style: symbols(cyclic "*" "†" "‡");
}
```

## See also

- `@counter-style` descriptors: `system`, `symbols`, `additive-symbols`, `prefix`, `suffix`, `range`, `pad`, `speak-as`, `fallback`
- List style properties: `list-style`, `list-style-type`
- CSS counter styles module
- CSS lists and counters module
