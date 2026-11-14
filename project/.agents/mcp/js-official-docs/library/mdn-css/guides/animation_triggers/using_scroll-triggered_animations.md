---
title: "Using CSS scroll-triggered animations (part 1 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/animation_triggers/using_scroll-triggered_animations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS scroll-triggered animations

CSS **scroll-triggered animations** provide a declarative mechanism to start, pause, stop, or reverse an element's `DocumentTimeline`-based CSS animation when the user scrolls it (or a different element) to a specified offset within a scrollport.

This article covers how to create CSS scroll-triggered animations.

## Scroll-triggered animation concepts

A common UI pattern involves triggering animations on a web page when the user scrolls to a certain place in the content, for example, to pull in additional UI elements or draw the user's attention to certain details.

CSS scroll-triggered animations enable defining scroll-based triggers that start and stop regular time-based CSS animations. You can define trigger positions inside a scroll container so that, when a tracked element reaches those positions within the scrollport, they toggle the play state of an animation applied to that element, or to a completely different element.

> **Note:**
> Scroll-triggered animations provide an alternative to using JavaScript features — such as frameworks or the Intersection Observer API — to trigger animations on scroll. CSS scroll-triggered animations are more performant and, arguably, simpler to implement.

### Scroll-triggered versus scroll-driven animations

Scroll-triggered animations are similar to CSS scroll-driven animations, but they are different:

- Scroll-triggered animations are regular time-based animations that play when a trigger becomes active; they observe the `animation-delay` each time the animation starts, and always complete each iteration in the amount of time defined by the `animation-duration`, regardless of how fast the user scrolls.
- With scroll-driven animations, the normal, time-based animation timeline is replaced by a scroll-based timeline, meaning that the animation progresses forwards and backwards as you scroll towards the start and end of the content, respectively, with faster scrolling resulting in a faster animation. Scroll-driven animations ignore the `animation-duration` and `animation-delay` properties.

## Scroll-triggered animation basics

Let's walk through a basic <example-value> to show you how a scroll-triggered animation works. An image caption will fade in and out when the image it is captioning is scrolled into and out of view. In this case:

- The `` element has a `@keyframes` animation set on it: a fade-in effect. This animation is the _triggered animation_.
- For the _animation actions_, we specify that the animation should play forwards when the trigger is _activated_, fading the caption in, and play backwards when the trigger is _deactivated_, fading the caption out.
- The _animation triggers_ are defined on the `` element. The activation is triggered when the `` starts entering the scrollport and the deactivation occurs when the `` fully exits the scrollport, meaning the full scrollport is the _timeline range_, the `` is the _tracked element_, and the `` is the animated element.
- We'll set an anonymous view progress timeline as the _trigger source_ on the `` element, created using the `view()` function.

As the content is scrolled up and down, the caption's animation will start as soon as the `` begins to appear inside the scrollport, with the animation reversing when the `` exits the scrollport. This basic <example-value> doesn't create the effect we want, but it's a good start that we can improve on as we learn about more features.

The HTML features several paragraphs of content with a `` element included in the middle of them, which contains the `` and ``. For the sake of brevity, we are not showing the full source.

```html
...

<p>...</p>

<figure>
  <img
    src="jungle-coast.jpg"
    alt="A view across some trees towards a rocky coast" />
  <figcaption>A view of the Jungle coast</figcaption>
</figure>

<p>...</p>

...
```

