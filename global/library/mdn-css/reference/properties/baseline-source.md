---
title: "`baseline-source` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/baseline-source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `baseline-source` CSS property

The **`baseline-source`** CSS property defines which baseline to use when inline-level boxes have multiple possible baselines, such as multi-line inline blocks or inline flex containers.
The values allow for choosing between aligning to the box's first baseline, last baseline, or letting the browser decide automatically based on the box type.

## Syntax

```css
/* Keyword values */
baseline-source: auto;
baseline-source: first;
baseline-source: last;

/* Global values */
baseline-source: inherit;
baseline-source: initial;
baseline-source: revert;
baseline-source: revert-layer;
baseline-source: unset;
```

### Values

- `auto`
    Specifies `last baseline` alignment for inline-block, `first baseline` alignment for everything else.
- `first`
    Specifies `first baseline` alignment.
- `last`
    Specifies `last baseline` alignment.

## Examples

### Baseline selection in inline flex containers

This example demonstrates using the `baseline-source` property to control the baseline alignment of inline flex containers.

#### HTML

Our HTML includes several `` elements, which are generic inline containers for phrasing content.
Three of the `` elements contain nested `` children.

```html
<span>Baseline ___</span>

<span class="box first">
  <span>First</span>
  <span>A</span>
  <span>B</span>
  <span>C</span>
</span>

<span class="box auto">
  <span>Auto</span>
  <span>A</span>
  <span>B</span>
  <span>C</span>
</span>

<span class="box last">
  <span>A</span>
  <span>B</span>
  <span>C</span>
  <span>Last</span>
</span>
```

#### CSS

```css
body {
  font-family: sans-serif;
}

.box {
  border: 2px solid #888888;
  width: 50px;
}

span {
  padding: 0.4rem;
}
```

We define all the boxes to be inline flex containers.
We set the `.first` box to use the first baseline, the `.auto` box uses the default baseline (which is `first` for inline flex containers), and the `.last` box uses the last baseline.

```css
.box {
  display: inline-flex;
  flex-direction: column;
}

.first {
  baseline-source: first;
}

.auto {
  baseline-source: auto;
}

.last {
  baseline-source: last;
}
```

#### Result

## See also

- `vertical-align` property
- CSS box alignment overview
