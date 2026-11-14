---
title: "`mix-blend-mode` CSS property (part 1 of 5)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/mix-blend-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `mix-blend-mode` CSS property

The **`mix-blend-mode`** CSS property sets how an element's content should blend with its _backdrop_ — the content rendered behind the element within the same stacking context.

> **Note:**
> This property blends the element with content _behind_ it in the stacking context.
> To blend an element's own background layers with each other, use `background-blend-mode` instead.

```css
mix-blend-mode: normal;
```

```css
mix-blend-mode: multiply;
```

```css
mix-blend-mode: hard-light;
```

```css
mix-blend-mode: difference;
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <img
      id="example-element"
      src="/shared-assets/images/examples/firefox-logo.svg"
      width="200" />
  </div>
</section>
```

```css
.example-container {
  background-color: sandybrown;
}
```

## Syntax

```css
/* Keyword values */
mix-blend-mode: normal;
mix-blend-mode: multiply;
mix-blend-mode: screen;
mix-blend-mode: overlay;
mix-blend-mode: darken;
mix-blend-mode: lighten;
mix-blend-mode: color-dodge;
mix-blend-mode: color-burn;
mix-blend-mode: hard-light;
mix-blend-mode: soft-light;
mix-blend-mode: difference;
mix-blend-mode: exclusion;
mix-blend-mode: hue;
mix-blend-mode: saturation;
mix-blend-mode: color;
mix-blend-mode: luminosity;
mix-blend-mode: plus-darker;
mix-blend-mode: plus-lighter;

/* Global values */
mix-blend-mode: inherit;
mix-blend-mode: initial;
mix-blend-mode: revert;
mix-blend-mode: revert-layer;
mix-blend-mode: unset;
```

### Values

- `<blend-mode>`
    The blending mode that should be applied.
- `plus-darker`
    Blending using the _plus-darker_ compositing operator.
- `plus-lighter`
    Blending using the _plus-lighter_ compositing operator. Useful for cross-fade effects (prevents unwanted blinking when two overlaying elements animate their opacity in opposite directions).
