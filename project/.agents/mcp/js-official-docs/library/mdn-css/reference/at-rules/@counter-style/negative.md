---
title: "`negative` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@counter-style/negative/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `negative` CSS at-rule descriptor

The **`negative`** descriptor of the `@counter-style` at-rule lets you define how negative counter values are represented when defining custom counter styles. The value of the `negative` descriptor defines the symbols to be added before and after the counter representation when the counter's value is negative.

## Syntax

```css
/* One <symbol> value */
negative: "--"; /* Adds '--' before if counter value is negative */

/* Two <symbol> values */
negative: "(" ")"; /* Adds '(- before and ')' after if counter value is negative */
```

### Values

The `negative` descriptor accepts up to two `<symbol>` values.

- `<symbol>`
    If only one value is specified, it is added before the counter representation when the counter is negative. If two values are specified, the first one is added before and the second one is added after the counter representation when the counter is negative.

## Description

If the counter value is negative, the specified `<symbol>` for the `negative` descriptor is added before the counter representation, replacing the default `-` for negative values. The second `<symbol>`, if specified, is added after the counter representation.

The `negative` descriptor is relevant in two cases: if counter styles have the `system` value of `symbolic`, `alphabetic`, `numeric`, and `additive` and the count is negative; and if `system` value is `extends` and the extended counter style itself uses a negative sign. For systems that don't support negative counter values, specifying the `negative` descriptor has no effect and is ignored.

## Examples

### Rendering negative counters

This example extends the `decimal` list style. The `negative` descriptor is used to add `(-` and `)` before and after negative counter values.

#### HTML

```html
<ol start="-3">
  <li>Negative three</li>
  <li>Negative two</li>
  <li>Negative one</li>
  <li>Zero</li>
  <li>One</li>
</ol>
```

#### CSS

```css
@counter-style neg {
  system: extends decimal;
  negative: "(-" ")";
  suffix: ": ";
}

ol {
  list-style: neg;
}
```

#### Result

The prefix and suffix listed as the value of the `negative` descriptor are only added to the marker when the counter value is less than zero.

## See also

- `@counter-style` descriptors: `system`, `symbols`, `additive-symbols`, `prefix`, `suffix`, `range`, `pad`, `speak-as`, `fallback`
- List style properties: `list-style`, `list-style-image`, `list-style-position`
- `symbols()` function to create anonymous counter styles
- CSS counter styles module
- CSS lists and counters module
