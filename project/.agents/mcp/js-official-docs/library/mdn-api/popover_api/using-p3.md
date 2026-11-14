---
title: "Using the Popover API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/popover_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Popover API (part 3 of 3)

## Animating popovers

Popovers are set to `display: none;` when hidden and `display: block;` when shown, as well as being removed from / added to the top layer and the accessibility tree. Therefore, for popovers to be animated, the `display` property needs to be animatable. Supporting browsers animate `display` with a variation on the discrete animation type. Specifically, the browser will flip between `none` and another value of `display` so that the animated content is shown for the entire animation duration. So, for example:

- When animating `display` from `none` to `block` (or another visible `display` value), the value will flip to `block` at `0%` of the animation duration so it is visible throughout.
- When animating `display` from `block` (or another visible `display` value) to `none`, the value will flip to `none` at `100%` of the animation duration so it is visible throughout.

> **Note:**
> When animating using CSS transitions, `transition-behavior: allow-discrete` needs to be set to enable the above behavior. When animating with CSS animations, the above behavior is available by default; an equivalent step is not required.

### Transitioning a popover

When animating popovers with CSS transitions, the following features are required:

- `@starting-style` at-rule
    Provides a set of starting values for properties set on the popover that you want to transition from when it is first shown. This is needed to avoid unexpected behavior. By default, CSS transitions only occur when a property changes from one value to another on a visible element; they are not triggered on an element's first style update, or when the `display` type changes from `none` to another type.
- `display` property
    Add `display` to the transitions list so that the popover will remain as `display: block` (or another visible `display` value) for the duration of the transition, ensuring the other transitions are visible.
- `overlay` property
    Include `overlay` in the transitions list to ensure the removal of the popover from the top layer is deferred until the transition completes, again ensuring the transition is visible.
- `transition-behavior` property
    Set `transition-behavior: allow-discrete` on the `display` and `overlay` transitions (or on the `transition` shorthand) to enable discrete transitions on these two properties that are not by default animatable.

Let's have a look at an example so you can see what this looks like:

#### HTML

The HTML contains a `` element declared to be a popover via the global `popover` HTML attribute, and a `` element designated as the popover's display control:

```html
<button popovertarget="mypopover">Show the popover</button>
<div popover="auto" id="mypopover">I'm a Popover! I should animate.</div>
```

#### CSS

The two popover properties we want to transition are `opacity` and `transform`. We want the popover to fade in or out while growing or shrinking horizontally. To achieve this, we set a starting state for these properties on the hidden state of the popover element (selected with the `[popover]` attribute selector) and an end state for the shown state of the popover (selected via the `:popover-open` pseudo-class). We also use the `transition` property to define the properties to animate and the animation's duration as the popover gets shown or hidden.

```css
html {
  font-family: "Helvetica", "Arial", sans-serif;
}

/* Transition for the popover itself */

[popover]:popover-open {
  opacity: 1;
  transform: scaleX(1);
}

[popover] {
  font-size: 1.2rem;
  padding: 10px;

  /* Final state of the exit animation */
  opacity: 0;
  transform: scaleX(0);

  transition:
    opacity 0.7s,
    transform 0.7s,
    overlay 0.7s allow-discrete,
    display 0.7s allow-discrete;
  /* Equivalent to
  transition: all 0.7s allow-discrete; */
}

/* Needs to be after the previous [popover]:popover-open rule
to take effect, as the specificity is the same */
@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: scaleX(0);
  }
}

/* Transition for the popover's backdrop */

[popover]::backdrop {
  background-color: transparent;
  transition:
    display 0.7s allow-discrete,
    overlay 0.7s allow-discrete,
    background-color 0.7s;
  /* Equivalent to
  transition: all 0.7s allow-discrete; */
}

[popover]:popover-open::backdrop {
  background-color: rgb(0 0 0 / 25%);
}

/* The nesting selector (&) cannot represent pseudo-elements
so this starting-style rule cannot be nested */

@starting-style {
  [popover]:popover-open::backdrop {
    background-color: transparent;
  }
}
```

As discussed earlier, we have also:

- Set a starting state for the `transition` inside the `@starting-style` block.
- Added `display` to the list of transitioned properties so that the animated element is visible (set to `display: block`) throughout the popover's entry and exit animations. Without this, the exit animation would not be visible; in effect, the popover would just disappear.
- Added `overlay` to the list of transitioned properties to make sure that the removal of the element from the top layer is deferred until the animation has been completed. The effect of this may not be noticeable for basic <example-value> such as this one, but in more complex cases, omitting this property can result in the element being removed from the overlay before the transition completes.
- Set `allow-discrete` on both properties in the above transitions to enable discrete transitions.

You'll note that we've also included a transition on the `::backdrop` appearing behind the popover when it opens, providing a nice darkening animation.

#### Result

The code renders as follows:

> **Note:**
> Because popovers change from `display: none` to `display: block` each time they are shown, the popover transitions from its `@starting-style` styles to its `[popover]:popover-open` styles every time the entry transition occurs. When the popover closes, it transitions from its `[popover]:popover-open` state to the default `[popover]` state.
>
> It is possible for the style transition on entry and exit to be different in such cases. See our Demonstration of when starting styles are used example for a proof of this.

### A popover keyframe animation

When animating a popover with CSS keyframe animations, there are some differences to note:

- You don't provide a `@starting-style`; you include your "to" and "from" `display` values in keyframes.
- You don't explicitly enable discrete animations; there is no equivalent to `allow-discrete` inside keyframes.
- You don't need to set `overlay` inside keyframes either; the `display` animation handles the animation of the popover from shown to hidden.

Let's look at an example.

#### HTML

The HTML contains a `` element declared as a popover, and a `` element designated as the popover's display control:

```html
<button popovertarget="mypopover">Show the popover</button>
<div popover="auto" id="mypopover">I'm a Popover! I should animate.</div>
```

#### CSS

We have defined keyframes that specify the desired entry and exit animations, and an entry animation for the backdrop only. Note that it wasn't possible to animate the backdrop fade out — the backdrop is immediately removed from the DOM when the popover is closed, so there is nothing to animate.

```css
html {
  font-family: "Helvetica", "Arial", sans-serif;
}

[popover] {
  font-size: 1.2rem;
  padding: 10px;
  animation: fade-out 0.7s ease-out;
}

[popover]:popover-open {
  animation: fade-in 0.7s ease-out;
}

[popover]:popover-open::backdrop {
  animation: backdrop-fade-in 0.7s ease-out forwards;
}

/* Animation keyframes */

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: scaleX(0);
  }

  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    transform: scaleX(1);
    /* display needed on the closing animation to keep the popover
    visible until the animation ends */
    display: block;
  }

  100% {
    opacity: 0;
    transform: scaleX(0);
    /* display: none not required here because it is the default value
    for a closed popover, but including it so the behavior is clear */
    display: none;
  }
}

@keyframes backdrop-fade-in {
  0% {
    background-color: transparent;
  }

  100% {
    background-color: rgb(0 0 0 / 25%);
  }
}
```

#### Result

The code renders as follows:

## See also

- Collection of Popover API examples
