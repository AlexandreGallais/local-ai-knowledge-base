---
title: "timeline-trigger-source CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/timeline-trigger-source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# timeline-trigger-source CSS property

The **`timeline-trigger-source`** CSS property specifies the timeline that will trigger a scroll-triggered animation.

## Syntax

```css
/* Keywords */
timeline-trigger-source: none;
timeline-trigger-source: auto;

/* Named timeline */
timeline-trigger-source: --my-timeline;

/* Anonymous scroll progress timeline */
timeline-trigger-source: scroll();
timeline-trigger-source: scroll(x root);

/* Anonymous view progress timeline */
timeline-trigger-source: view();
timeline-trigger-source: view(inline);
timeline-trigger-source: view(x 200px auto);

/* Multiple source values */
timeline-trigger-source: view(), none, --my-timeline;
timeline-trigger-source: scroll(x), auto, scroll(y root);

/* Global values */
timeline-trigger-source: inherit;
timeline-trigger-source: initial;
timeline-trigger-source: revert;
timeline-trigger-source: revert-layer;
timeline-trigger-source: unset;
```

### Values

This property is specified as a comma-separated list of the following values:

- `none`
    The element's trigger does not have a source: it is not associated with any timeline and the animation does not happen.
- `auto`
    The element's trigger source is the document's default time-based `DocumentTimeline`. This is the default value.
- `dashed-ident`
    The element creates a scroll-triggered animation trigger as a named view progress timeline.
- `scroll()`
    The element creates a scroll-triggered animation trigger as an anonymous scroll progress timeline.
- `view()`
    The element creates a scroll-triggered animation trigger as an anonymous view progress timeline.

## Description

The `timeline-trigger-source` property specifies the timeline trigger that will control a scroll-triggered animation.

For example:

```css
.trigger {
  timeline-trigger-name: --my-trigger;
  timeline-trigger-source: view();
}
```

The resulting `ViewTimeline` tracks the position of the `.trigger` element across the block-axis of the nearest ancestor scroller. The trigger activates and deactivates when the tracked element is scrolled to certain positions inside the scrollport. By default, when `timeline-trigger-source` is set to `view()`, activation occurs when the tracked element starts to enter the scrollport, and deactivation occurs when the tracked element completely exits the scrollport.

An animated element can be triggered by the previously described trigger by referencing its `timeline-trigger-name` in its `animation-trigger` property. The `animation-trigger` value consists of a comma-separated list, each containing the name of a trigger and one or two `animation-action` keywords that specify what the animation should do when its trigger activates and deactivates.

For example:

```css
.animated {
  animation: rotate 3s infinite linear both;
  animation-trigger: --my-trigger play-once;
}
```

The animated element and the element that creates the trigger can be the same element. In this case, the animated element creates its own trigger:

```css
.animatedAndTrigger {
  animation: rotate 3s infinite linear both;
  animation-trigger: --my-trigger play-once;

  timeline-trigger-name: --my-trigger;
  timeline-trigger-source: view();
}
```

The `timeline-trigger-source` property, along with the `timeline-trigger-name`, `timeline-trigger-activation-range`, and `timeline-trigger-active-range` properties, can also be set using the `timeline-trigger` shorthand property.

### Trigger source types

To create a triggered animation, set the `timeline-trigger-source` property to one of three main value types:

- A `view()` function referencing an anonymous view progress timeline trigger. This is created on the nearest scrolling ancestor of the element that creates the trigger. As shown earlier, this allows you to create functionality whereby an element will start animating when it (or another element) reaches a certain scroll offset in the scrollport, and stop animating (or some other action) when it (or another element) reaches a different scroll offset. For example:

  ```css
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
  ```

- A `scroll()` function referencing an anonymous scroll progress timeline trigger. You can create this on the root element or the nearest scroller of the element that creates the trigger. This allows you to create functionality whereby an element will start animating when it (or another element) reaches an absolute scroll offset (for example, it scrolls upwards by `600px`), and stop animating (or some other action) when it (or another element) reaches a different offset. For example:

  ```css
  timeline-trigger-name: --t;
  timeline-trigger-source: scroll();
  timeline-trigger-activation-range: 600px;
  ```

  > **Note:**
  > See the `scroll()` example.

- A `dashed-ident` referencing a named view progress timeline or named scroll progress timeline. This involves setting a `view-timeline-name` or `scroll-timeline-name` on the element that creates the trigger, and then referring to that name in the value of the `timeline-trigger-source` property, for example:

  ```css
  view-timeline-name: --my-timeline;
  timeline-trigger-source: --my-timeline;
  ```

