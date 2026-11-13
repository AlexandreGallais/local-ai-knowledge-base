---
title: "`transition-property` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/transition-property/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `transition-property` CSS property

The **`transition-property`** CSS property sets the CSS properties to which a transition effect should be applied.

If you specify a shorthand property (e.g., `background`), all of its longhand sub-properties that can be animated will be.

```css
transition-property: margin-right;
```

```css
transition-property: margin-right, color;
```

```css
transition-property: all;
```

```css
transition-property: none;
```

```html
<section id="default-example">
  <div id="example-element">Hover to see<br />the transition.</div>
</section>
```

```css
#example-element {
  background-color: #e4f0f5;
  color: black;
  padding: 1rem;
  border-radius: 0.5rem;
  font: 1em monospace;
  width: 100%;
  transition: margin-right 2s;
}

#default-example:hover > #example-element {
  background-color: #990099;
  color: white;
  margin-right: 40%;
}
```

## Syntax

```css
/* Keyword values */
transition-property: none;
transition-property: all;

/* <custom-ident> values */
transition-property: test_05;
transition-property: -specific;
transition-property: sliding-vertically;

/* Multiple values */
transition-property: test1, animation4;
transition-property: all, height, color;
transition-property:
  all,
  -moz-specific,
  sliding;

/* Global values */
transition-property: inherit;
transition-property: initial;
transition-property: revert;
transition-property: revert-layer;
transition-property: unset;
```

### Values

- `none`
    No properties will transition.
- `all`
    All properties that can transition will.
- `<custom-ident>`
    A string identifying the property to which a transition effect should be applied when its value changes.

## Examples

### Basic <example-value>

When the button is hovered or focused, it undergoes a one-second color transition; the `transition-property` is `background-color`.

#### HTML

```html
<button class="target">Focus me!</button>
```

#### CSS

```css
html {
  height: 100vh;
}

button {
  font-size: 1.4rem;
  padding: 10px 20px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  outline: none;
}
```

```css
.target {
  transition-property: background-color;
  transition-duration: 1s;
  background-color: #cccccc;
}

.target:hover,
.target:focus {
  background-color: #eeeeee;
}
```

See our Using CSS transitions guide for more `transition-property` examples.

## See also

- Using CSS transitions
- `transition`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`
- `TransitionEvent`
