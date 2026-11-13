---
title: "`isolation` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/isolation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `isolation` CSS property

The **`isolation`** CSS property determines whether an element must create a new stacking context.

This property is especially helpful when used in conjunction with `mix-blend-mode` and `z-index`.

```css
isolation: auto;
```

```css
isolation: isolate;
```

```html
<section class="default-example" id="default-example">
  <div class="background-container">
    <div id="example-element">
      <img src="/shared-assets/images/examples/firefox-logo.svg" />
      <p><code>mix-blend-mode: multiply;</code></p>
    </div>
  </div>
</section>
```

```css
.background-container {
  background-color: #f4f460;
  width: 250px;
}

#example-element {
  border: 1px solid black;
  margin: 2em;
}

#example-element * {
  mix-blend-mode: multiply;
  color: #8245a3;
}
```

## Syntax

```css
/* Keyword values */
isolation: auto;
isolation: isolate;

/* Global values */
isolation: inherit;
isolation: initial;
isolation: revert;
isolation: revert-layer;
isolation: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    A new stacking context is created only if one of the properties applied to the element requires it.
- `isolate`
    A new stacking context must be created.

## Examples

### Forcing a new stacking context for an element

#### HTML

```html
<div class="big-square">
  <div class="isolation-auto">
    <div class="small-square">auto</div>
  </div>
  <div class="isolation-isolate">
    <div class="small-square">isolate</div>
  </div>
</div>
```

#### CSS

```css
.isolation-auto {
  isolation: auto;
}

.isolation-isolate {
  isolation: isolate;
}

.big-square {
  background-color: lime;
  width: 200px;
  height: 210px;
}

.small-square {
  background-color: lime;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  padding: 2px;
  mix-blend-mode: difference;
}
```

#### Result

## See also

- `<blend-mode>`
- `mix-blend-mode`, `background-blend-mode`
