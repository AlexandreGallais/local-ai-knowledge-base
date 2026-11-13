---
title: "Using CSS animations (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/animations/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS animations (part 2 of 2)

## Examples

### Making text slide across the browser window

This basic <example-value> styles a `` element using the `translate` and `scale` transition properties so that the text slides in from off the right edge of the browser window.

```css
p {
  animation-duration: 3s;
  animation-name: slide-in;
}

@keyframes slide-in {
  from {
    translate: 150vw 0;
    scale: 200% 1;
  }

  to {
    translate: 0 0;
    scale: 100% 1;
  }
}
```

In this example, the style for the `` element specifies that the animation should take 3 seconds to execute from start to finish, using the `animation-duration` property and that the name of the `@keyframes` at-rule defining the keyframes for the animation sequence is `slide-in`.

In this case, we have just two keyframes. The first occurs at `0%` (using the alias `from`). Here, we configure the `translate` property of the element to be at `150vw` (that is, beyond the far right edge of the containing element), and the `scale` of the element to be 200% (or two times its default inline size), causing the paragraph to be twice as wide as its `<body>` containing block. This causes the first frame of the animation to have the header drawn off the right edge of the browser window.

The second keyframe occurs at `100%` (using the alias `to`). The `translate` property is set to `0%` and the `scale` of the element is set to `1`, which is `100%`. This causes the header to finish its animation in its default state, flush against the left edge of the content area.

```html
<p>
  The Caterpillar and Alice looked at each other for some time in silence: at
  last the Caterpillar took the hookah out of its mouth, and addressed her in a
  languid, sleepy voice.
</p>
```

> **Note:**
> Reload page to see the animation.

### Adding another keyframe animation

Let's add another keyframe to the previous example's animation. Let's say we want Alice's name to turn pink and grow and then shrink back to its original size and color as it moves from right to left. While we could change the `font-size`, changing any properties that impact the box model negatively impacts performance. Instead, we wrap her name in a `` and then scale and assign a color to that separately. That requires adding a second animation impacting only the ``:

```css
@keyframes grow-shrink {
  25%,
  75% {
    scale: 100%;
  }

  50% {
    scale: 200%;
    color: magenta;
  }
}
```

The full code now looks like this:

```css
p {
  animation-duration: 3s;
  animation-name: slide-in;
}
p span {
  display: inline-block;
  animation-duration: 3s;
  animation-name: grow-shrink;
}

@keyframes slide-in {
  from {
    translate: 150vw 0;
    scale: 200% 1;
  }

  to {
    translate: 0 0;
    scale: 100% 1;
  }
}

@keyframes grow-shrink {
  25%,
  75% {
    scale: 100%;
  }

  50% {
    scale: 200%;
    color: magenta;
  }
}
```

We've added a `` around "Alice":

```html
<p>
  The Caterpillar and <span>Alice</span> looked at each other for some time in
  silence: at last the Caterpillar took the hookah out of its mouth, and
  addressed her in a languid, sleepy voice.
</p>
```

This tells the browser the name should be normal for the first and last 25% of the animation, but turn pink while being scaled up and back again in the middle. We set the spans's `display` property to `inline-block` as the `transform` properties do not affect non-replaced inline-level content.

> **Note:**
> Reload page to see the animation.

### Repeating the animation

To make the animation repeat itself, use the `animation-iteration-count` property to indicate how many times to repeat the animation. In this case, let's use `infinite` to have the animation repeat indefinitely:

```css
p {
  animation-duration: 3s;
  animation-name: slide-in;
  animation-iteration-count: infinite;
}
```

```css
@keyframes slide-in {
  from {
    translate: 150vw 0;
    scale: 200% 1;
  }

  to {
    translate: 0 0;
    scale: 100% 1;
  }
}
```

```html
<p>
  The Caterpillar and Alice looked at each other for some time in silence: at
  last the Caterpillar took the hookah out of its mouth, and addressed her in a
  languid, sleepy voice.
</p>
```

### Making the animation move back and forth

That made it repeat, but it's very odd having it jump back to the start each time it begins animating. What we really want is for it to move back and forth across the screen. That's easily accomplished by setting `animation-direction` to `alternate`:

```css
p {
  animation-duration: 3s;
  animation-name: slide-in;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
```

```css
@keyframes slide-in {
  from {
    translate: 150vw 0;
    scale: 200% 1;
  }

  to {
    translate: 0 0;
    scale: 100% 1;
  }
}
```

```html
<p>
  The Caterpillar and Alice looked at each other for some time in silence: at
  last the Caterpillar took the hookah out of its mouth, and addressed her in a
  languid, sleepy voice.
</p>
```

### Using animation events

You can get additional control over animations — as well as useful information about them — by making use of animation events. These events, represented by the `AnimationEvent` object, can be used to detect when animations start, finish, and begin a new iteration. Each event includes the time at which it occurred as well as the name of the animation that triggered the event.

We'll modify the sliding text example to output some information about each animation event when it occurs, so we can get a look at how they work.

We've included the same keyframe animation as the previous example. This animation will last 3 seconds, be called "slide-in", repeat 3 times, and travel in an alternate direction each time. In the `@keyframes`, the scale and translation are manipulated along the x-axis to make the element slide across the screen.

```css
.slide-in {
  animation-duration: 3s;
  animation-name: slide-in;
  animation-iteration-count: 3;
  animation-direction: alternate;
}
```

```css
@keyframes slide-in {
  from {
    translate: 150vw 0;
    scale: 200% 1;
  }

  to {
    translate: 0 0;
    scale: 100% 1;
  }
}
```

