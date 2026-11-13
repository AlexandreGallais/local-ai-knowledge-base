---
title: "`additive-symbols` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@counter-style/additive-symbols/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `additive-symbols` CSS at-rule descriptor

The **`additive-symbols`** descriptor of the `@counter-style` at-rule is used to specify counter symbols when the `@counter-style` `system` descriptor value is set as `additive`. The additive system is used to construct sign-value numbering systems such as Roman numerals.

## Syntax

```css
/* Single tuple */
additive-symbols: 3 "*";

/* Comma-separated list of tuples */
additive-symbols:
  3 "0",
  2 "\2E\20",
  1 url("symbol.png");

/* Binary counter */
additive-symbols:
  2 "1",
  1 "0";

/* Etruscan (a civilization in ancient Italy) counter  */
additive-symbols:
  100 "𐌟",
  50 "𐌣",
  10 "𐌢",
  5 "𐌡",
  1 "𐌠";
```

### Values

The descriptor accepts a comma-separated list of _additive tuples_ with each tuple consisting of the following two values separated by a space:

- `integer`
    A non-negative integer values specifying the integer weight of the associated symbol value of the tuple.

- `<symbol>`
    Specifies the counter symbol to be used for the weight value defined by the associated `<integer>` weight value of the tuple.

> **Note:**
> The additive tuples must be specified in order of descending weight; otherwise, the descriptor declaration isn't valid and is ignored.

## Description

The `additive-symbols` descriptor defines a comma-separated list of _additive tuples_. Each _additive tuple_ contains a space-separated non-negative integer and counter symbol. To be valid, the list must be in the descending order of integer. The integer and symbol are concatenated together to form the counter symbol.

When the `system` descriptor value is `cyclic`, `numeric`, `alphabetic`, `symbolic`, or `fixed`, use the `symbols` descriptor instead of `additive-symbols`.

## Examples

### Specifying additive symbols

#### HTML

In this example, `system: additive` along with the `additive-symbols` descriptor values specify how numbers should be represented as Roman numerals. The value of each `` element in the list is converted to a Roman numeral according to the rules defined in `@counter-style`.

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li value="109">109</li>
  <li>110</li>
</ul>
```

#### CSS

```css
@counter-style uppercase-roman {
  system: additive;
  additive-symbols:
    1000 M,
    900 CM,
    500 D,
    400 CD,
    100 C,
    90 XC,
    50 L,
    40 XL,
    10 X,
    9 IX,
    5 V,
    4 IV,
    1 I;
}

ul {
  list-style: uppercase-roman;
  padding-left: 5em;
}
```

#### Result

For the list item with the value of `109`, the numeral `C` represents `100`, and `IX` represents `9`. This generates `CIX` counter for the list item `109`. The next list item automatically gets a value of `110`. The roman numeral `CX` is derived from `C` for `100` and `X` for `10`.

## See also

- `@counter-style` descriptors: `system`, `symbols`, `negative`, `prefix`, `suffix`, `range`, `pad`, `speak-as`, `fallback`
- List style properties: `list-style`, `list-style-image`, `list-style-position`
- `symbols()` function to create anonymous counter styles
- CSS counter styles module