```html
<h1>Information about Cairns</h1>

<p>
  The countryside surrounding Cairns, located in eastern Australia, is a
  breathtakingly beautiful region characterized by diverse landscapes, lush
  greenery, and unique natural wonders.
</p>

<p>
  Nestled between the Great Dividing Range and the sparkling Coral Sea, this
  area offers a stunning blend of tropical rainforests, pristine beaches, and
  majestic mountain ranges.
</p>

<p>
  As you venture away from the city, you'll be greeted by the verdant
  rainforests of the Wet Tropics World Heritage Area. Towering ancient trees,
  vibrant ferns, and cascading waterfalls create a serene and magical
  atmosphere.
</p>
<p>
  Exploring the lush undergrowth, you may encounter unique wildlife such as
  colorful birds, tree-dwelling mammals, and rare reptiles. The sounds of
  chirping birds and rushing water add to the symphony of nature, providing an
  immersive experience in this captivating wilderness.
</p>

<p>
  Traveling further, you'll discover the Atherton Tablelands, a plateau renowned
  for its fertile farmlands, rolling hills, and picturesque lakes. This
  agricultural heartland is dotted with quaint rural towns and farms producing
  an array of fresh produce.
</p>
<p>
  Fields of sugar cane, banana plantations, and dairy farms stretch as far as
  the eye can see, creating a patchwork of vibrant green hues against the
  backdrop of distant mountains. The region is also famous for its waterfalls,
  such as Millaa Millaa Falls, where crystal-clear water tumbles down verdant
  cliffs, offering a refreshing retreat.
</p>

<figure>
  <img
    src="https://mdn.github.io/shared-assets/images/examples/learn/gallery/pic5.jpg"
    alt="A butterfly with red, white, and gold wing sections, sitting in a leaf" />
  <figcaption>A beautiful butterfly seen in the Jungle near Cairns</figcaption>
</figure>

<p>
  No visit to the countryside surrounding Cairns is complete without exploring
  the stunning beaches that line the Coral Sea. From Palm Cove to Mission Beach,
  the coastline is adorned with golden sands, swaying palm trees, and azure
  waters. These idyllic beaches provide the perfect setting for relaxation,
  swimming, and water sports.
</p>
<p>
  Snorkeling enthusiasts can also discover the wonders of the Great Barrier
  Reef, a UNESCO World Heritage Site, which lies just off the coast. This
  vibrant underwater ecosystem teems with an incredible diversity of marine
  life, including colorful coral formations, tropical fish, and sea turtles.
</p>

<p>
  Lastly, the surrounding countryside is home to an impressive array of national
  parks and mountains. Barron Gorge National Park, for instance, showcases
  rugged terrain, deep gorges, and thundering waterfalls.
</p>
<p>
  You can embark on hiking trails that lead to breathtaking viewpoints, offering
  panoramic vistas of the surrounding rainforest-clad mountains and valleys.
  Further west, the towering peaks of the Great Dividing Range present
  opportunities for adventurous hiking and exploring scenic vistas, including
  the iconic Walshs Pyramid near Gordonvale.
</p>
```

We'll start by defining `@keyframes` for the `fade-in` animation we'll apply to our ``.

```css
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
body {
  width: 80%;
  margin: 0 auto;
  font-family: "Helvetica", "Arial";
  font-size: 1.3rem;
}

figure {
  display: block;
  margin: 0 auto;
  max-width: 60%;
  position: relative;
}

img {
  max-width: 100%;
  border: 3px solid black;
}

h1 {
  font-size: 3rem;
}

p {
  line-height: 1.5;
}

figcaption {
  font-size: 1rem;
  padding: 5px;
  position: absolute;
  top: 5px;
  left: 5px;
  border: 3px solid black;
  background: white;
}
```

The first declaration block applies the animation and an animation trigger, along with the animation actions, to the `` element:

1. We use the `animation` shorthand to apply the `fade-in` animation to ``. By itself, without triggers, this would cause the `` to fade into view as soon as the page loads.
2. We use the `animation-trigger` property to delay the start of the animation until the `` element is scrolled into view by identifying which element will provide the triggers, and what those trigger's actions will be. The `animation-trigger` property value components include:
   - A `dashed-ident`, `--t`, which is the identifier set as the value of the `timeline-trigger-name` property on the triggering element.
   - Two `<animation-action>` values, which specify how the animation should behave when the trigger is activated and deactivated (the animation actions). When the trigger is activated, we set the `` element's animation to play forwards. When the trigger is deactivated, we set the `` element's animation to play backwards.

```css
figcaption {
  animation: fade-in 1s ease-in both;
  animation-trigger: --t play-forwards play-backwards;
}
```

The second declaration block creates the animation trigger:

1. We use the `timeline-trigger-name` property to give the `` element an identifying name for triggers created on it. This is the same dashed identifier as the trigger name referenced in the `` element's `animation-trigger` property value.
2. We use the `timeline-trigger-source` property to create the animation trigger type. Specifying the `view()` function means our trigger type is an anonymous view progress timeline, which has a default activation range equal to the `cover` timeline range.

