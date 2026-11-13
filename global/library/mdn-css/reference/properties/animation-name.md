---
title: "`animation-name` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/animation-name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `animation-name` CSS property

The **`animation-name`** CSS property specifies the names of one or more `@keyframes` at-rules that describe the animation to apply to an element. Multiple `@keyframes` at-rules are specified as a comma-separated list of names. If the specified name does not match any `@keyframes` at-rule, no properties are animated.

It is often convenient to use the shorthand property `animation` to set all animation properties at once.

```css
animation-name: none;
```

```css
animation-name: slide;
```

```css
animation-name: bounce;
```

```html
<section class="flex-column" id="default-example">
  <div class="animating" id="example-element"></div>
</section>
```

```css
#example-element {
  animation-direction: alternate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
  background-color: #1766aa;
  border-radius: 50%;
  border: 5px solid #333333;
  color: white;
  height: 150px;
  margin: auto;
  margin-left: 0;
  width: 150px;
}

@keyframes slide {
  from {
    background-color: orange;
    color: black;
    margin-left: 0;
  }
  to {
    background-color: orange;
    color: black;
    margin-left: 80%;
  }
}

@keyframes bounce {
  from {
    background-color: orange;
    color: black;
    margin-top: 0;
  }
  to {
    background-color: orange;
    color: black;
    margin-top: 40%;
  }
}
```

## Syntax

```css
/* No animation */
animation-name: none;

/* Single animation */
animation-name: test_05;
animation-name: -specific;
animation-name: "sliding-vertically";

/* Multiple animations */
animation-name: test1, animation4;
animation-name:
  none,
  -moz-specific,
  sliding;

/* Global values */
animation-name: inherit;
animation-name: initial;
animation-name: revert;
animation-name: revert-layer;
animation-name: unset;
```

### Values

This property is specified as one or more comma-separated values:

- `none`
    A special keyword denoting no keyframes. It can be used to deactivate an animation without changing the ordering of the other identifiers, or to deactivate animations coming from the cascade.
- `<custom-ident>`
    An unquoted name identifying the animation. This identifier is composed of a combination of case-sensitive letters `a` to `z`, numbers `0` to `9`, underscores (`_`), and/or dashes (`-`). The first non-dash character must be a letter. Also, two dashes are forbidden at the beginning of the identifier. Furthermore, the identifier can't be `none`, `unset`, `initial`, or `inherit`.
- `<string>`
    A series of characters following the same rules as custom identifiers, as described above, except that they are surrounded by either double (") or single (') quotes. If using a quoted string for both the `animation-name` and the corresponding `@keyframes` at-rule name, `none`, global keywords, and names starting with an underscore or double dashes are valid, though not recommended.

> **Note:**
> When you specify multiple comma-separated values on an `animation-*` property, they are applied to the animations in the order in which the `animation-name`s appear. For situations where the number of animations and `animation-*` property values do not match, see Setting multiple animation property values.

## Examples

### Naming an animation

This animation has an `animation-name` of `rotate`.

#### HTML

```html
<div class="box"></div>
```

#### CSS

```css
.box {
  background-color: rebeccapurple;
  border-radius: 10px;
  width: 100px;
  height: 100px;
}

.box:hover {
  animation-name: rotate;
  animation-duration: 0.7s;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

#### Result

Hover over the rectangle to start the animation.

See CSS animations for examples.

## See also

- Using CSS animations
- JavaScript `AnimationEvent` API
- Other related animation properties: `animation`, `animation-composition`, `animation-delay`, `animation-direction`, `animation-duration`, `animation-fill-mode`, `animation-iteration-count`, `animation-play-state`, `animation-timeline`, `animation-timing-function`
