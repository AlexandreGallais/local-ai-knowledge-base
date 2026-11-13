---
title: "`transition` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/transition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `transition` CSS property

The **`transition`** CSS shorthand property for `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`, and `transition-behavior`.

Transitions enable you to define the transition between two states of an element. Different states may be defined using pseudo-classes like `:hover` or `:active` or dynamically set using JavaScript.

```css
transition: margin-right 2s;
```

```css
transition: margin-right 2s 0.5s;
```

```css
transition: margin-right 2s ease-in-out;
```

```css
transition: margin-right 2s ease-in-out 0.5s;
```

```css
transition:
  margin-right 2s,
  color 1s;
```

```css
transition: all 1s ease-out;
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

## Constituent properties

This property is a shorthand for the following CSS properties:

- `transition-behavior`
- `transition-delay`
- `transition-duration`
- `transition-property`
- `transition-timing-function`

## Syntax

```css
/* Apply to 1 property */
/* property name | duration */
transition: margin-right 4s;

/* property name | duration | delay */
transition: margin-right 4s 1s;

/* property name | duration | easing function */
transition: margin-right 4s ease-in-out;

/* property name | duration | easing function | delay */
transition: margin-right 4s ease-in-out 1s;

/* property name | duration | behavior */
transition: display 4s allow-discrete;

/* Apply to 2 properties */
transition:
  margin-right 4s,
  color 1s;

/* Apply to all changed properties */
transition: all 0.5s ease-out allow-discrete;
transition: 200ms linear 50ms;

/* Global values */
transition: inherit;
transition: initial;
transition: revert;
transition: revert-layer;
transition: unset;
```

The `transition` property value is specified as one of the following:

- The special value `none`, which specifies that no transitions will occur on this element. This is the default value.
- One or more single-property transitions, separated by commas.

Each single-property transition describes the transition that should be applied to a single property or all properties. It includes:

- zero or one value representing the property or properties to which the transition should apply. This can be set as:
  - A `<custom-ident>` representing a single property.
  - The special value `all`, which specifies that the transition will be applied to all properties that change as the element changes state.
  - No value, in which case a value of `all` will be inferred and the specified transition will still apply to all changing properties.
- zero or one `easing-function` value representing the easing function to use
- zero, one, or two `<time>` values. The first value that can be parsed as a time is assigned to the `transition-duration`, and the second value that can be parsed as a time is assigned to `transition-delay`.
- zero or one value declaring whether to start transitions for properties whose animation behavior is discrete. The value, if present, is either the keyword `allow-discrete` or the keyword `normal`.

If you specify `all` as the transition property for one single-property transition, but then specify subsequent single-property transitions with `<custom-ident>` values, those subsequent transitions will override the first one. For example:

```css
transition:
  all 200ms,
  opacity 400ms;
```

In this case, all the properties that change as the element changes state will transition with a duration of 200ms except for `opacity`, which will take 400ms to transition.

See how things are handled when lists of property values aren't the same length. In short, extra transition descriptions beyond the number of properties actually being animated are ignored.

## Examples

### Basic <example-value>

In this example, when the user hovers over the element, there is a half-second (`500ms`) delay before a two-second `background-color` transition occurs.

#### HTML

```html
<a class="target">Hover over me</a>
```

#### CSS

We include two `time` values. In the `transition` shorthand, the first `<time>` value is the `transition-duration`. The second time value is the `transition-delay`. Both default to `0s` if omitted.

```css
.target {
  font-size: 2rem;
  background-color: palegoldenrod;
  transition: background-color 2s 500ms;
}

.target:hover {
  background-color: darkorange;
}
```

## See also

- CSS transitions module
- Using CSS transitions
- `TransitionEvent`