#### Adding the animation event listeners

We'll use JavaScript code to listen for all three possible animation events. This code configures our event listeners; we call it when the document is first loaded in order to set things up.

```js
const element = document.getElementById("watch-me");
element.addEventListener("animationstart", listener);
element.addEventListener("animationend", listener);
element.addEventListener("animationiteration", listener);

element.className = "slide-in";
```

This is pretty standard code; you can get details on how it works in the documentation for `eventTarget.addEventListener()`. The last thing this code does is set the `class` on the element we'll be animating to "slide-in"; we do this to start the animation.

Why? Because the `animationstart` event fires as soon as the animation starts, and in our case, that happens before our code runs. So we'll start the animation ourselves by setting the class of the element to the style that gets animated after the fact.

#### Receiving the events

The events get delivered to the `listener()` function, which is shown below.

```js
function listener(event) {
  const l = document.createElement("li");
  switch (event.type) {
    case "animationstart":
      l.textContent = `Started: elapsed time is ${event.elapsedTime}`;
      break;
    case "animationend":
      l.textContent = `Ended: elapsed time is ${event.elapsedTime}`;
      break;
    case "animationiteration":
      l.textContent = `New loop started at time ${event.elapsedTime}`;
      break;
  }
  document.getElementById("output").appendChild(l);
}
```

This code, too, is very simple. It looks at the `event.type` to determine which kind of animation event occurred, then adds an appropriate note to the `` (unordered list) we're using to log these events.

The output, when all is said and done, looks something like this:

- Started: elapsed time is 0
- New loop started at time 3.01200008392334
- New loop started at time 6.00600004196167
- Ended: elapsed time is 9.234000205993652

Note that the times are very close to, but not exactly, those expected given the timing established when the animation was configured. Note also that after the final iteration of the animation, the `animationiteration` event isn't sent; instead, the `animationend` event is sent.

Just for the sake of completeness, here's the HTML that displays the page content, including the list into which the script inserts information about the received events:

```html
<h1 id="watch-me">Watch me move</h1>
<p>
  This example shows how to use CSS animations to make <code>H1</code>
  elements move across the page.
</p>
<p>
  In addition, we output some text each time an animation event fires, so you
  can see them in action.
</p>
<ul id="output"></ul>
```

And here's the live output.

> **Note:**
> Reload page to see the animation.

### Animating display and content-visibility

This example demonstrates how `display` and `content-visibility` can be animated. This behavior is useful for creating entry/exit animations where you want to for example remove a container from the DOM with `display: none`, but have it fade out smoothly with `opacity` rather than disappearing immediately.

Supporting browsers animate `display` and `content-visibility` with a variation on the discrete animation type. This generally means that properties will flip between two values 50% of the way through animating between the two.

There is an exception, however, which is when animating to/from `display: none` or `content-visibility: hidden` to a visible value. In this case, the browser will flip between the two values so that the animated content is shown for the entire animation duration.

So for example:

- When animating `display` from `none` to `block` (or another visible `display` value), the value will flip to `block` at `0%` of the animation duration so it is visible throughout.
- When animating `display` from `block` (or another visible `display` value) to `none`, the value will flip to `none` at `100%` of the animation duration so it is visible throughout.

#### HTML

The HTML contains two `` elements with a `` in between that we will animate from `display` `none` to `block`.

```html
<p>
  Click anywhere on the screen or press any key to toggle the
  <code>&lt;div&gt;</code> between hidden and showing.
</p>

<div>
  This is a <code>&lt;div&gt;</code> element that animates between
  <code>display: none; opacity: 0</code> and
  <code>display: block; opacity: 1</code>. Neat, huh?
</div>

<p>
  This is another paragraph to show that <code>display: none;</code> is being
  applied and removed on the above <code>&lt;div&gt; </code>. If only its
  <code>opacity</code> was being changed, it would always take up the space in
  the DOM.
</p>
```

#### CSS

```css
html {
  height: 100vh;
}

div {
  font-size: 1.6rem;
  padding: 20px;
  border: 3px solid red;
  border-radius: 20px;
  width: 480px;
  opacity: 0;
  display: none;
}

/* Animation classes */

div.fade-in {
  display: block;
  animation: fade-in 0.7s ease-in forwards;
}

div.fade-out {
  animation: fade-out 0.7s ease-out forwards;
}

/* Animation keyframes */

@keyframes fade-in {
  0% {
    opacity: 0;
    display: none;
  }

  100% {
    opacity: 1;
    display: block;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    display: block;
  }

  100% {
    opacity: 0;
    display: none;
  }
}
```

Note the inclusion of the `display` property in the keyframe animations.

#### JavaScript

Finally, we include a bit of JavaScript to set up event listeners to trigger the animations. Specifically, we add the `fade-in` class to the `` when we want it to appear, and `fade-out` when we want it to disappear.

```js
const divElem = document.querySelector("div");
const htmlElem = document.querySelector(":root");

htmlElem.addEventListener("click", showHide);
document.addEventListener("keydown", showHide);

function showHide() {
  if (divElem.classList[0] === "fade-in") {
    divElem.classList.remove("fade-in");
    divElem.classList.add("fade-out");
  } else {
    divElem.classList.remove("fade-out");
    divElem.classList.add("fade-in");
  }
}
```

#### Result

The code renders as follows:

## See also

- CSS animations module
- `AnimationEvent`
- Using CSS transitions
- Using the Web Animations API
