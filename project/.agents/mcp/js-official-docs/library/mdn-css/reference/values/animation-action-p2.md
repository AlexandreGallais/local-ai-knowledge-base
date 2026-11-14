---
title: "<animation-action> (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/animation-action/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <animation-action> (part 2 of 2)

## Examples

### Basic usage

This example shows how to create a basic <example-value> animation that plays forwards on trigger activation and backward on trigger deactivation.

#### HTML

Our markup contains two `` elements, one to animate and one to create a trigger, plus some basic text content to scroll the page. We have hidden the text content for brevity.

```html
<div class="animated">I am animated</div>

...

<div class="trigger">I create the trigger</div>

...
```

```html
<div class="animated">I am animated</div>

<p>
  Fusce dictum ex quis ipsum consectetur placerat. Cras sed lectus ex. Quisque
  purus dolor, vulputate ac mi eget, commodo varius odio. Suspendisse faucibus
  ipsum vel libero finibus, in placerat nibh congue. Sed iaculis, metus et
  euismod posuere, mi diam vestibulum felis, ac vulputate eros ipsum id justo.
  Etiam a tincidunt purus. Maecenas semper sed enim at blandit. Aenean ut
  sagittis lorem, eget gravida purus. Phasellus eleifend, lectus nec pulvinar
  facilisis, dui dolor feugiat odio, iaculis tempor felis est non tortor. In
  suscipit lorem efficitur molestie tempus. Integer sit amet neque et risus
  iaculis sodales sed eget diam. Quisque sodales nunc sapien, vitae lacinia ex
  luctus quis. Maecenas scelerisque scelerisque elit eu consequat. Etiam ac
  tristique tellus, sed tincidunt velit.
</p>

<p>
  Fusce dictum ex quis ipsum consectetur placerat. Cras sed lectus ex. Quisque
  purus dolor, vulputate ac mi eget, commodo varius odio. Suspendisse faucibus
  ipsum vel libero finibus, in placerat nibh congue. Sed iaculis, metus et
  euismod posuere, mi diam vestibulum felis, ac vulputate eros ipsum id justo.
  Etiam a tincidunt purus. Maecenas semper sed enim at blandit. Aenean ut
  sagittis lorem, eget gravida purus. Phasellus eleifend, lectus nec pulvinar
  facilisis, dui dolor feugiat odio, iaculis tempor felis est non tortor. In
  suscipit lorem efficitur molestie tempus. Integer sit amet neque et risus
  iaculis sodales sed eget diam. Quisque sodales nunc sapien, vitae lacinia ex
  luctus quis. Maecenas scelerisque scelerisque elit eu consequat. Etiam ac
  tristique tellus, sed tincidunt velit.
</p>

<div class="trigger">I create the trigger</div>

<p>
  Fusce dictum ex quis ipsum consectetur placerat. Cras sed lectus ex. Quisque
  purus dolor, vulputate ac mi eget, commodo varius odio. Suspendisse faucibus
  ipsum vel libero finibus, in placerat nibh congue. Sed iaculis, metus et
  euismod posuere, mi diam vestibulum felis, ac vulputate eros ipsum id justo.
  Etiam a tincidunt purus. Maecenas semper sed enim at blandit. Aenean ut
  sagittis lorem, eget gravida purus. Phasellus eleifend, lectus nec pulvinar
  facilisis, dui dolor feugiat odio, iaculis tempor felis est non tortor. In
  suscipit lorem efficitur molestie tempus. Integer sit amet neque et risus
  iaculis sodales sed eget diam. Quisque sodales nunc sapien, vitae lacinia ex
  luctus quis. Maecenas scelerisque scelerisque elit eu consequat. Etiam ac
  tristique tellus, sed tincidunt velit.
</p>

<p>
  Fusce dictum ex quis ipsum consectetur placerat. Cras sed lectus ex. Quisque
  purus dolor, vulputate ac mi eget, commodo varius odio. Suspendisse faucibus
  ipsum vel libero finibus, in placerat nibh congue. Sed iaculis, metus et
  euismod posuere, mi diam vestibulum felis, ac vulputate eros ipsum id justo.
  Etiam a tincidunt purus. Maecenas semper sed enim at blandit. Aenean ut
  sagittis lorem, eget gravida purus. Phasellus eleifend, lectus nec pulvinar
  facilisis, dui dolor feugiat odio, iaculis tempor felis est non tortor. In
  suscipit lorem efficitur molestie tempus. Integer sit amet neque et risus
  iaculis sodales sed eget diam. Quisque sodales nunc sapien, vitae lacinia ex
  luctus quis. Maecenas scelerisque scelerisque elit eu consequat. Etiam ac
  tristique tellus, sed tincidunt velit.
</p>
```

