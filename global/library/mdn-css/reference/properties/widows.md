---
title: "`widows` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/widows/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `widows` CSS property

The **`widows`** CSS property sets the minimum number of lines in a block container that must be shown at the _top_ of a page, region, or column.

In typography, a _widow_ is the last line of a paragraph that appears alone at the top of a page. (The paragraph is continued from a prior page.)

## Syntax

```css
/* <integer> values */
widows: 2;
widows: 3;

/* Global values */
widows: inherit;
widows: initial;
widows: revert;
widows: revert-layer;
widows: unset;
```

### Values

This property is specified as one `<integer>`:

- `<integer>`
    The minimum number of lines that can stay by themselves at the top of a new fragment after a fragmentation break. The value must be positive.

## Examples

### Controlling column widows

This example uses a checkbox to switch `widows` between `2` and `1`. With `widows: 2`, at least two lines of a paragraph must appear at the top of a column. With `widows: 1`, the paragraph can be broken anywhere.

#### HTML

```html
<div>
  <p>This is the first paragraph containing some text.</p>
  <p>
    This is the second paragraph containing some more text than the first one.
    It is used to demonstrate how widows work.
  </p>
  <p>
    This is the third paragraph. It has a little bit more text than the first
    one.
  </p>
</div>
<form>
  <input type="checkbox" id="widows" checked />
  <label for="widows">Apply widows: 2</label>
</form>
```

#### CSS

```css
div {
  background-color: #8cffa0;
  width: 400px;
  height: 160px;
  columns: 3;
  column-fill: auto;
  orphans: 1;
  widows: 1;
}

div:has(~ form input:checked) {
  widows: 2;
}

p {
  background-color: #8ca0ff;
}

p:first-child {
  margin-top: 0;
}
```

#### Result

In Firefox, which does not support `widows`, the behavior in this example is essentially equivalent to `widows: 1`, regardless of the checkbox state. The following screenshot shows the result with `widows: 2` in a supporting browser:

## See also

- `orphans`
- Paged media
