---
title: "Using element-scoped view transitions (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/view_transition_api/using_element-scoped/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using element-scoped view transitions

Element-scoped view transitions are scoped to a particular element's DOM subtree. They have many advantages over document-scoped view transitions: you can run transitions on subsections of the document while keeping the rest of it interactive, run multiple transitions simultaneously — including nested transitions — and solve several other issues.

This article covers how element-scoped view transitions work and how to use them.

> **Note:**
> "Document-scoped view transitions" refer to same-document view transitions, that is, transitions initiated via the `Document.startViewTransition()` method.
>
> Element-scoped view transitions are initiated via the same method, called on an individual element (see `Element.startViewTransition()`). Element-scoped view transitions are not available for cross-document transitions.

## Problems with document-scoped view transitions

Document-scoped view transitions are useful for animating DOM content updates across a whole document. You can apply different animations to different parts of the page, a single transition animation to the whole page, or no animations at all.

You can also use different view transition types to apply different animations to the same element depending on the circumstance - for example, whether it is the next or previous element in a sequence.

However, document-scoped view transitions have several shortcomings:

- You can't run more than one view transition at a time.
- When a view transition is running, the page ceases to be interactive until the transition is finished.
- The pseudo-element tree associated with a document-scoped view transition sits over the top of everything else on the page. If another element is positioned above the updating part of the page when the transition animation starts (for example, using `z-index`), the positioned element will disappear underneath the transition for the animation's duration, which is probably not the effect you want.
- Related to the previous issue, if the updating part of the page is clipped by an ancestor wrapper using `overflow`, it will spill out of the container when the animation starts.

Element-scoped view transitions can solve these problems. Let's look at some examples to see how.

## Basic <example-value> example

This example features a list of links. When a link is clicked, its content changes, and that change is animated via an element-scoped view transition. The example also contains an element that slightly overlaps the transitioning element; we're using this to show how `z-index` problems can be avoided.

### HTML

The markup includes a `` list of links between two `` elements containing text content.

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus.
  Set sit amet ipsum mauris.
</p>

<ul>
  <li><a href="#">Standard</a></li>
  <li><a href="#">Standard</a></li>
  <li><a href="#">Standard</a></li>
  <li><a href="#">Standard</a></li>
</ul>

<p>
  Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec et
  mollis dolor.
</p>
```

### CSS

We start by giving the `` some background and `border` styling. We also give it a `position` of `relative`, so we can absolutely position descendants relative to the ``.

```css
body {
  font: 1.2em / 1.5 sans-serif;
  width: 50%;
  max-width: 700px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

a {
  text-decoration: none;
  color: black;
  display: block;
  padding: 10px;
  text-align: center;
  background: white;
  margin: 10px;
  outline: none;
}
```

```css
ul {
  border: 2px solid #999999;
  background: #cccccc;
  position: relative;
}
```

Next, we give the `` elements their own `border` styles and apply a `transition` so that `border` style updates on state changes are smoothly animated. On `:hover` and `:focus`, we change the link `border-color` to `black`.

```css
a {
  border: 2px solid #aaaaaa;
  transition: border 0.6s;
}

a:hover,
a:focus {
  border-color: black;
}
```

The most relevant CSS for view transitions defines custom `animation` settings for the old and new transition states, which rotate the old DOM state out and the new DOM state in. Note that we've applied an `animation-delay` value to the `rotate-in` animation (the second `0.3s` value) to ensure that it starts only when the `rotate-out` animation ends.

```css
::view-transition-old(*) {
  animation: rotate-out 0.3s 1 both linear;
}

::view-transition-new(*) {
  animation: rotate-in 0.3s 0.3s 1 both linear;
}

@keyframes rotate-out {
  from {
    rotate: 0deg x;
  }

  to {
    rotate: 90deg x;
  }
}

@keyframes rotate-in {
  from {
    rotate: -90deg x;
  }

  to {
    rotate: 0deg x;
  }
}
```

Finally, we create some generated content on the `` element using the `::before` pseudo-element and positioning it over the `` element. The generated content contains a transparent gradient effect.

```css
ul::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -5px;
  width: 100px;
  background-image: linear-gradient(
    to right,
    white,
    white 25%,
    rgb(255 255 255 / 0)
  );
  z-index: 1;
}
```

### JavaScript

In the script, we grab a reference to the `` element and add a `click` event listener to it. When it is clicked, we check that the event target is an `` element. If it is, we invoke `startViewTransition()` on the clicked `` element, toggling its content between "Standard" and "Alternative" via the `toggleText()` function.

Note that we've also included feature detection to ensure the code works in browsers that don't support `startViewTransition()`: before running `startViewTransition()`, we check that it exists on the target element. If not, we just run the `toggleText()` function and `return`, so the DOM still updates, but without the transition animation.

```js
const list = document.querySelector("ul");

list.addEventListener("click", handleClick);

function handleClick(e) {
  function toggleText() {
    if (e.target.textContent === "Standard") {
      e.target.textContent = "Alternative";
    } else {
      e.target.textContent = "Standard";
    }
  }
  if (e.target.tagName === "A") {
    if (!e.target.startViewTransition) {
      toggleText();
      return;
    }
    e.target.startViewTransition(() => {
      toggleText();
    });
  }
}
```

### Result

Click/activate the links to see the view transition on each one.

Each `` element has its own view transition, scoped just to that element. The rest of the page stays interactive while a view transition is ongoing, so you can run multiple view transitions at the same time. In addition, the transitioning elements stay below the overlapping generated content positioned above them.

## Differences between element- and document-scoped transitions

The previous example demonstrates how element-scoped view transitions fix some of the issues of their document-scoped counterparts. This is largely thanks to the difference in pseudo-element tree placement. Instead of being added inside the `:root` element, the browser adds element-scoped view transition trees inside the element on which `Element.startViewTransition()` is called.

In the previous example, one of the pseudo-element trees would look like this:

```plain
<a href="#">
  ├─ ::view-transition
  │  └─ ::view-transition-group(root)
  │     └─ ::view-transition-image-pair(root)
  │        ├─ ::view-transition-old(root)
  │        └─ ::view-transition-new(root)
  |
  |
  "Alternative"