#### CSS

We give the `.animated` element a `position` of `fixed`, positioning it near the top-left of the scrollport so we can see when its animation starts and stops.

```css
body {
  width: 80%;
  margin: 0 auto;
  font-family: "Helvetica", "Arial";
  font-size: 1.3rem;
}

div {
  height: 100px;
  border: 5px solid black;
}

.animated {
  width: 100px;
  background: orange;
}

.trigger {
  background: wheat;
}
```

```css
.animated {
  position: fixed;
  top: 25px;
  left: 25px;
}
```

Next, we define the `@keyframes` for a `rotate` animation:

```css
@keyframes rotate {
  from {
    rotate: 0deg;
  }

  to {
    rotate: 360deg;
  }
}
```

The `.animated` element has the `rotate` animation applied. We then give it an `animation-trigger` value that references a `timeline-trigger-name` of `--t` with two `<animation-action>` values, `play-forwards` and `play-backwards`. These specify that the animation will play on activation and play in reverse on deactivation.

```css
.animated {
  animation: rotate 1.5s infinite linear both;
  animation-trigger: --t play-forwards play-backwards;
}
```

The `.trigger` element creates the animated ``'s trigger using a `timeline-trigger` value of `--t view()`. This value includes the identifier referenced in the animated ``'s `animation-trigger` property value (the `timeline-trigger-name`), associating the two together. It also includes:

- A `timeline-trigger-source` value of `view()`, which sets the timeline trigger as a view progress timeline, and the element providing the timeline trigger as the nearest scrolling ancestor element.
- A `timeline-trigger-activation-range` value of `contain`, which means that the trigger will activate when the `.trigger` element is fully inside the scrollport. Because `timeline-trigger-active-range` defaults to `auto`, its value is the same as the activation range; the trigger therefore deactivates when it stops being fully inside the scrollport.

```css
.trigger {
  timeline-trigger: --t view() contain;
}
```

#### Result

Try scrolling the content up. When the tracked `` fully appears in the scrollport, the animation plays; when it starts to leave the scrollport at either edge, the animation plays in reverse.

### Comparing the `<animation-action>` values

This example provides a comparison of the various `<animation-action>` values. By applying the same rotation animation to identical side-by-side elements and varying the `animation-trigger` values, you can compare and contrast the effects of the different actions.

#### HTML

We include a `` element containing five `` elements, each with a number inside. We also include text content to make the page scroll, which we've hidden for brevity.

```html
<section>
  <div class="one">1</div>
  <div class="two">2</div>
  <div class="three">3</div>
  <div class="four">4</div>
  <div class="five">5</div>
</section>
```

