---
title: "`:active-view-transition-type()` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_active-view-transition-type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:active-view-transition-type()` CSS pseudo-class

The functional **`:active-view-transition-type()`** CSS pseudo-class matches elements when a view transition with one or more specific types is in progress (is _active_) and stops matching once the view transition has completed.

```css
html:active-view-transition-type(forwards, backwards) {
  /* ... */
}
```

## Syntax

```css
:active-view-transition-type(<custom-ident>#) {
  /* ... */
}
```

### Parameters

- `<custom-ident>#`
    One or more comma-separated `<custom-ident>` values representing the choice of types that can be applied to the active view transition for this selector to match.

## Description

View transition types provide a mechanism by which different **types** can be specified for active view transitions. Types can be set on view transitions in multiple ways:

- For same-document (SPA) view transitions, specify types in the `types` option of the `startViewTransition()` method.
- For cross-document view transitions, specify types in the `types` descriptor of the `@view-transition` at-rule.
- You can also modify the active view transition's types on-the-fly via the `types` property of the corresponding `ViewTransition` object:
  - For same-document view transitions, this is the `ViewTransition` object returned by the `startViewTransition()` method.
  - For cross-document view transitions, the `ViewTransition` object is available in the `viewTransition` property of the `pageswap` event object in the case of the outgoing page, and the `viewTransition` property of the `pagereveal` event object in the case of the incoming page.
  - You can also access the active `ViewTransition` via the `Document.activeViewTransition` property. This provides a consistent way to access the active view transition in any context.

Once the active view transition has one or more types set on it, the `:active-view-transition-type()` pseudo-class can be applied to the document root element to set custom styles for each type. The pseudo-class takes a comma-separated list of types as its argument to specify the types that can be set on the active view transition for the selector to be matched.

For example, you might want to apply different transition animations to an `` element in an image gallery app as the displayed image changes, depending on whether you are moving forward or backward in the sequence, deleting an image, or adding an image into the sequence.

### OR versus AND behavior

It is important to note that the comma-separated list of types specified inside the `:active-view-transition-type()` pseudo-class provides OR behavior — if one or more of these types are set on the active view transition, the selector will match.

For example, in this case, the selector will match if the active view transition has a type of `forwards`, `backwards`, or both:

```css
html:active-view-transition-type(forwards, backwards) {
  /* ... */
}
```

If you want to specify AND behavior — that is, all the types must be set for the selector to match — you can do so by chaining multiple `:active-view-transition-type()` pseudo-classes together. In the following case, the selector will only match if the active view transition has types of `slide` _and_ `forwards`:

```css
html:active-view-transition-type(slide):active-view-transition-type(forwards) {
  /* ... */
}
```

## Examples

See also Using view transition types for multiple complete examples.

### Basic `:active-view-transition-type()` usage

This example includes a basic <example-value> that transitions between two different pieces of content via two different buttons, "Backwards" and "Forwards". We demonstrate how view transition types can be used to animate the transition differently depending on which button was pressed.

#### HTML

The markup includes a single `` element to contain the content and two `` elements to trigger the view transitions.

```html
<p>This is my first piece of content. I hope you like it!</p>
<div>
  <button id="backwards">Backwards</button>
  <button id="forwards">Forwards</button>
</div>
```

#### CSS

In our styles, we start off by creating a set of nested rules using the `:active-view-transition` pseudo-class. These styles will be applied whenever a view transition is active, regardless of the their types. We apply a `view-transition-name` of `none` to the `:root`, as we don't want any elements captured and animated on transition except for the `` element, which is given a `view-transition-name` of `slide`.

```css
html,
body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

div {
  display: flex;
  width: 60%;
  justify-content: space-between;
}

p {
  font-size: 1.7em;
  width: 60%;
  color: blue;
  margin-top: 0;
}
```

```css
html:active-view-transition {
  :root {
    view-transition-name: none;
  }
  p {
    view-transition-name: slide;
  }
}
```

Next, we use the `:active-view-transition-type()` pseudo-class to create two blocks of nested styles, the first of which is only applied when the active view transition has a type of `forwards`, and the second of which is only applied when the active view transition has a type of `backwards`. In each block, we use the `::view-transition-old()` and `::view-transition-new()` pseudo-elements to apply custom `animation-name` values to the `slide` capture group's outgoing and incoming views.

As a result:

- When the transition type is `forwards`, the old content view slides out to the left, and the new content view slides in from the right.
- When the transition type is `backwards`, the old content view slides out to the right, and the new content view slides in from the left.

```css
html:active-view-transition-type(forwards) {
  &::view-transition-old(slide) {
    animation-name: slide-out-to-left;
  }
  &::view-transition-new(slide) {
    animation-name: slide-in-from-right;
  }
}

html:active-view-transition-type(backwards) {
  &::view-transition-old(slide) {
    animation-name: slide-out-to-right;
  }
  &::view-transition-new(slide) {
    animation-name: slide-in-from-left;
  }
}
```

Finally, we use `@keyframes` animation blocks to define the animations referenced previously.

```css
@keyframes slide-in-from-left {
  from {
    translate: -100vw 0;
  }
}
@keyframes slide-in-from-right {
  from {
    translate: 100vw 0;
  }
}
@keyframes slide-out-to-left {
  to {
    translate: -100vw 0;
  }
}
@keyframes slide-out-to-right {
  to {
    translate: 100vw 0;
  }
}
```

#### JavaScript

In our script, we create references to both buttons and the content paragraph, and then store our two different pieces of content in two constants.

```js
const backBtn = document.getElementById("backwards");
const fwdBtn = document.getElementById("forwards");
const content = document.querySelector("p");

const first = "This is my first piece of content. I hope you like it!";
const second =
  "This is my second piece of content. Is it better than the first?";
```

Next, we add `click` event listeners to the backwards and forwards buttons; when they are clicked, the `changeContent()` function is run.

```js
backBtn.addEventListener("click", changeContent);
fwdBtn.addEventListener("click", changeContent);
```

Finally, we define the `changeContent()` function. We start by declaring a `type` value that will hold our view transition type value. If the event target is the "Backwards" button, we set `type` to `backwards`. If not, we set `type` to `forwards`. We then invoke the `startViewTransition()` method to update the content and start the transition:

- The `update` callback checks whether the paragraph `textContent` is equal to the `first` string. If so, we set it to the `second` string. If not, we set it to the `first` string.
- The `types` array is given one element: the `type` value we declared earlier.

```js
function changeContent(e) {
  const type = e.target === backBtn ? "backwards" : "forwards";
  document.startViewTransition({
    update() {
      content.textContent === first
        ? (content.textContent = second)
        : (content.textContent = first);
    },
    types: [type],
  });
}
```

#### Result

The example is rendered like so:

Try clicking the "Backwards" and "Forwards" buttons, and note how, even though the same code is used to trigger the content update and view transition in each case, a different animation is used for the transition. This is because a different transition type is set depending on which button is pressed.

## See also

- `Document.activeViewTransition`
- `:active-view-transition` pseudo-class
- View Transition API
- Using the View Transition API
- Using view transition types
