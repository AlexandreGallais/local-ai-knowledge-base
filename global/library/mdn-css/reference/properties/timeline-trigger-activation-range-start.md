---
title: "timeline-trigger-activation-range-start CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/timeline-trigger-activation-range-start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# timeline-trigger-activation-range-start CSS property

The **`timeline-trigger-activation-range-start`** CSS property specifies the start of a scroll-triggered animation trigger's activation range.

## Syntax

```css
/* Keyword */
timeline-trigger-activation-range-start: normal;

/* <length-percentage> */
timeline-trigger-activation-range-start: 20%;
timeline-trigger-activation-range-start: 350px;

/* Named timeline range */
timeline-trigger-activation-range-start: cover;
timeline-trigger-activation-range-start: exit;

/* Named timeline with <length-percentage> */
timeline-trigger-activation-range-start: entry 40%;
timeline-trigger-activation-range-start: contain -20px;

/* Multiple range start values */
timeline-trigger-activation-range-start:
  contain,
  entry -10%;

/* Global values */
timeline-trigger-activation-range-start: inherit;
timeline-trigger-activation-range-start: initial;
timeline-trigger-activation-range-start: revert;
timeline-trigger-activation-range-start: revert-layer;
timeline-trigger-activation-range-start: unset;
```

### Values

This property is specified as a comma-separated list of the following values:

- `normal`
    The default value. Equivalent to `cover 0%` for a view progress timeline `timeline-trigger-source`, and `scroll 0%` for a scroll progress timeline.
- `length-percentage`
    Specifies an offset as a `<length>` or `<percentage>`, measured from the beginning of the `normal` timeline. Percentages are relative to the length of the `normal` timeline range.
- `timeline-range-name`
    Specifies the start (`0%`) of the `cover`, `contain`, `entry`, `exit`, `entry-crossing`, `exit-crossing`, or `scroll` timeline range.
- `<timeline-range-name>` `<length-percentage>`
    Specifies a length or percentage offset measured from the beginning of the specified named timeline range. Percentages are relative to the length of the named timeline.

## Description

The `timeline-trigger-activation-range-start` property can be used to explicitly specify the start of a trigger's activation range. The value is specified as a timeline range, offset, or both.

A trigger's activation range is the range along the associated scrollport within which a CSS scroll-triggered animation trigger will activate. Activation occurs when the tracked element enters the _activation range_, and deactivation occurs when it leaves the _active range_.

The `normal` value sets the start of the activation range to the start of the default named range. This is equivalent to `cover 0%` for a view progress timeline and `scroll 0%` for a scroll progress timeline.

Other `timeline-trigger-activation-range-start` property can be used to set:

- An offset from the `normal` range
    A `<length>` or `<percentage>` value specifies an offset from the beginning of the `normal` timeline, which again defaults to `cover 0%` for a view progress timeline source, and `scroll 0%` for a scroll progress timeline source. Negative values outset the start, resulting in a longer activation range. Positive values inset the start, making the activation range shorter.
- The start of a specific named range
    A `<timeline-range-name>` value specifies a `0%` offset along the named timeline range, which is either `cover`, `contain`, `entry`, `exit`, `entry-crossing`, `exit-crossing`, or `scroll`. See Understanding timeline range names.
- An offset from a specific named range
    When both a `<timeline-range-name>` and `<length>` or `<percentage>` value are specified, the start is the beginning of the named range offset by the distance specified. Percentage values are relative to the length of the range specified. See Setting insets using percentages.

The `timeline-trigger-activation-range-start` property, along with the `timeline-trigger-activation-range-end` property, can also be set using the `timeline-trigger-activation-range` shorthand, which in turn can be set using the `timeline-trigger` shorthand.

### Specifying multiple range start values

When multiple values are specified in a comma-separated `timeline-trigger-activation-range-start` declaration, each value applies to a timeline trigger in the order in which the names appear in the `timeline-trigger-name` property. When the number of triggers and `timeline-trigger-activation-range-start` property values do not match, they are applied in the same way as multiple animation property values:

- If the number of `timeline-trigger-activation-range-start` values exceeds the number of `timeline-trigger-name` values, the excess range values are discarded.
- If the number of trigger names is greater than the number of ranges, the `timeline-trigger-activation-range-start` values are cycled until every `timeline-trigger-name` value has a `timeline-trigger-activation-range-start` value set.
- If multiple `timeline-trigger-name` values are set, but only one `timeline-trigger-activation-range-start` value is set, that `timeline-trigger-activation-range-start` value will apply to all the `timeline-trigger-name`s.

## Examples

### Basic usage

In this example, we inset the start of a scroll-triggered animation trigger's activation range by setting a custom `timeline-trigger-activation-range-start` value.

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

Using the `animation` shorthand, the `rotate` animation is applied to the `.animated` element. Without an associated trigger, the element would start animating when the page loads. The `animation-trigger` property makes it a triggered animation. The value references a `timeline-trigger-name` of `--t` and specifies two `<animation-action>` values — `play` and `pause` — which specify that the animation will play on activation and pause on deactivation.

```css
.animated {
  animation: rotate 3s infinite linear;
  animation-trigger: --t play pause;
}
```

The `.trigger` element creates the `.animated` element's trigger via the following properties:

- A `timeline-trigger-name` with value `--t`, which is equal to the identifier referenced in the `.animated` element's `animation-trigger` property value, associating the two together.
- A `timeline-trigger-source` with value `view()`, which sets the timeline trigger as a view progress timeline, and the element providing the timeline trigger as the nearest scrolling ancestor element.
- A `timeline-trigger-activation-range-start` of `entry 50%`. The `entry` range spans from when the trigger element first starts entering the scrollport to when it has completely entered the scrollport. This value sets the trigger's activation range's start to `50%` through the `entry` range, which occurs when `50%` of the tracked `.trigger` element has entered the scrollport via the scrollport's end edge.

```css
.trigger {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
  timeline-trigger-activation-range-start: entry 50%;
}
```

When not explicitly set, the `timeline-trigger-activation-range-end` value defaults to `normal`, which in this case is `cover 100%`. The `timeline-trigger-active-range-end` value defaults to `auto` — the same as `timeline-trigger-activation-range-end`. This means that deactivation occurs at the end of the `cover` range, when the tracked element exits the scrollport's start edge.

```css
@supports not (timeline-trigger-activation-range-start: entry 50%) {
  body::before {
    content: "Your browser does not support the timeline-trigger-activation-range-start property.";
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

Try scrolling the content up. The animation starts playing when `50%` of the tracked `.trigger` element has entered the scrollport end edge and pauses when it has completely exited the scrollport at the opposite edge. When you scroll down, the effect reverses — the animation restarts playing when the trigger element starts to enter the top of the scrollport, and pauses again when `50%` of the trigger element has exited the bottom.

## See also

- `timeline-trigger-activation-range-end`
- `timeline-trigger-activation-range` shorthand property
- `timeline-trigger-name`, `timeline-trigger-source`, and `timeline-trigger-active-range`
- `timeline-trigger` shorthand property
- Using CSS scroll-triggered animations
- CSS animation triggers module
- CSS animations module