```html
<p>
  Fusce dictum ex quis ipsum consectetur placerat. Cras sed lectus ex. Quisque
  purus dolor, vulputate ac mi eget, commodo varius odio. Suspendisse faucibus
  ipsum vel libero finibus, in placerat nibh congue. Sed iaculis, metus et
  euismod posuere, mi diam vestibulum felis, ac vulputate eros ipsum id justo.
  Etiam a tincidunt purus. Maecenas semper sed enim at blandit. Aenean ut
  sagittis lorem, eget gravida purus. Phasellus eleifend, lectus nec pulvinar
  facilisis, dui dolor feugiat odio, iaculis tempor felis est non tortor. In
  suscipit lorem efficitur molestie tempus. Integer sit amet neque et risus
  iaculis sodales sed eget diam. Quisque sodales nunc sapien, vitae lacinia ex
  luctus quis. Maecenas scelerisque scelerisque elit eu consequat. Etiam ac
  tristique tellus, sed tincidunt velit.
</p>

<p>
  Fusce dictum ex quis ipsum consectetur placerat. Cras sed lectus ex. Quisque
  purus dolor, vulputate ac mi eget, commodo varius odio. Suspendisse faucibus
  ipsum vel libero finibus, in placerat nibh congue. Sed iaculis, metus et
  euismod posuere, mi diam vestibulum felis, ac vulputate eros ipsum id justo.
  Etiam a tincidunt purus. Maecenas semper sed enim at blandit. Aenean ut
  sagittis lorem, eget gravida purus. Phasellus eleifend, lectus nec pulvinar
  facilisis, dui dolor feugiat odio, iaculis tempor felis est non tortor. In
  suscipit lorem efficitur molestie tempus. Integer sit amet neque et risus
  iaculis sodales sed eget diam. Quisque sodales nunc sapien, vitae lacinia ex
  luctus quis. Maecenas scelerisque scelerisque elit eu consequat. Etiam ac
  tristique tellus, sed tincidunt velit.
</p>

<section>
  <div class="one">1</div>
  <div class="two">2</div>
  <div class="three">3</div>
  <div class="four">4</div>
  <div class="five">5</div>
</section>

<p>
  Fusce dictum ex quis ipsum consectetur placerat. Cras sed lectus ex. Quisque
  purus dolor, vulputate ac mi eget, commodo varius odio. Suspendisse faucibus
  ipsum vel libero finibus, in placerat nibh congue. Sed iaculis, metus et
  euismod posuere, mi diam vestibulum felis, ac vulputate eros ipsum id justo.
  Etiam a tincidunt purus. Maecenas semper sed enim at blandit. Aenean ut
  sagittis lorem, eget gravida purus. Phasellus eleifend, lectus nec pulvinar
  facilisis, dui dolor feugiat odio, iaculis tempor felis est non tortor. In
  suscipit lorem efficitur molestie tempus. Integer sit amet neque et risus
  iaculis sodales sed eget diam. Quisque sodales nunc sapien, vitae lacinia ex
  luctus quis. Maecenas scelerisque scelerisque elit eu consequat. Etiam ac
  tristique tellus, sed tincidunt velit.
</p>

<p>
  Fusce dictum ex quis ipsum consectetur placerat. Cras sed lectus ex. Quisque
  purus dolor, vulputate ac mi eget, commodo varius odio. Suspendisse faucibus
  ipsum vel libero finibus, in placerat nibh congue. Sed iaculis, metus et
  euismod posuere, mi diam vestibulum felis, ac vulputate eros ipsum id justo.
  Etiam a tincidunt purus. Maecenas semper sed enim at blandit. Aenean ut
  sagittis lorem, eget gravida purus. Phasellus eleifend, lectus nec pulvinar
  facilisis, dui dolor feugiat odio, iaculis tempor felis est non tortor. In
  suscipit lorem efficitur molestie tempus. Integer sit amet neque et risus
  iaculis sodales sed eget diam. Quisque sodales nunc sapien, vitae lacinia ex
  luctus quis. Maecenas scelerisque scelerisque elit eu consequat. Etiam ac
  tristique tellus, sed tincidunt velit.
</p>
```

#### CSS

We apply the same `animation` to each `` element—we play the `rotate` animation infinitely, with each iteration lasting two seconds. We also style each `` to be a `50px` diameter colored circle.

