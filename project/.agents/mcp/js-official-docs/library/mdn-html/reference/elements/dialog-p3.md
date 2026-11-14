---
title: "`<dialog>` HTML dialog element (part 3 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/dialog/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dialog>` HTML dialog element (part 3 of 3)

### Animating dialogs

`<dialog>`s are set to `display: none;` when hidden and `display: block;` when shown, as well as being removed from / added to the top layer and the accessibility tree. Therefore, for `<dialog>` elements to be animated the `display` property needs to be animatable. Supporting browsers animate `display` with a variation on the discrete animation type. Specifically, the browser will flip between `none` and another value of `display` so that the animated content is shown for the entire animation duration.

So for example:

- When animating `display` from `none` to `block` (or another visible `display` value), the value will flip to `block` at `0%` of the animation duration so it is visible throughout.
- When animating `display` from `block` (or another visible `display` value) to `none`, the value will flip to `none` at `100%` of the animation duration so it is visible throughout.

> **Note:**
> When animating using CSS transitions, `transition-behavior: allow-discrete` needs to be set to enable the above behavior. This behavior is available by default when animating with CSS animations; an equivalent step is not required.

#### Transitioning dialog elements

When animating `<dialog>`s with CSS transitions, the following features are required:

- `@starting-style` at-rule
    Provides a set of starting values for properties set on the `<dialog>` that you want to transition from every time it is opened. This is needed to avoid unexpected behavior. By default, CSS transitions only occur when a property changes from one value to another on a visible element; they are not triggered on elements' first style updates, or when the `display` type changes from `none` to another type.
