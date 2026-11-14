---
title: "`interpolate-size` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/interpolate-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `interpolate-size` CSS property

The **`interpolate-size`** CSS property allows you to enable animations and transitions between a `<length-percentage>` value and an intrinsic size, `fit-content`, or `max-content`.

This property is typically used to animate the `width` and/or `height` of a container between a `<length-percentage>` and the full size of its content (i.e., between "closed" and "open" or "hide" and "reveal" states) when animating a non-box-model CSS property, such as `transform`, is not a viable solution.

> **Note:**
> The behavior opted-into by `interpolate-size` cannot be enabled by default across the web because many sites in the wild use stylesheets that assume intrinsic size values cannot be animated. Enabling it by default would cause several backwards-compatibility issues (see relevant CSS WG discussion).

## Syntax

```css
/* Keyword values */
interpolate-size: allow-keywords;
interpolate-size: numeric-only;

/* Global values */
interpolate-size: inherit;
interpolate-size: initial;
interpolate-size: revert;
interpolate-size: revert-layer;
interpolate-size: unset;
```

### Values

This property is specified as one of the following keyword values:

- `allow-keywords`
    Enables interpolation between a `length-percentage` value and an intrinsic size value, to allow animation between the two.
- `numeric-only`
    The default behavior — intrinsic size values cannot be interpolated.

## Description

Setting `interpolate-size: allow-keywords` enables interpolation between a `length-percentage` value and an intrinsic size value. Note that it does not enable animating between two intrinsic size values. One end of the animation must be a `<length-percentage>`.

The `interpolate-size` value is inherited, so animating to (or from) an intrinsic size value can be enabled for an entire document by setting it on the document root:

```css
:root {
  interpolate-size: allow-keywords;
}
```

If you want to limit the scope, you can set it on the relevant container element. The following enables interpolating intrinsic sizes only for `` and its descendants:

```css
main {
  interpolate-size: allow-keywords;
}
```

> **Note:**
> The `calc-size()` function's return values can also be interpolated. In effect, including `calc-size()` in a property value automatically applies `interpolate-size: allow-keywords` to the selection. However, because `interpolate-size` is inherited as explained above, it is the preferred solution for enabling intrinsic size animations in most cases. You should only use `calc-size()` to enable intrinsic size animations if they also require calculations.

### Values that can be interpolated

The following intrinsic values can currently be opted-in to animations:

- `auto`
- `min-content`
- `max-content`
- `fit-content`
- `content` (for containers sized using `flex-basis`).

## Examples

### Basic `interpolate-size` usage

This example demonstrates how to set `interpolate-size: allow-keywords` on a document to enable animations involving an intrinsic size. The demo features a character badge/"name tag", which can be hovered or focused to reveal information about the character. The reveal is handled by a `height` transition between a set length and `max-content`.

#### HTML

The HTML contains a single `` element with `tabindex="0"` set on it so it can receive keyboard focus. The `` contains `` and `` elements, each with their own child content.

```html
<section tabindex="0">
  <header>
    <h2>Tanuki</h2>
  </header>
  <main>
    <p>Tanuki is the silent phantom of MDN.</p>
    <ul>
      <li><strong>Height</strong>: 3.03m</li>
      <li><strong>Weight</strong>: 160kg</li>
      <li><strong>Tech Fu</strong>: 7</li>
      <li><strong>Bad Jokes</strong>: 9</li>
    </ul>
  </main>
</section>
```

#### CSS

```css
* {
  box-sizing: border-box;
}

section {
  font-family: "Helvetica", "Arial", sans-serif;
  width: 175px;
  border-radius: 5px;
  background: #eeeeee;
  box-shadow:
    inset 1px 1px 4px rgb(255 255 255 / 0.5),
    inset -1px -1px 4px rgb(0 0 0 / 0.5);
}

header {
  padding: 0.7rem;
  border-bottom: 2px solid #cccccc;
}

main {
  padding: 10px;
}

h2 {
  margin: 0;
  font-weight: normal;
  font-size: 1.1rem;
  text-align: center;
  letter-spacing: 1px;
}

p,
li {
  font-size: 0.8rem;
  line-height: 1.5;
}

p {
  margin-top: 0;
}
```

In the CSS, we first set `interpolate-size: allow-keywords` on the `:root`, to enable it for the whole document.

```css
:root {
  interpolate-size: allow-keywords;
}
```

We then set the ``'s `height` to `2.5rem` and `overflow` to `hidden` so only the `` is shown by default, then specify a `transition` that animates the `` `height` over 1 second during state change. Finally, we set the `` `height` on `:hover` and `:focus` to `max-content`.

```css
section {
  height: 2.5rem;
  overflow: hidden;
  transition: height ease 1s;
}

section:hover,
section:focus {
  height: max-content;
}
```

The rest of the CSS has been hidden for brevity.

#### Result

Try hovering over the `` or focusing it via the keyboard — it will animate to its full height, revealing all the content.

## See also

- `calc-size()`
- Animate to height: auto; (and other intrinsic sizing keywords) in CSS on developer.chrome.com (2024)