```css
img {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
}
```

By default, the `ViewTimeline` created by the `view()` function tracks the position of the `` element across the block-axis of the nearest parent scroller. The element that is tracked, in this case the ``, is the **subject** or the **tracked element**.

By default, the triggers are activated and deactivated when the tracked element is scrolled to the start and end of the timeline range respectively, in the block direction, causing the `` animation to play forwards and play backwards. Activation occurs when the tracked element enters the **activation range**, and deactivation occurs when the tracked element leaves the **active range**. When the `timeline-trigger-source` is set to `view()`, the default activation and active ranges resolve to `cover`, which is from the point when the tracked element's start border edge starts to enter the scrollport to the point when the tracked element's end border edge completely exits the scrollport.

The example renders like so:

Note how the caption starts to fade in as soon as any part of the image becomes visible in the scrollport, whether you are moving it in from the bottom or the top. It doesn't fade out again until the entire image has moved out of the scrollport, so you won't be able to see the fading out effect; if you scroll the image back into view, the caption will fade in again.

## Creating the trigger on the same element

In the previous example, the trigger was defined on the `` element, and the `` was animated. It is possible to define the trigger on the animated element itself. Let's modify the previous example to create the trigger on the animated `` element.

The HTML is identical to the previous example. The CSS differs only in where the `timeline-trigger-*` properties are set.

This time, the `animation`, `animation-trigger`, `timeline-trigger-name`, and `timeline-trigger-source` properties are all set on the `` element — it will animate when it appears in the scrollport. In the previous example, the `` was the animated element and the `` was the tracked element. Now the caption plays both roles.

```css
figcaption {
  animation: fade-in 1s ease-in both;
  animation-trigger: --t play-forwards play-backwards;
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
}
```

The updated rendering looks like this:

In this case, the `` fades into view when it, rather than the image, first enters into the scrollport.

## Adjusting the trigger activation range

In the previous examples, the trigger activates (`fade-in` starts) as soon as a block edge of the tracked element enters the scrollport at one edge, and deactivates (fade-out starts: `fade-in` is played backwards) when the tracked element has finished exiting the scrollport at the opposite edge. As a result, the fade out is never visible. This is because the default activation and active ranges (see `timeline-range-name`) when using `view()` as the `timeline-trigger-source` are both `cover`.

To make the fade out animation visible, we can offset the start and end of the activation range using the `timeline-trigger-activation-range-start` and `timeline-trigger-activation-range-end` properties, respectively, or the `timeline-trigger-activation-range` shorthand to set both values in a single declaration. Each of these properties can take the following values:

- The `normal` default value.
- A `length-percentage` value to specify a point along the default range.
- A `timeline-range-name` keyword specifying a named range.
- A `timeline-range-name` and a `<length-percentage>` to specify a point along the named range.

Percentages are relative to the length of the `<timeline-range-name>`, which resolves to `cover` for our view progress timeline. Had we set `scroll()` as our `timeline-trigger-source`, the default `<timeline-range-name>` would have resolved to `scroll`. See Timeline range names to learn about the `<timeline-range-name>` values.

The following example will cause the trigger to activate `50%` of the way through the `entry` range (when `50%` of the tracked element has entered the scrollport via one of the scrollport's block edges) and deactivate `0%` of the way through the `exit` range (when `50%` of the tracked element has exited the scrollport's opposite block edge).

```css
timeline-trigger-activation-range: entry 50% exit 0%;
```

Let's apply this to our first example so you can see what the effect is. Our `img` declaration block is updated to the following:

```css
img {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
  timeline-trigger-activation-range: entry 50% exit 0%;
}
```

The updated rendering looks like this:

The animation of the `` is now a bit more useful — it only starts to fade into view when a significant portion of the `` has entered the scrollport at its end edge, and it starts to fade out when the `` has started to exit the scrollport at its start edge. When you scroll the content back down again, the trigger reactivates and the fade-in occurs again at the scrollport's start edge, and deactivation occurs again at the scrollport's end edge.
