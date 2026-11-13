---
title: "timeline-trigger-active-range CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/timeline-trigger-active-range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# timeline-trigger-active-range CSS property (part 2 of 2)

## Examples

### Basic usage

This example demonstrates the effect of extending a trigger's active range by comparing a triggered animation with a longer active range than its activation range against an identical triggered animation with no `timeline-trigger-active-range` property set.

#### HTML

The markup contains four `` elements — two to animate and two to create a trigger on — plus some content that causes the page to scroll. We have hidden the extra content for brevity.

```html
<div class="animated">I am animated</div>
<div class="animated longer">I am animated longer</div>

...
<section>
  <div class="trigger">I create the trigger</div>
  <div class="trigger longer">I create a longer trigger</div>
</section>
...
```

```html
<div class="animated">I am animated</div>
<div class="animated longer">I am animated longer</div>
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
  <div class="trigger">I create the trigger</div>
  <div class="trigger longer">I create a longer trigger</div>
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

The `.animated` elements' `position` is set to `fixed`, positioning them near the top-left of the scrollport to enable us to see when their animations start and stop.

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
.animated.longer {
  left: 150px;
}
section {
  display: flex;
  gap: 20px;
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

Using the `animation` shorthand, the `rotate` animation is applied to the `.animated` elements. Without an associated trigger, the elements would start animating when the page loads. The `animation-trigger` property makes it a triggered animation. The values reference a `timeline-trigger-name` of `--t` and `--longer-t`, respectively, and define the same `<animation-action>` values on each — `play` and `pause` — which specify that the animations will play on activation and pause on deactivation.

```css
.animated {
  animation: rotate 3s infinite linear;
  animation-trigger: --t play pause;
}
.animated.longer {
  animation-trigger: --longer-t play pause;
}
```

The `.trigger` element creates the `.animated` element's trigger via the following properties:

- A `timeline-trigger-name` with value `--t`, which is equal to the identifier referenced in the `.animated` element's `animation-trigger` property value, associating the two together.
- A `timeline-trigger-source` with value `view()`, which sets the timeline trigger as a view progress timeline, and the element providing the timeline trigger as the nearest scrolling ancestor element.
- A `timeline-trigger-activation-range` of `contain 25% contain 75%`. The `contain` range spans from when the trigger element has completely entered the scrollport to when it starts to leave. This value sets the trigger's activation range to start `25%` of the way through the `contain` range and end `75%` of the way through the range. In other words, the activation range is the middle half of the scrollport.

The `.trigger.longer` element creates the `.animated.longer` element's trigger via the following properties:

- A `timeline-trigger-name` with value `--longer-t` (overriding the `--t`), which is equal to the identifier referenced in the `.animated.longer` element's `animation-trigger` property value, associating the two together.
- A `timeline-trigger-active-range` of `cover 0% cover 100%`. The `cover` range spans from when the trigger element starts to enter the scrollport to when it has completely left. In other words, the active range is when any part of the tracked element is in the scrollport.

```css
.trigger {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
  timeline-trigger-activation-range: contain 25% contain 75%;
}
.trigger.longer {
  timeline-trigger-name: --longer-t;
  timeline-trigger-active-range: cover 0% cover 100%;
}
```

```css
@supports not (timeline-trigger-active-range: contain 0%) {
  body::before {
    content: "Your browser does not support the timeline-trigger-active-range property.";
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

Try scrolling the content up. Both animations start playing when the tracked `.trigger` elements are about a quarter of the way up the scrollport. Continue scrolling. The first animation pauses when its trigger element gets to 75% through the scrollport, whereas the second animation doesn't pause until its trigger element has completely left the scrollport.

This is because the active range extends how long the trigger remains active, but doesn't change where activation occurs.

## See also

- `timeline-trigger-active-range-end`, `timeline-trigger-active-range-start`
- `animation-trigger`
- `timeline-trigger-name`, `timeline-trigger-source`, and `timeline-trigger-activation-range`
- `timeline-trigger` shorthand property
- `trigger-scope`
- `animation-action` type
- Using CSS scroll-triggered animations
- CSS animation triggers module
- CSS animations module
