---
title: "Using element-scoped view transitions (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/view_transition_api/using_element-scoped/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using element-scoped view transitions (part 2 of 2)

## Nested element-scoped view transitions

One more aspect of element-scoped view transitions worth noting is that you can nest view transitions and have them running concurrently without interference. This is possible because, as mentioned earlier, the browser automatically assigns a `view-transition-scope` value of `all` to the scope root elements. This ensures that `view-transition-name` values scope to the element's subtree, and prevents elements and their contents from being captured by an outer, concurrent view transition. Browsers ignore elements that have `view-transition-scope: all` set during the snapshotting process.

Let's look at a demonstration of nested element-scoped view transitions.

The HTML is the same as for the first example, except there are now two lists of links inside an extra wrapper element.

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus.
  Set sit amet ipsum mauris.
</p>
<div class="wrapper">
  <ul class="one">
    <li><a href="#">Standard</a></li>
    <li><a href="#">Standard</a></li>
    <li><a href="#">Standard</a></li>
    <li><a href="#">Standard</a></li>
  </ul>

  <ul class="two">
    <li><a href="#">Standard</a></li>
    <li><a href="#">Standard</a></li>
    <li><a href="#">Standard</a></li>
    <li><a href="#">Standard</a></li>
  </ul>
</div>
<p>
  Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec et
  mollis dolor.
</p>
```

### CSS

The two lists are arranged side-by-side within the `.wrapper` element using flexbox. We give the wrapper a `view-transition-name` of `wrapper`, and then we give each list a different background color:

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
  border: 2px solid #999999;
  margin: 0 auto;
  position: relative;
  flex: 1;
}

a {
  text-decoration: none;
  color: black;
  display: block;
  padding: 10px;
  text-align: center;
  background: white;
  margin: 10px;
  border: 2px solid #aaaaaa;
  transition: border 0.6s;
}

a:hover,
a:focus {
  border-color: black;
  outline: none;
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

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
```

```css
.wrapper {
  display: flex;
  gap: 20px;
  view-transition-name: wrapper;
}

.one {
  background-color: orange;
}

.two {
  background-color: green;
}
```

We also apply different animations to the general old and new transition pseudo-elements, and then separate animations to the `wrapper` old and new transition pseudo-elements:

```css
::view-transition-old(*) {
  animation: rotate-out 0.3s 1 both linear;
}

::view-transition-new(*) {
  animation: rotate-in 0.3s 0.3s 1 both linear;
}

::view-transition-old(wrapper) {
  animation: fade-out 0.3s 1 both linear;
}

::view-transition-new(wrapper) {
  animation: fade-in 0.3s 0.3s 1 both linear;
}
```

We have hidden the rest of the CSS for brevity.

### JavaScript

The JavaScript is similar to the first example, except that here two element-scoped view transitions run concurrently each time a link is clicked. The first one toggles the text of the link between "Standard" and "Alternative" (via the `toggleText()` function), and the second one swaps the position of the two lists inside the DOM (via the `togglePosition()` function). As before, we've included feature detection code, so the example still works in browsers that don't support `Element.startViewTransition()`.

```js
const lists = document.querySelectorAll("ul");
const wrapper = document.querySelector(".wrapper");

lists.forEach((list) => {
  list.addEventListener("click", handleClick);
});

function handleClick(e) {
  function toggleText() {
    if (e.target.textContent === "Standard") {
      e.target.textContent = "Alternative";
    } else {
      e.target.textContent = "Standard";
    }
  }
  function togglePosition() {
    if (lists[0].nextElementSibling === lists[1]) {
      wrapper.insertBefore(lists[1], lists[0]);
    } else {
      wrapper.insertBefore(lists[0], lists[1]);
    }
  }
  if (e.target.tagName === "A") {
    if (!e.target.startViewTransition) {
      toggleText();
      togglePosition();
      return;
    }

    e.target.startViewTransition(() => {
      toggleText();
    });
    wrapper.startViewTransition(() => {
      togglePosition();
    });
  }
}
```

### Result

Click the text inside any box. Note how the text toggle and the list swap happen simultaneously - both nested transitions run at the same time without interfering with one another.

## Querying active view transitions

The following properties enable you to query active element-scoped view transitions:

- `ViewTransition.transitionRoot`: Returns a reference to the root element of the view transition's scope.
- `Element.activeViewTransition`: Returns a reference to an element's active `ViewTransition`, if one exists.

For example, if you want to process the animations active on an element in some way during a transition, you can access them using `transitionRoot`:

```js
function processAnimations(transition) {
  const anims = transition.transitionRoot.getAnimations();
  // ...
}

// ...

const transition = el.startViewTransition();
transition.ready.then(() => processAnimations(transition));
```

## See also

- View Transition API
- Run concurrent and nested view transitions with element-scoped view transitions on developer.chrome.com
