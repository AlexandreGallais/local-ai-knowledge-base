---
title: "Animation transitions and triggers (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/transition-and-triggers.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Animation transitions and triggers (part 2 of 2)

## Keyframes

To create an animation with multiple steps run in sequence, use _keyframes_.

Angular's `keyframe()` function allows several style changes within a single timing segment.
For example, the button, instead of fading, could change color several times over a single 2-second time span.

The code for this color change might look like this.

File: `status-slider.ts`

```ts
transition('* => active', [
  animate(
    '2s',
    keyframes([
      style({backgroundColor: 'blue'}),
      style({backgroundColor: 'red'}),
      style({backgroundColor: 'orange'}),
    ]),
  ),
```

### Offset

Keyframes include an `offset` that defines the point in the animation where each style change occurs.
Offsets are relative measures from zero to one, marking the beginning and end of the animation. They should be applied to each of the keyframe steps if used at least once.

Defining offsets for keyframes is optional.
If you omit them, evenly spaced offsets are automatically assigned.
For example, three keyframes without predefined offsets receive offsets of 0, 0.5, and 1.
Specifying an offset of 0.8 for the middle transition in the preceding example might look like this.

The code with offsets specified would be as follows.

File: `status-slider.ts`

```ts
transition('* => active', [
  animate(
    '2s',
    keyframes([
      style({backgroundColor: 'blue', offset: 0}),
      style({backgroundColor: 'red', offset: 0.8}),
      style({backgroundColor: '#754600', offset: 1.0}),
    ]),
  ),
]),
transition('* => inactive', [
  animate(
    '2s',
    keyframes([
      style({backgroundColor: '#754600', offset: 0}),
      style({backgroundColor: 'red', offset: 0.2}),
      style({backgroundColor: 'blue', offset: 1.0}),
    ]),
  ),
]),
```

You can combine keyframes with `duration`, `delay`, and `easing` within a single animation.

### Keyframes with a pulsation

Use keyframes to create a pulse effect in your animations by defining styles at specific offsets throughout the animation.

Here's an example of using keyframes to create a pulse effect:

- The original `open` and `closed` states, with the original changes in height, color, and opacity, occurring over a timeframe of 1 second
- A keyframes sequence inserted in the middle that causes the button to appear to pulsate irregularly over the course of that same 1 second timeframe

The code snippet for this animation might look like this.

File: `open-close.ts`

```ts
trigger('openClose', [
  state(
    'open',
    style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow',
    }),
  ),
  state(
    'close',
    style({
      height: '100px',
      opacity: 0.5,
      backgroundColor: 'green',
    }),
  ),
  // ...
  transition('* => *', [
    animate(
      '1s',
      keyframes([
        style({opacity: 0.1, offset: 0.1}),
        style({opacity: 0.6, offset: 0.2}),
        style({opacity: 1, offset: 0.5}),
        style({opacity: 0.2, offset: 0.7}),
      ]),
    ),
  ]),
]),
```

### Animatable properties and units

Angular animations are built on top of web animations, so you can animate any property that the browser considers animatable.
This includes positions, sizes, transforms, colors, borders, and more.
The W3C maintains a list of animatable properties on its CSS Transitions page.

For properties with a numeric value, define a unit by providing the value as a string, in quotes, with the appropriate suffix:

- 50 pixels:
  `'50px'`

- Relative font size:
  `'3em'`

- Percentage:
  `'100%'`

You can also provide the value as a number. In such cases Angular assumes a default unit of pixels, or `px`.
Expressing 50 pixels as `50` is the same as saying `'50px'`.

HELPFUL: The string `"50"` would instead not be considered valid\).

### Automatic property calculation with wildcards

Sometimes, the value of a dimensional style property isn't known until runtime.
For example, elements often have widths and heights that depend on their content or the screen size.
These properties are often challenging to animate using CSS.

In these cases, you can use a special wildcard `*` property value under `style()`. The value of that particular style property is computed at runtime and then plugged into the animation.

The following example has a trigger called `shrinkOut`, used when an HTML element leaves the page.
The animation takes whatever height the element has before it leaves, and animates from that height to zero.

File: `hero-list-auto.ts`

```ts
animations: [
  trigger('shrinkOut', [
    state('in', style({height: '*'})),
    transition('* => void', [style({height: '*'}), animate(250, style({height: 0}))]),
  ]),
],
```

### Keyframes summary

The `keyframes()` function in Angular allows you to specify multiple interim styles within a single transition. An optional `offset` can be used to define the point in the animation where each style change should occur.

## More on Angular animations

You might also be interested in the following:

  - Introduction to Angular animations
  - Complex animation sequences
  - Reusable animations
  - Route transition animations
  - Migrating to Native CSS Animations
