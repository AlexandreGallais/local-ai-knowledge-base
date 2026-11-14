---
title: "timeline-trigger-activation-range-end CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/timeline-trigger-activation-range-end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# timeline-trigger-activation-range-end CSS property

The **`timeline-trigger-activation-range-end`** CSS property specifies the end of a scroll-triggered animation trigger's activation range.

## Syntax

```css
/* Keyword */
timeline-trigger-activation-range-end: normal;

/* <length-percentage> */
timeline-trigger-activation-range-end: 80%;
timeline-trigger-activation-range-end: 400px;

/* Named timeline range */
timeline-trigger-activation-range-end: contain;
timeline-trigger-activation-range-end: exit;

/* Named timeline with <length-percentage> */
timeline-trigger-activation-range-end: entry 110%;
timeline-trigger-activation-range-end: contain 600px;

/* Multiple range end values */
timeline-trigger-activation-range-end:
  contain,
  entry 100%;

/* Global values */
timeline-trigger-activation-range-end: inherit;
timeline-trigger-activation-range-end: initial;
timeline-trigger-activation-range-end: revert;
timeline-trigger-activation-range-end: revert-layer;
timeline-trigger-activation-range-end: unset;
```

### Values

This property is specified as a comma-separated list of the following values:

- `normal`
    The default value. Equivalent to `cover 100%` for a view progress timeline `timeline-trigger-source`, and `scroll 100%` for a scroll progress timeline.
- `length-percentage`
    Specifies an offset as a `<length>` or `<percentage>`, measured from the beginning of the `normal` timeline. Percentages are relative to the length of the `normal` timeline range.
- `timeline-range-name`
    Specifies the end (`100%`) of the `cover`, `contain`, `entry`, `exit`, `entry-crossing`, `exit-crossing`, or `scroll` timeline range.
- `<timeline-range-name>` `<length-percentage>`
    Specifies a length or percentage offset measured from the beginning of the specified named timeline range. Percentages are relative to the length of the named timeline.

## Description

The `timeline-trigger-activation-range-end` property can be used to explicitly specify the end of a trigger's activation range as a timeline range, offset, or both.

A trigger's activation range is the range along the associated scrollport within which a CSS scroll-triggered animation trigger will activate. Activation occurs when the tracked element enters the _activation range_, and deactivation occurs when it leaves the _active range_.

The `normal` value sets the end of the activation range to the end of the default named range. This is equivalent to `cover 100%` for a view progress timeline and `scroll 100%` for a scroll progress timeline.

Other `timeline-trigger-activation-range-end` values can be used to set:

- An offset from the `normal` range
    A `<length>` or `<percentage>` value specifies an offset from the beginning of the `normal` timeline, which again defaults to `cover 100%` for a view progress timeline source and `scroll 100%` for a scroll progress timeline source. Negative values outset the end, resulting in a longer activation range. Positive values inset the end of the activation range, making it shorter.
- The end of a specific named range
    A `<timeline-range-name>` value specifies a `100%` offset along the named timeline range, which is either `cover`, `contain`, `entry`, `exit`, `entry-crossing`, `exit-crossing`, or `scroll`. See Understanding timeline range names.
- An offset from a specific named range
    When both a `<timeline-range-name>` and `<length>` or `<percentage>` value are specified, the end is offset by the distance specified from the start of the named range. Percentage values are relative to the range specified. See Setting insets using percentages.

By default, the active range is the same as the activation range. You can use the `timeline-trigger-active-range-end` or `timeline-trigger-active-range` properties to extend the end of the active range and make the active range longer than the activation range. This is useful when you want to trigger an animation in a small activation range, but you want the trigger to stay active within a larger range.

The `timeline-trigger-activation-range-end` property, along with the `timeline-trigger-activation-range-start` property, can also be set using the `timeline-trigger-activation-range` shorthand, which in turn can be set using the `timeline-trigger` shorthand.

### Specifying multiple range end values

When multiple values are specified in a comma-separated `timeline-trigger-activation-range-end` declaration, each value applies to a timeline trigger in the order in which the names appear in the `timeline-trigger-name` property. When the number of triggers and `timeline-trigger-activation-range-end` property values do not match, they are applied in the same way as multiple animation property values:

- If the number of `timeline-trigger-activation-range-end` values exceeds the number of `timeline-trigger-name` values, the excess range values are discarded.
- If the number of trigger names is greater than the number of ranges, the `timeline-trigger-activation-range-end` values are cycled until every `timeline-trigger-name` value has a `timeline-trigger-activation-range-end` value set.
- If multiple `timeline-trigger-name` values are set, but only one `timeline-trigger-activation-range-end` value is set, that `timeline-trigger-activation-range-end` value will apply to all the `timeline-trigger-name`s.

## Examples

### Basic usage

In this example, we inset the end of a scroll-triggered animation trigger's activation range by setting a custom `timeline-trigger-activation-range-end` value.

#### HTML

Our markup contains two `` elements — one to animate and one to create a trigger on — plus some basic text content to cause the page to scroll. We have hidden the text content for brevity.

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

The `.animated` element's `position` is set to `fixed`, positioning it near the top-left of the scrollport to enable us to see when its animation starts and stops.

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

Using the `animation` shorthand, the `rotate` animation is applied to the `.animated` element. Without an associated trigger, the element would start animating when the page loads. The `animation-trigger` property makes it a triggered animation. The value references a `timeline-trigger-name` of `--t` and specifies two `<animation-action>` values — `play` and `pause` — which specify that the animation will play on activation, and pause on deactivation.

```css
.animated {
  animation: rotate 3s infinite linear;
  animation-trigger: --t play pause;
}
```

The `.trigger` element creates the `.animated` element's trigger via the following properties:

- A `timeline-trigger-name` with value `--t`, which is equal to the identifier referenced in the `.animated` element's `animation-trigger` property value, associating the two together.
- A `timeline-trigger-source` with value `view()`, which sets the timeline trigger as a view progress timeline, and the element providing the timeline trigger as the nearest scrolling ancestor element.
- A `timeline-trigger-activation-range-end` of `contain 60%`. The `contain` range spans from when the trigger element has fully entered the scrollport to when it starts to leave. This value sets the trigger's activation range's start to `60%` through the `contain` range.

```css
.trigger {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
  timeline-trigger-activation-range-end: contain 60%;
}
```

When not explicitly set, the `timeline-trigger-activation-range-start` value defaults to `normal`, which in this case is `cover 0%`. This is the start of the `cover` range, meaning activation occurs when the tracked element starts to enter the scrollport's end edge.

```css
@supports not (timeline-trigger-activation-range-end: contain 60%) {
  body::before {
    content: "Your browser does not support the timeline-trigger-activation-range-end property.";
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

Try scrolling the content up. The animation starts playing when the tracked `.trigger` element first becomes visible at the scrollport end edge and pauses when it has scrolled `60%` of the way up the timeline range. When you scroll down, the effect reverses — the animation restarts playing when the trigger element gets to `60%` of the way up, and pauses again when the trigger element reaches the end edge.

## See also

- `timeline-trigger-activation-range-start`
- `timeline-trigger-activation-range` shorthand property
- `timeline-trigger-name`, `timeline-trigger-source`, and `timeline-trigger-active-range`
- `timeline-trigger` shorthand property
- Using CSS scroll-triggered animations
- CSS animation triggers module
- CSS animations module