</a>
```

This means that the transition is scoped to the `` element (referred to as the "transition root" or "scope") and its DOM content, so it doesn't interfere with other elements or ongoing view transitions. When the view transition starts, the browser looks for elements to snapshot only inside that scope. During the snapshotting process — up until the `ViewTransition.updateCallbackDone` promise fulfills — rendering is paused only inside the scope.

The `::view-transition` pseudo-element has the same size and shape as the transition root element, and renders only on top of it, not the rest of the page. Because of this, the layering order of elements outside of the transition root is respected.

## Self-participating scopes and clipping

Another key <example-value> of element-scoped view transitions is that, when the transitioned element is clipped by its container (via `overflow: scroll`, for example), the element remains clipped during the transition animation.

This happens because the following are automatically set on the scope root element:

- A `view-transition-name` value of `root`, which ensures that the root element participates in its own transition (referred to as self-participation).
- A `view-transition-group` value of `contain`, which enables nested view transition groups for the scope. An `overflow` value of `clip` is then set on the resulting `::view-transition-group()` pseudo-element, which causes the pseudo-element tree's contents to be clipped to the scope.
- A `view-transition-scope` value of `all`, which ensures that `view-transition-name` values scope to the element's subtree (see Nested element-scoped view transitions for more details).

> **Note:**
> You can opt a view transition out of self-participation by setting `view-transition-name: none` on the transition root element. However, this can result in undesirable behavior, such as the transition spilling out of the root in clipping cases. If you choose to do this, test carefully and make sure the scope does not clip its contents.

Let's look at another example, this time to demonstrate the clipping behavior.

### HTML

The HTML is similar to the previous example, except that the central element is now a `` containing a paragraph of text. We also include a `` that can be pressed to change the paragraph content.

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus.
  Set sit amet ipsum mauris.
</p>

<section>
  <p>
    Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec
    et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae
    augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec
    ut librero sed accu vehicula ultricies a non tortor. Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Aenean ut gravida lorem. Ut turpis
    felis, pulvinar a semper sed, adipiscing id dolor.
  </p>
</section>
<button>Change!</button>

<p>
  Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec et
  mollis dolor.
</p>
```

### CSS

To begin with, we set a fixed `height` and `overflow-y: scroll` on the `` to cause the `` content to scroll vertically.

```css
body {
  font: 1.2em / 1.5 sans-serif;
  width: 50%;
  max-width: 700px;
  margin: 0 auto;
}

section {
  border: 2px solid #999999;
  background: #dddddd;
  margin: 0 auto;
}

section p {
  margin: 1rem 5rem;
}

@keyframes rotate-out {
  from {
    rotate: 0deg y;
  }

  to {
    rotate: 90deg y;
  }
}

@keyframes rotate-in {
  from {
    rotate: -90deg y;
  }

  to {
    rotate: 0deg y;
  }
}
```

```css
section {
  height: 150px;
  overflow-y: scroll;
}
```

Next, we set a `view-transition-name` on the nested `` element, with matching names in the custom `::view-transition-old()` and `::view-transition-new()` pseudo-elements. This means that only `` will animate, not the rest of the transition scope.

```css
section p {
  view-transition-name: content;
}

::view-transition-old(content) {
  animation: rotate-out 0.3s 1 both linear;
}

::view-transition-new(content) {
  animation: rotate-in 0.3s 0.3s 1 both linear;
}
```

For brevity, the `@keyframes` definition code is hidden. It is nearly identical to the previous example; the only difference is that the rotation in this example occurs around the y-axis rather than the x-axis.

### JavaScript

The script defines a `content` array containing two different strings to swap the `` content between. We then grab references to the ``, ``, and `` elements.

```js
const content = [
  "Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut librero sed accu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.",
  "Nam vulputate diam nec tempor bibendum. Donec luctus augue eget malesuada ultrices. Phasellus turpis est, posuere sit amet dapibus ut, facilisis sed est. Nam id risus quis ante semper consectetur eget aliquam lorem. Vivamus tristique elit dolor, sed pretium metus suscipit vel. Mauris ultricies lectus sed lobortis finibus. Vivamus eu urna eget velit cursus viverra quis vestibulum sem. Aliquam tincidunt eget purus in interdum.",
];

const section = document.querySelector("section");
const para = document.querySelector("section p");
const btn = document.querySelector("button");
```

```js
const content = ["Maecenas congue ligula ...", "Nam vulputate diam ..."];

const section = document.querySelector("section");
const para = document.querySelector("section p");
const btn = document.querySelector("button");
```

Next, we add a `click` event listener to the ``. Each time the button is clicked, a view transition is triggered: inside the `startViewTransition()` call, the `` element's `textContent` is toggled between the two `content` array elements via the `toggleText()` function. We've also included simple feature detection that falls back to running `toggleText()` directly in browsers that don't support `Element.startViewTransition()`.

```js
btn.addEventListener("click", handleClick);

function toggleText() {
  if (para.className === "1") {
    para.className = "0";
  } else {
    para.className = "1";
  }
  para.textContent = content[Number(para.className)];
}

function handleClick() {
  if (!section.startViewTransition) {
    toggleText();
    return;
  }
  const vt = section.startViewTransition(() => {
    toggleText();
  });
}
```

### Result

Click the button, and note how the transition doesn't spill outside the `` — it remains clipped to the transition scope.