```css
body {
  width: 80%;
  margin: 0 auto;
  font-family: "Helvetica", "Arial";
  font-size: 1.3rem;
}

div {
  display: flex;
  justify-content: center;
}

section {
  display: flex;
  justify-content: space-between;
}
```

```css
div {
  animation: rotate 2s infinite linear both;
  height: 50px;
  width: 50px;
  border: 5px solid black;
  border-radius: 50%;
  background-color: orange;
}
```

Next, we set the `` element to create an animation trigger, with a `timeline-trigger` value of `--t view() contain 20% contain 80%`. There is nothing unusual here, except that we've set a `timeline-trigger-activation-range` value and defaulted the `timeline-trigger-active-range` to `contain 20% contain 80%`. This means the trigger activates when the `` element has scrolled around `20%` of the way up the scrollport, and deactivates when it has scrolled around `80%` of the way up the scrollport. This allows you to see the `<animation-action>` effects more clearly than if the activation range covered the entire scrollport.

```css
section {
  timeline-trigger: --t view() contain 20% contain 80%;
}
```

Next, we set a different `animation-trigger` property value on each `` element. Each one references the `` element's `timeline-trigger-name`, but each one has a different set of `<animation-action>` values applied. The last `` additionally has a new `animation` property value applied, overriding the one we set earlier. It is the same as the original `animation` property, except that the iteration count is set to `1` rather than `infinite`. It is easier to demonstrate the effect of `play-once` when `animation-iteration-count` is not `infinite` (if this were the case, it would play forever, regardless).

```css
.one {
  animation-trigger: --t play-forwards play-backwards;
}

.two {
  animation-trigger: --t play;
}

.three {
  animation-trigger: --t play replay;
}

.four {
  animation-trigger: --t pause play;
}

.five {
  animation: rotate 2s 1 linear both;
  animation-trigger: --t play-once reset;
}
```

```css
@supports not (animation-trigger: --t play-once reset) {
  body::before {
    content: "Your browser does not support scroll-triggered animations.";
    background-color: wheat;
    text-align: center;
    padding: 1rem 0;

    z-index: 1;
    position: fixed;
    inset: 40% 0 auto;
  }
}
```

#### Result

Scroll down to the point where the `` and `` elements enter the scrollport. Move them through the start and end of the trigger activation range, concentrating on a different `` each time, to visualize the effects of each set of `<animation-action>`s.

The effects are:

1. The first `` (far left) has `play-forwards play-backwards` set. When the tracked element enters the activation range, the animation plays forward. When it leaves the activation range (at the top or bottom of the scrollport), it starts playing backward.
2. The second `` has a single `<animation-action>` set — `play`. When the tracked element enters the activation range, the animation starts to play. However, because no deactivation action is set to change its behavior, the animation continues to play forever until the page reloads.
3. The third `` has `play replay` set. When the tracked element enters the activation range, the animation starts playing forward. When it leaves the activation range, the animation resets to progress `0` and then starts playing again.
4. The fourth `` has `pause play` set. When the tracked element enters the activation range, the animation continues not to play due to the paused state. However, when it leaves the activation range, the animation starts to play. From then on, the animation pauses when the tracked element is inside the activation range and plays when it is outside it.
5. The fifth `` (far right, with an iteration count of `1`) has `play-once reset` set. When the tracked element enters the activation range, the animation plays once. When it leaves the activation range, the animation resets to progress `0` and pauses. From then on, the animation plays once whenever the tracked element enters the activation range and resets when it leaves the activation range.

## See also

- `animation-trigger`
- `timeline-trigger` shorthand property
- `timeline-trigger-name`, `timeline-trigger-source`, `timeline-trigger-activation-range`, and `timeline-trigger-active-range`
- `trigger-scope`
- Using CSS scroll-triggered animations
- CSS animation triggers module
- CSS animations module
