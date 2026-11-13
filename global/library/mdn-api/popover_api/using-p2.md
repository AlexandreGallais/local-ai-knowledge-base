---
title: "Using the Popover API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/popover_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Popover API (part 2 of 3)

## Using "hint" popover state

There is a third type of popover you can create — **hint popovers**, designated by setting `popover="hint"` on your popover element.
They can be light dismissed and will respond to close requests.

`hint` popovers do not close `auto` popovers when they are displayed, but will close other `hint` popovers that are not its ancestors in the hint stack.
The reverse is also true: closing an `auto` popover by pressing `Esc` or light-dismiss does not affect `hint` popovers unless they are descendants of the closed auto popover.

This is useful for situations where, for example, you have toolbar buttons that can be pressed to show UI popovers, but you also want to reveal tooltips when the buttons are hovered without closing the UI popovers.

`hint` popovers tend to be shown and hidden in response to non-click JavaScript events such as `mouseover`/`mouseout` and `focus`/`blur`.
Note that you might also click a button to open a `hint` popover, but the click will light-dismiss any `auto` popovers that the button is outside of (which is not likely to be your intent).

See our popover hint demo (source) for an example that behaves exactly as described above. The demo features a button bar; when pressed, the buttons show `auto` popup sub-menus inside which further options can be selected. However, when hovered over or focused, the buttons also show tooltips (`hint` popovers) to give the user an idea of what each button does, which do not hide a currently-showing sub-menu.

In the below sections, we'll walk through all the important parts of the code.

> **Note:**
> You _can_ use `hint` popovers alongside `manual` popovers, although there is not really much of a reason to. They are designed to circumvent some of the limitations of `auto` popovers, enabling use cases like the one detailed in this section.
>
> Note also that `popover="hint"` falls back to `popover="manual"` in unsupporting browsers.

> **Note:**
> There is a related feature — **interest invokers** — that can be used to create hover/focus popover functionality conveniently and consistently, without requiring JavaScript. Check out Using interest invokers to learn more.

### Creating the tooltips with `popover="hint"`

The sub-menu popovers work fine as they are, opening when the toolbar buttons are pressed, but how do we also show tooltips on button hover/focus? First, we create the tooltips in HTML, using `hint` popovers:

```html
<div id="tooltip-1" class="tooltip" popover="hint">Tooltip A</div>
<div id="tooltip-2" class="tooltip" popover="hint">Tooltip B</div>
<div id="tooltip-3" class="tooltip" popover="hint">Tooltip C</div>
```

> **Note:**
> In the demo source code, the tooltips are nested inside the popover control buttons. This is because it provides a better fallback in browsers that don't support CSS anchor positioning — the `hint` popovers appear next to their associated control buttons rather than somewhere else entirely.

To control the showing/hiding, we need to use JavaScript. First of all, we grab references to the `hint` popovers and the control buttons in two separate `NodeList`s using `Document.querySelectorAll()`:

```js
const tooltips = document.querySelectorAll(".tooltip");
const btns = document.querySelectorAll("#button-bar button");
```

Next, we create a function, `addEventListeners()`, which sets four event listeners (via `EventTarget.addEventListener()`) on a given ``, chosen by grabbing the `` at a specific index value of the `btns` `NodeList`. The functions act on the `hint` popover at the same index value of the `tooltips` `NodeList`, allowing us to keep the buttons and the tooltips in sync — showing/hiding the correct tooltip when a button is interacted with.

The event listeners show the popover on `mouseover` and `focus`, and hide the popover on `mouseout` and `blur`, meaning that the tooltips can be accessed via mouse and keyboard.

```js
function addEventListeners(i) {
  btns[i].addEventListener("mouseover", () => {
    tooltips[i].showPopover({ source: btns[i] });
  });

  btns[i].addEventListener("mouseout", () => {
    tooltips[i].hidePopover();
  });

  btns[i].addEventListener("focus", () => {
    tooltips[i].showPopover({ source: btns[i] });
  });

  btns[i].addEventListener("blur", () => {
    tooltips[i].hidePopover();
  });
}
```

Finally, we use a `for` loop to iterate through the `` elements in the `btns` `NodeList`, calling our `addEventListeners()` function for each one so that all of them have the desired event listeners set.

```js
for (let i = 0; i < btns.length; i++) {
  addEventListeners(i);
}
```

## Popover open/close interaction rules

The browser maintains two independent stacks of open popovers: an **auto stack** for `auto` popovers, and a **hint stack** for `hint` popovers.
When a popover is shown it is pushed onto the appropriate stack; when it is hidden, the browser walks back down that stack, closing any descendant popovers on that stack first.
Because the two stacks are separate, operations on one do not automatically affect the other.

