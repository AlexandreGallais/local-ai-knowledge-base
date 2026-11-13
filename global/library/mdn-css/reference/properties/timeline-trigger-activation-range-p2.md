---
title: "timeline-trigger-activation-range CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/timeline-trigger-activation-range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# timeline-trigger-activation-range CSS property (part 2 of 2)

## Examples

### Basic usage

In this example, we inset a scroll-triggered animation trigger's activation range by setting a custom `timeline-trigger-activation-range` value.

#### HTML

Our markup contains two `` elements—one to animate and one to create a trigger on—and some text content to make the page scroll. We have hidden the text content for brevity.

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

The `.animated` element's `position` is set to `fixed`, positioning it near the top-left of the scrollport so we can see when its animation starts and stops.

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

Using the `animation` shorthand, the `rotate` animation is applied to the `.animated` element. Without an associated trigger, the element would start animating when the page loads. The `animation-trigger` property makes it a triggered animation. The value references a `timeline-trigger-name` of `--t` and specifies two `<animation-action>` values — `play` and `pause` — which specify that the animation plays on activation and pauses on deactivation.

```css
.animated {
  animation: rotate 3s infinite linear;
  animation-trigger: --t play pause;
}
```

The `.trigger` element creates the `.animated` element's trigger via the following properties:

- A `timeline-trigger-name` with value `--t`, which is equal to the identifier referenced in the `.animated` element's `animation-trigger` property value, associating the two together.
- A `timeline-trigger-source` with value `view()`, which sets the timeline trigger as a view progress timeline, and the element providing the timeline trigger as the nearest scrolling ancestor element.
- A `timeline-trigger-activation-range` of `entry 50% exit 50%`. The `entry` range spans from when the trigger element first starts entering the scrollport to when it has completely entered the scrollport, while the `exit` range spans from when the trigger element first starts leaving the scrollport to when it has completely left the scrollport. This value sets the trigger's activation range to start at `50%` through the `entry` range and end `50%` through the `exit` range.

```css
.trigger {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
  timeline-trigger-activation-range: entry 50% exit 50%;
}
```

#### Result

Try scrolling the content up and down. The animation starts playing when `50%` of the tracked `.trigger` element has entered the scrollport in either direction and pauses when `50%` of the trigger element has exited the scrollport at either edge.

### Comparing multiple range values

This example is identical to the previous example, except that it allows selecting different activation ranges to compare their effects.

The markup is the same as the previous example except we've added a `<select>` element that can be used to change the `timeline-trigger-activation-range` value. When a new value is selected, it is applied to the trigger element using JavaScript. We have hidden the HTML and JavaScript for brevity.

```html
<form>
  <label for="range-select">Select activation range</label>
  <select id="range-select">
    <optgroup label="Start value">
      <option>40%</option>
      <option>200px</option>
      <option>contain</option>
      <option selected>cover</option>
      <option>entry</option>
      <option>exit 50%</option>
      <option>contain 150px</option>
    </optgroup>
    <optgroup label="Start and end value">
      <option>20% 80%</option>
      <option>entry exit</option>
      <option>normal 20%</option>
      <option>20% normal</option>
      <option>contain contain 40%</option>
      <option>200px exit 300px</option>
      <option>entry 10% 90%</option>
      <option>entry 0% exit 50%</option>
      <option>contain 100px contain 90%</option>
    </optgroup>
  </select>
</form>
```

```js
const selectElem = document.querySelector("select");
const triggerElem = document.querySelector(".trigger");

selectElem.addEventListener("change", () => {
  triggerElem.style.timelineTriggerActivationRange = selectElem.value;
});
```

#### CSS

The CSS is the same as for the previous example, except we've omitted the `timeline-trigger-activation-range` value. This means that until a range value is selected, the range will default to `normal`, which is `cover 0% cover 100%` in this case.

```css
form {
  width: 250px;
  padding: 5px;
  border: 2px solid black;
  background: white;
  position: fixed;
  top: 0;
  right: 0;
}

label,
select {
  font-size: 1rem;
}

select {
  padding: 5px;
  margin-top: 5px;
  width: 100%;
}
```

```css
.animated {
  animation: rotate 3s infinite linear;
  animation-trigger: --t play pause;
}

.trigger {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
}
```

```css
@supports not (timeline-trigger-activation-range: entry 50% exit 50%) {
  body::before {
    content: "Your browser does not support the timeline-trigger-activation-range property.";
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

Select different range values then scroll the tracked element up and down the scrollport to see where the animated element starts and stops rotating.

## See also

- `animation-trigger`
- `timeline-trigger-name`, `timeline-trigger-source`, and `timeline-trigger-active-range`
- `timeline-trigger` shorthand property
- `trigger-scope`
- `animation-action` type
- Using CSS scroll-triggered animations
- CSS animation triggers module
- CSS animations module
