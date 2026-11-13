---
title: "`<relative-size>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/relative-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<relative-size>` CSS type

The **`<relative-size>`** CSS data type describes relative size keywords. The `<relative-size>` keywords define a size relative to the computed size of the parent element. This data type is used in the `font` shorthand and `font-size` properties.

## Syntax

```plain
<relative-size> = smaller | larger
```

### Values

The `<relative-size>` data type is defined using a keyword value chosen from the list below.

- `smaller`
    A relative size one size smaller than the inherited size.

- `larger`
    A relative size one size larger than the inherited size.

## Description

The `<relative-size>` keywords are relative to the current size of the element. If the inherited size is defined using an `absolute-size` keyword, the `<relative-size>` value equates to the adjacent size in the `<absolute-size>` table. Otherwise, the relative increase or decrease in size is between 120% and 150%.

## Examples

### Comparing the keyword values

```html
<ul>
  <li class="smaller">font-size: smaller;</li>
  <li>font-size is not specified</li>
  <li class="larger">font-size: larger;</li>
</ul>
```

```css
li {
  margin-bottom: 0.3em;
}
.smaller {
  font-size: smaller;
}
.larger {
  font-size: larger;
}
```

#### Result

## See also

- CSS `absolute-size` data type
- CSS `font` and `font-size` properties
- CSS fonts module
