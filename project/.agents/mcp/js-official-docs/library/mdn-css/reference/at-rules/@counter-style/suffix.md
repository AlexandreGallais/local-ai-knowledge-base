---
title: "`suffix` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@counter-style/suffix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `suffix` CSS at-rule descriptor

The **`suffix`** descriptor of the `@counter-style` rule specifies content that will be added to the end of the marker representation.

## Syntax

```css
/* <symbol> value: string, image, or identifier  */
suffix: "";
suffix: ") ";
suffix: url("bullet.png");
```

### Values

The **`suffix`** descriptor takes as its value a single `<symbol>`:

- `<symbol>`
    Specifies a `<symbol>` that is appended to the marker representation. It may be a `<string>`, `image`, or `<custom-ident>`.

## Examples

### Setting a suffix for a counter

#### HTML

```html
<ul class="choices">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>None of the above</li>
</ul>
```

#### CSS

```css
@counter-style options {
  system: fixed;
  symbols: A B C D;
  suffix: ") ";
}

.choices {
  list-style: options;
}
```

#### Result

## See also

- Other `@counter-style` descriptors: `system`, `symbols`, `additive-symbols`, `negative`, `prefix`, `range`, `pad`, `speak-as`, and `fallback`
- `list-style`, `list-style-image`, `list-style-position`
- `symbols()`: the functional notation for creating anonymous counter styles
- CSS counter styles module
- CSS lists and counters module
