---
title: "`caret-animation` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/caret-animation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `caret-animation` CSS property

The **`caret-animation`** CSS property is used to enable or disable the blinking behavior of the **insertion caret**, the visible marker that appears in editable elements to indicate where the next character will be inserted or deleted.

The `caret-animation` property can also be set as part of the `caret` shorthand property.

> **Note:**
> When applying a custom animation to the caret, you should stop the default blinking so that it doesn't interfere with the animation.

## Syntax

```css
/* Keyword values */
caret-animation: auto;
caret-animation: manual;

/* Global values */
caret-animation: inherit;
caret-animation: initial;
caret-animation: revert;
caret-animation: revert-layer;
caret-animation: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    The caret blinks on and off. This is the default (initial) value.
- `manual`
    The caret does not blink on and off.

## Examples

### Basic `caret-animation` usage

This example shows the difference between having `caret-animation` set to `auto` versus `manual` on an editable element.

#### HTML

The markup features two `` elements with `contenteditable` set to make them editable.

```html
<p contenteditable="true">
  My caret animates because <code>caret-animation</code> is set to
  <code>auto</code>.
</p>
<p contenteditable="true">
  My caret doesn't animate because <code>caret-animation</code> is set to
  <code>manual</code>.
</p>
```

#### CSS

The CSS sets the `caret-color` value to `red`. It then gives the first paragraph a `caret-animation` value of `auto` and the second paragraph a `caret-animation` value of `manual`.

```css
p {
  caret-color: red;
}

p:first-of-type {
  caret-animation: auto;
}

p:last-of-type {
  caret-animation: manual;
}
```

#### Result

The rendered result looks like so:

Try focusing the two paragraphs to see the difference in caret behavior.

### Creating a custom caret animation

In this example, a custom caret animation is applied to an editable paragraph and a text input.

#### HTML

The markup features a `` element and two text `` elements. The `` element has the `contenteditable` attribute set on it to make it editable. The paragraph and first text input have a `class` of `custom-caret` set on them.

```html
<p contenteditable="true" class="custom-caret">
  This paragraph has a custom animation applied to it, plus
  <code>caret-animation: manual</code> to stop the default caret blinking and
  allow the smooth animation to be seen.
</p>

<input
  type="text"
  class="custom-caret"
  value="I've got a custom caret animation" />

<input type="text" value="I've got the default blinking caret" />
```

#### CSS

We first define a set of `@keyframes` that change the `caret-color` from `transparent` to `darkblue`.

```css
@keyframes custom-caret-animation {
  from {
    caret-color: transparent;
  }

  to {
    caret-color: darkblue;
  }
}
```

We then style the `` and the first `` with the custom `@keyframes` animation, a `caret-color`, and a `caret-animation` value of `manual` to turn the default caret blinking behavior off.

```css
body {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 20px;
}
```

```css
.custom-caret {
  animation: custom-caret-animation infinite linear alternate 0.75s;
  caret-color: darkblue;
  caret-animation: manual;
}

p,
input {
  font-size: 1.6rem;
}
```

#### Result

The rendered result looks like so:

Try focusing the first two elements to see what the custom caret animation looks like. To compare it with the default blinking caret, you can focus the third element.

## See also

- `caret-color`, `caret-shape`
- `caret` shorthand
- CSS basic user interface module
