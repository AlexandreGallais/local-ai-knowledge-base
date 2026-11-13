---
title: "`view-timeline-name` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/view-timeline-name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `view-timeline-name` CSS property

The **`view-timeline-name`** CSS property specifies the names of one or more named view progress timelines associated with the element.

## Syntax

```css
/* Keyword value */
view-timeline-name: none;

/* Custom identifier */
view-timeline-name: --custom_name_for_timeline;

/* Multiple identifiers */
view-timeline-name: --first_timeline_name, --another_timeline_name;

/* Global values */
view-timeline-name: inherit;
view-timeline-name: initial;
view-timeline-name: revert;
view-timeline-name: revert-layer;
view-timeline-name: unset;
```

### Values

- `none`
    Indicates that the timeline has no name. This is the default value.
- `<dashed-ident>`
    Specifies a comma-separated list of `dashed-ident` custom name identifiers. All `<dashed-ident>` values must start with `--`, which helps avoid name clashes with standard CSS keywords.

## Description

The `view-timeline-name` property is used to set the name of a view progress timeline. A view progress timeline is progressed through based on the change in visibility of an element, called the _subject_, inside a scrollable element, called the _scroller_. The `view-timeline-name` property is set on the subject. You can also set `view-timeline-name` by using the `view-timeline` shorthand property.

If the subject's named scroller element does not overflow its container in the axis dimension or if the overflow is hidden or clipped, no scroll progress timeline will be created.

Once created, the `<dashed-ident>` name values specified can be referenced in `animation-timeline` declarations to indicate the element that will be animated as the timeline progresses.

## Examples

### Creating a named view progress timeline

A view progress timeline named `--subject-reveal` is defined using the `view-timeline-name` property on a subject element with a `class` of `animation`.
This is then set as the timeline for the same element using `animation-timeline: --subject-reveal;`. The result is that the subject element animates as it moves upwards through the document as it is scrolled.

#### HTML

The HTML for the example is shown below.

```html
<div class="content">
  <h1>Content</h1>

  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Risus quis varius quam
    quisque id. Et ligula ullamcorper malesuada proin libero nunc consequat
    interdum varius. Elit ullamcorper dignissim cras tincidunt lobortis feugiat
    vivamus at augue.
  </p>

  <p>
    Dolor sed viverra ipsum nunc aliquet. Sed sed risus pretium quam vulputate
    dignissim. Tortor aliquam nulla facilisi cras. A erat nam at lectus urna
    duis convallis convallis. Nibh ipsum consequat nisl vel pretium lectus.
    Sagittis aliquam malesuada bibendum arcu vitae elementum. Malesuada bibendum
    arcu vitae elementum curabitur vitae nunc sed velit.
  </p>

  <div class="subject animation"></div>

  <p>
    Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Arcu
    cursus vitae congue mauris rhoncus aenean vel. Sit amet cursus sit amet
    dictum. Augue neque gravida in fermentum et. Gravida rutrum quisque non
    tellus orci ac auctor augue mauris. Risus quis varius quam quisque id diam
    vel quam elementum. Nibh praesent tristique magna sit amet purus gravida
    quis. Duis ultricies lacus sed turpis tincidunt id aliquet. In egestas erat
    imperdiet sed euismod nisi. Eget egestas purus viverra accumsan in nisl nisi
    scelerisque. Netus et malesuada fames ac.
  </p>
</div>
```

#### CSS

The `subject` element and its containing `content` element are styled minimally, and the text content is given some basic font settings:

```css
.subject {
  width: 300px;
  height: 200px;
  margin: 0 auto;
  background-color: deeppink;
}

.content {
  width: 75%;
  max-width: 800px;
  margin: 0 auto;
}

p,
h1 {
  font-family: "Helvetica", "Arial", sans-serif;
}

h1 {
  font-size: 3rem;
}

p {
  font-size: 1.5rem;
  line-height: 1.5;
}
```

The `` with the class of `subject` is also given a class of `animation` — this is where `view-timeline-name` is set to define a named view progress timeline. It is also given an `animation-timeline` name with the same value to declare that this will be the element animated as the view progress timeline is progressed.

Last, an animation is specified on the element that animates its opacity and scale, causing it to fade in and size up as it moves up the scroller.

```css
.animation {
  view-timeline-name: --subject-reveal;
  animation-timeline: --subject-reveal;

  animation-name: appear;
  animation-fill-mode: both;
  animation-duration: 1ms; /* Firefox requires this to apply the animation */
}

@keyframes appear {
  from {
    opacity: 0;
    transform: scaleX(0);
  }

  to {
    opacity: 1;
    transform: scaleX(1);
  }
}
```

```css
@layer no-support {
  @supports not (view-timeline-name: none) {
    body::before {
      content: "Your browser doesn't support the `view-timeline-name` property.";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

Scroll to see the subject element being animated.

## See also

- `animation-timeline`
- `view-timeline`
- Scroll-driven animation timelines
- CSS scroll-driven animations module
- CSS animations module