- `display` property
    Add `display` to the transitions list so that the `<dialog>` will remain as `display: block` (or another visible `display` value set on the dialog's open state) for the duration of the transition, ensuring the other transitions are visible.
- `overlay` property
    Include `overlay` in the transitions list to ensure the removal of the `<dialog>` from the top layer is deferred until the transition completes, again ensuring the transition is visible.
- `transition-behavior` property
    Set `transition-behavior: allow-discrete` on the `display` and `overlay` transitions (or on the `transition` shorthand) to enable discrete transitions on these two properties that are not by default animatable.

Here is a quick example to show what this might look like.

##### HTML

The HTML contains a `<dialog>` element, plus a button to show the dialog. Additionally, the `<dialog>` element contains another button to close itself.

```html
<dialog id="dialog">
  Content here
  <button class="close">close</button>
</dialog>

<button class="show">Show Modal</button>
```

##### CSS

In the CSS, we include a `@starting-style` block that defines the transition starting styles for the `opacity` and `transform` properties, transition end styles on the `dialog:open` state, and default styles on the default `dialog` state to transition back to once the `<dialog>` has appeared. Note how the `<dialog>`'s `transition` list includes not only these properties, but also the `display` and `overlay` properties, each with `allow-discrete` set on them.

We also set a starting style value for the `background-color` property on the `::backdrop` that appears behind the `<dialog>` when it opens, to provide a nice darkening animation. The `dialog:open::backdrop` selector selects only the backdrops of `<dialog>` elements when the dialog is open.

```css
/* Open state of the dialog  */
dialog:open {
  opacity: 1;
  transform: scaleY(1);
}

/* Closed state of the dialog   */
dialog {
  opacity: 0;
  transform: scaleY(0);
  transition:
    opacity 0.7s ease-out,
    transform 0.7s ease-out,
    overlay 0.7s ease-out allow-discrete,
    display 0.7s ease-out allow-discrete;
  /* Equivalent to
  transition: all 0.7s allow-discrete; */
}

/* Before open state  */
/* Needs to be after the previous dialog:open rule to take effect,
    as the specificity is the same */
@starting-style {
  dialog:open {
    opacity: 0;
    transform: scaleY(0);
  }
}

/* Transition the :backdrop when the dialog modal is promoted to the top layer */
dialog::backdrop {
  background-color: transparent;
  transition:
    display 0.7s allow-discrete,
    overlay 0.7s allow-discrete,
    background-color 0.7s;
  /* Equivalent to
  transition: all 0.7s allow-discrete; */
}

dialog:open::backdrop {
  background-color: rgb(0 0 0 / 25%);
}

/* This starting-style rule cannot be nested inside the above selector
because the nesting selector cannot represent pseudo-elements. */

@starting-style {
  dialog:open::backdrop {
    background-color: transparent;
  }
}
```

> **Note:**
> In browsers that don't support the `:open` pseudo-class, you can use the attribute selector `dialog[open]` to style the `<dialog>` element when it is in the open state.

##### JavaScript

The JavaScript adds event handlers to the show and close buttons causing them to show and close the `<dialog>` when they are clicked:

```js
const dialogElem = document.getElementById("dialog");
const showBtn = document.querySelector(".show");
const closeBtn = document.querySelector(".close");

showBtn.addEventListener("click", () => {
  dialogElem.showModal();
});

closeBtn.addEventListener("click", () => {
  dialogElem.close();
});
```

##### Result

The code renders as follows:

> **Note:**
> Because `<dialog>`s change from `display: none` to `display: block` each time they are shown, the `<dialog>` transitions from its `@starting-style` styles to its `dialog:open` styles every time the entry transition occurs. When the `<dialog>` closes, it transitions from its `dialog:open` state to the default `dialog` state.
>
> It is possible for the style transition on entry and exit to be different in such cases. See our Demonstration of when starting styles are used example for a proof of this.

#### dialog keyframe animations

When animating a `<dialog>` with CSS keyframe animations, there are some differences to note from transitions:

- You don't provide a `@starting-style`.
- You include the `display` value in a keyframe; this will be the `display` value for the entirety of the animation, or until another non-`none` display value is encountered.
- You don't need to explicitly enable discrete animations; there is no equivalent to `allow-discrete` inside keyframes.
- You don't need to set `overlay` inside keyframes either; the `display` animation handles the animation of the `<dialog>` from shown to hidden.

Let's have a look at an example so you can see what this looks like.

##### HTML

First, the HTML contains a `<dialog>` element, plus a button to show the dialog. Additionally, the `<dialog>` element contains another button to close itself.

```html
<dialog id="dialog">
  Content here
  <button class="close">close</button>
</dialog>

<button class="show">Show Modal</button>
```

##### CSS

The CSS defines keyframes to animate between the closed and shown states of the `<dialog>`, plus the fade-in animation for the `<dialog>`'s backdrop. The `<dialog>` animations include animating `display` to make sure the actual visible animation effects remain visible for the whole duration. Note that it wasn't possible to animate the backdrop fade out — the backdrop is immediately removed from the DOM when the `<dialog>` is closed, so there is nothing to animate.

```css
dialog {
  animation: fade-out 0.7s ease-out;
}

dialog:open {
  animation: fade-in 0.7s ease-out;
}

dialog:open::backdrop {
  background-color: black;
  animation: backdrop-fade-in 0.7s ease-out forwards;
}

/* Animation keyframes */

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: scaleY(0);
    display: none;
  }

  100% {
    opacity: 1;
    transform: scaleY(1);
    display: block;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    transform: scaleY(1);
    display: block;
  }

  100% {
    opacity: 0;
    transform: scaleY(0);
    display: none;
  }
}

@keyframes backdrop-fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.25;
  }
}

body,
button {
  font-family: system-ui;
}
```

##### JavaScript

Finally, the JavaScript adds event handlers to the buttons to enable showing and closing the `<dialog>`:

```js
const dialogElem = document.getElementById("dialog");
const showBtn = document.querySelector(".show");
const closeBtn = document.querySelector(".close");

showBtn.addEventListener("click", () => {
  dialogElem.showModal();
});

closeBtn.addEventListener("click", () => {
  dialogElem.close();
});
```

##### Result

The code renders as follows:

## Technical summary

       |
        Content categories

       |
        Flow content,
        sectioning root

       | Permitted content
       |
        Flow content

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content

       | Implicit ARIA role
       |
        dialog

       | Permitted ARIA roles
       | `alertdialog`

       | DOM interface
       | `HTMLDialogElement`

## See also

- `HTMLDialogElement` interface
- `close` event of the `HTMLDialogElement` interface
- `cancel` event of the `HTMLDialogElement` interface
- `open` property of the `HTMLDialogElement` interface
- `inert` global attribute for HTML elements
- `::backdrop` CSS pseudo-element
- Web forms in the Learn area
