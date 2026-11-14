---
title: "`grid` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/grid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `grid` CSS media feature

The **`grid`** CSS media feature can be used to test whether the output device uses a grid-based screen.

Most modern computers and smartphones have bitmap-based screens. Examples of grid-based devices include text-only terminals and basic <example-value> with only one fixed font.

## Syntax

The `grid` feature is specified as a value representing whether the output device is grid-based — `1` if it is, and `0` if not.

## Examples

### HTML

```html
<p class="unknown">I don't know if you're using a grid device. :-(</p>
<p class="bitmap">You are using a bitmap device.</p>
<p class="grid">You are using a grid device! Neato!</p>
```

### CSS

```css
:not(.unknown) {
  color: lightgray;
}

@media (grid: 0) {
  .unknown {
    color: lightgray;
  }

  .bitmap {
    color: red;
    text-transform: uppercase;
  }
}

@media (grid: 1) {
  .unknown {
    color: lightgray;
  }

  .grid {
    color: black;
    text-transform: uppercase;
  }
}
```

## See also

- Using Media Queries
- @media
