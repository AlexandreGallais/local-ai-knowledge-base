---
title: "`range` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@counter-style/range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `range` CSS at-rule descriptor

The **`range`** descriptor lets the author specify one or more ranges of counter values for which the style is applied when defining custom counter styles with the `@counter-style` at-rule. When the `range` descriptor is included, the defined counter will only be used for values in the set ranges. If the counter value is outside the specified range, the fallback style will be used to construct the representation of that marker.

## Syntax

```css
/* Keyword value */
range: auto;

/* Range values */
range: 2 5;
range: infinite 10;
range: 6 infinite;
range: infinite infinite;

/* Multiple range values */
range:
  2 5,
  8 10;
range:
  infinite 6,
  10 infinite;
```

### Values

The value is a comma-separated list of ranges each including a lower and upper limit or the keyword `auto`.

- `auto`
    The entire set of numbers representable by the counter `system`. Those range values depends on the counter system:
    - For `cyclic`, `numeric`, and `fixed` systems, the range is negative `infinity` to positive `infinity`.
    - For `alphabetic` and `symbolic` systems, the range is `1` to positive `infinity`.
    - For `additive` systems, the range is `0` to `positive` infinity.
    - When using `extend` to extend a system, the range is whatever `auto` would produce for the system being extended, including extensions of complex predefined styles, such as some Japanese, Korean, Chinese, and Ethiopian counter styles.

- `[ [ <integer> | infinite ]{2} ]#`
    Each range within the comma separated list of ranges includes two values, each being either an `integer` or the keyword `infinite`. If `infinite` is used as the first value in a range, it represents negative infinity; if it is used as the second value, it represents positive infinity. The first value of each range is the lower bound for the range and the second value is the upper bound, inclusive. If the lower bound of any range in the list is higher than the upper bound, the entire `range` descriptor is invalid and will be ignored.

## Description

The value of the `range` descriptor can be either `auto` or a comma separated list of lower and upper bound ranges specified using negative or positive integers or the keyword `infinite`.

### Understanding `auto`

When the value is set to `auto`, the range is the default range for the counter system. If the `system` is `cyclic`, `numeric`, or `fixed`, the range will be from negative infinity to positive infinity. If the `system` is `alphabetic` or `symbolic`, the range will be from `1` to positive `infinity`. For `system: additive`, `auto` results in the range `0` to positive `infinity`.

When extending a counter, if `range` is set to `auto`, the range value will be the range of the `system` of the counter that is being extended, not the `range` value, if any, of that counter. For example, if counter "B" has the `system: extends A` set, with counter being an `alphabetic` counter, setting `range: auto` on "B" sets the range of "B" from `1` to `infinity`. This is the range of the `alphabetic` system, not necessarily the range set in the "A" counter style definition. With `range: auto` set on "B", the `range` is set to the default range of the `alphabetic` system, not the `range` value set in counter A's descriptor list.

### `infinite` explained

When range is specified as integers (versus `auto`), the value `infinite` can be used to denote infinity. If _infinite_ is specified as the first value in a range, then it is interpreted as negative infinity. If used as the upper bound, the second value in the range pair, it is taken as positive infinity.

### List of ranges

The value of `range` is either `auto`, discussed above, or a comma separated list of one or more ranges. The range of the counter style is the union of all the ranges defined in the list.

Each range in the list of ranges takes two values. Those values are either an `integer` or the keyword `infinite`. The first value is the _lower bound_, inclusive. The second value is the _upper bound_, inclusive. For two integer values, the lower value must come first. If the lower bound of any range in the list is higher than the upper bound, the entire `range` descriptor is invalid and will be ignored. The `infinite` keyword will not invalidate the range, because the position of `infinite` determines its value; either negative or positive infinity based on whether it's the lower bound or upper bound, respectively.

## Examples

### Setting counter style over a range

#### HTML

```html
<ul class="list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li>Six</li>
  <li>Seven</li>
  <li>Eight</li>
  <li>Nine</li>
  <li>Ten</li>
</ul>
```

#### CSS

```css
@counter-style range-multi-example {
  system: cyclic;
  symbols: "\25A0" "\25A1";
  range:
    2 4,
    7 9;
}

.list {
  list-style: range-multi-example;
}
```

#### Result

The first range is the list of ranges includes 2, 3, and 4. The second includes 7, 8, and 9. The range is the union of these two ranges, or 2, 3, 4, 7, 8, and 9.

## See also

- Other `@counter-style` descriptors: `system`, `symbols`, `additive-symbols`, `negative`, `prefix`, `suffix`, `pad`, `speak-as`, and `fallback`
- `list-style`, `list-style-image`, `list-style-position`
- `symbols()`: the functional notation for creating anonymous counter styles.
- CSS counter styles module
- CSS lists and counters module