A few specific rules for how popovers interact that derive from this specification are:

- Showing a `hint` popover does not close `auto` popovers.
- Showing a `hint` popover closes other `hint` popovers, except those that are its ancestors in the hint stack.
- Clicking outside a popover light-dismisses all open `auto` and `hint` popovers that are not its ancestor.
- Hiding an `auto` popover does not close `hint` popovers that are not its descendants.
- Showing an `auto` popover as a child of a `hint` popover downgrades the `auto` popover to `hint`.
- Showing a popover while another is in the process of being shown or hidden is not permitted.

Note that `manual` popovers do not participate in either stack — they are shown and hidden independently and do not affect auto or hint popovers.

## Styling popovers

This section covers some CSS selection and positioning techniques relevant to popovers.

### Selecting popovers

You can select all popovers with a simple attribute selector:

```css
[popover] {
  /* Declarations here */
}
```

Alternatively, you can select a specific popover type by including a value in the attribute selector:

```css
[popover="auto"] {
  /* Declarations here */
}
```

You can select only popovers that are showing using the `:popover-open` pseudo-class:

```css
:popover-open {
  /* Declarations here */
}
```

### Styling the popover backdrop

The `::backdrop` pseudo-element is a full-screen element placed directly behind showing popover elements in the top layer, allowing effects to be added to the page content behind the popover(s) if desired. You might for example want to blur out the content behind the popover to help focus the user's attention on it:

```css
::backdrop {
  backdrop-filter: blur(3px);
}
```

See our Popover blur background example (source) for an idea of how this renders.

### Positioning popovers

When looking at the first couple of examples linked at the start of the article, you may have noticed that the popovers appear in the middle of the viewport, wrap their content, and have a black border. This is the default styling, achieved using the following rule in the UA stylesheet:

```css
[popover] {
  position: fixed;
  inset: 0;
  width: fit-content;
  height: fit-content;
  margin: auto;
  border: solid;
  padding: 0.25em;
  overflow: auto;
  color: CanvasText;
  background-color: Canvas;
}
```

To apply custom sizing and position the popover somewhere else, you could override the above styles with something like this:

```css
:popover-open {
  width: 200px;
  height: 100px;
  position: absolute;
  inset: unset;
  bottom: 5px;
  right: 5px;
  margin: 0;
}
```

You can see an isolated example of this in our Popover positioning example (source).

### Popover anchor positioning

There is another useful positioning option that the Popover API provides. If you want to position a popover relative to its invoker rather than the viewport or a positioned ancestor, you can take advantage of the fact that popovers and their invokers have an **implicit anchor reference**.

Associating any kind of popover with its invoker creates an implicit anchor reference between the two. This causes the invoker to become the popover's **anchor element**, meaning that you can position the popover relative to it using CSS anchor positioning.

Because the association between the popover and the invoker is implicit, you do not need to name the anchor using `anchor-name`. The implicit anchor is adopted automatically when you position the popover with `position-area`. However, if you position it using `anchor()` or `anchor-center`, `position-anchor: auto` is required to opt in. The initial value of `position-anchor` is `normal`, which behaves as `none` while `position-area` is `none`.

For example, you could use a combination of an `anchor()` function value set on an inset property, and an `anchor-center` value set on an alignment property:

```css
.my-popover {
  margin: 0;
  position-anchor: auto;
  top: calc(anchor(bottom) + 10px);
  justify-self: anchor-center;
}
```

Or you could use a `position-area` property:

```css
.my-popover {
  position-area: top;
}
```

When using `anchor()` and `anchor-center` to position popovers, be aware that the default styles for popovers may conflict with the position you're trying to achieve. The usual culprit is the default style for `margin` (`auto`); it's advisable to set the popover's `margin` to `0`, or a positive `<length>` if you want to create some space between the positioned element and the anchor, so that your positioning works as expected. You can see an example in the first code snippet in this section.

This is not an issue with popovers positioned with `position-area` because the used value of `auto` margin (and inset) properties resolves to `0` on any element that has a `position-area` value set other than `none`.

See Using CSS anchor positioning for more details on associating anchor and positioned elements, and positioning elements relative to their anchor.

> **Note:**
> For an example that uses this implicit association, see our popover hint demo (source). If you check out the CSS code, you'll see implicit association examples using both `position-area` and `anchor()`/`anchor-center`.

> **Note:**
> If you want to remove the implicit anchor reference to stop the popover from being anchored to its invoker, you can do so by setting the `position-anchor` property of the popover to `none`, or to an anchor name that doesn't exist in the current document, such as `--not-an-anchor-name`. See also removing an anchor association.