Scroll progress timelines are arguably less useful for scroll-triggered animations than view progress timelines. You are more likely to want an animation to start at a scroll offset relative to the scrollport, not after an arbitrary amount of scrolling, where the animation may well be triggered offscreen on smaller screens.

### Other values

It is also possible to set `timeline-trigger-source` to a keyword of `auto` or `none`. Both result in a non-scroll-triggered animation, but their effects differ.

- The default value, `auto`, sets the element's trigger source to the document's default time-based `DocumentTimeline`. This results in any animations applied to the element playing on page load.
- The `none` value results in the element's trigger having no source, which means that any animations applied to the element will not play at all.

### Multiple sources

When you specify multiple comma-separated values on a single `timeline-trigger-source` property, they are applied to the timeline triggers in the order in which the `timeline-trigger-name`s appear. When the number of triggers and `timeline-trigger-source` property values do not match, they are applied in the same way as multiple animation property values.

For example, if multiple `timeline-trigger-name` values are set, but only a single `timeline-trigger-source` value is set, the `timeline-trigger-source` will apply to all the `timeline-trigger-name`s. If two `timeline-trigger-source` values are set, they will cycle between the `timeline-trigger-name`s until all of them have a `timeline-trigger-source` value set. And so on.

Consider these declarations:

```css
timeline-trigger-name: --my-trigger, --my-other-trigger, --another-trigger;
timeline-trigger-source: view(), --my-source;
```

In this case, the first name will use the `view()` source, and the second name will use the `--my-source` source. The third name will cycle back to using the `view()` source again.

## Examples

### Basic view progress timeline source usage

In this example, we create a basic <example-value> animation that uses an anonymous view progress timeline trigger source.

#### HTML

The markup contains two `` elements: one to animate and one to create a trigger, plus basic text content to make the page scroll. The text is hidden for brevity.

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

The animated `` element's `position` is set to `fixed`, positioning it near the top-left of the scrollport to enable us to see when its animation starts and stops.

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

Next, we define the `@keyframes` for the `rotate` animation we will use later:

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

Using the `animation` shorthand, the `.animated` element has the `rotate` animation applied. Without an associated trigger, the element would start animating when the page loads. The `animation-trigger` property makes it a triggered animation. The value references a `timeline-trigger-name` of `--t` and specifies two `<animation-action>` values — `play` and `pause` — which specify that the animation will play on activation and pause on deactivation.

```css
.animated {
  animation: rotate 3s infinite linear;
  animation-trigger: --t play pause;
}
```

The `.trigger` element creates the animated ``'s trigger via the following properties:

- A `timeline-trigger-name` with value `--t`, which is equal to the identifier referenced in the `.animated` element's `animation-trigger` property value, associating the two together.
- A `timeline-trigger-source` with value `view()`, which sets the timeline trigger as a view progress timeline, and the element providing the timeline trigger as the nearest scrolling ancestor element.

```css
.trigger {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
}
```

#### Result

Try scrolling the content up. When any part of the `.trigger` appears in the scrollport, the animation will play; when it has completely left the scrollport at either edge, the animation will pause.

### Basic <example-value> progress timeline source usage

This example is nearly identical to the previous one, except that this time we set `timeline-trigger-source` to an anonymous scroll progress timeline instead of an anonymous view progress timeline.

The HTML and CSS are nearly identical, except that this time we have set our `.trigger` element's `timeline-trigger-source` to `scroll()` instead of `view()`. This creates the trigger as an anonymous scroll progress timeline on the element's nearest scrolling ancestor.

We have also set a `timeline-trigger-activation-range` of `600px`, which means that the trigger will activate (meaning the animation will start playing) when the tracked element scrolls upwards by `600px`. If we didn't set this, the trigger would activate immediately on page load.

```css
.animated {
  animation: rotate 3s infinite linear;
  animation-trigger: --t play pause;
}
```

```css
.trigger {
  timeline-trigger-name: --t;
  timeline-trigger-source: scroll();
  timeline-trigger-activation-range: 600px;
}
```

```css
@supports not (timeline-trigger-source: scroll()) {
  body::before {
    content: "Your browser does not support the timeline-trigger-source property.";
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

The animation will start when the tracked element scrolls `600px` upwards.

## See also

- `timeline-trigger-name`, `timeline-trigger-activation-range`, and `timeline-trigger-active-range`
- `timeline-trigger` shorthand property
- `animation-trigger`
- `animation-action` type
- `trigger-scope`
- Using CSS scroll-triggered animations
- CSS animation triggers module
- CSS animations module
