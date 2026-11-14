---
title: "CSS nesting and specificity"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/nesting/nesting_and_specificity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS nesting and specificity

The specificity of the `&` nesting selector is calculated using the largest specificity in the associated selector list. This is identical to how specificity is calculated when using the `:is()` function.

```html
<b class="foo">
  <i>Blue text</i>
</b>
```

## `&` nesting syntax

```css
#a, b {
  & i {
    color: blue;
  }
}

.foo i {
  color: red;
}
```

## `:is()` syntax

```css
:is(#a, b) {
  & i {
    color: blue;
  }
}

.foo i {
  color: red;
}
```

In this example, the id selector (`#a`) has a specificity of `1-0-0`, while the type selector (`b`) has a specificity of `0-0-1`. The `&` nesting selector and `:is()` pseudo-class both take a specificity of `1-0-0`, even though the `#a` id selector is never used.

The `.foo` class selector has a specificity of `0-1-0`. This makes the total specificity `1-0-1` for `& i` and `0-1-1` for `.foo i`, meaning that `color: blue;` wins out.

## See also

- CSS nesting module
- `&` nesting selector
- Using CSS nesting
- Nesting at-rules
