---
title: "Using CSS scroll-triggered animations (part 2 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/animation_triggers/using_scroll-triggered_animations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS scroll-triggered animations (part 2 of 3)

## Setting a custom active range

The **active range** is the range within which a trigger will remain activated once activation has occurred. By default, the active range is the same as the activation range; therefore, in the examples we've seen so far, the range for activation and deactivation has been the same.

It is possible to set a different active range from the activation range using the `timeline-trigger-active-range-start` and `timeline-trigger-active-range-end` properties, or the `timeline-trigger-active-range` shorthand to set both values in a single declaration.

You might want to do this to extend the time an animation has to complete — for example, if you want the animation trigger to activate only within a small range but stay active over a larger range. Only when the tracked element moves out of the active range does the trigger become inactive; after that, you can activate it again by moving the subject back into the activation range.

Let's build on our previous examples to demonstrate the effect of the active range. The HTML is the same, except we've included two identical `` elements with classes of `.one` and `.two`, placed next to one another using flexbox, meaning they'll come in and go out of view at the same time as each other. In each case, the `` will be the tracked element for its sibling animated ``.

```html
<div class="figure-wrapper">
  <figure class="one">
    <img
      src="https://mdn.github.io/shared-assets/images/examples/learn/gallery/pic5.jpg"
      alt="A butterfly with red, white, and gold wing sections, sitting in a leaf" />
    <figcaption>
      A beautiful butterfly seen in the Jungle near Cairns
    </figcaption>
  </figure>

  <figure class="two">
    <img
      src="https://mdn.github.io/shared-assets/images/examples/learn/gallery/pic5.jpg"
      alt="A butterfly with red, white, and gold wing sections, sitting in a leaf" />
    <figcaption>
      A beautiful butterfly seen in the Jungle near Cairns
    </figcaption>
  </figure>
</div>
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

<div class="figure-wrapper">
  <figure class="one">
    <img
      src="https://mdn.github.io/shared-assets/images/examples/learn/gallery/pic5.jpg"
      alt="A butterfly with red, white, and gold wing sections, sitting in a leaf" />
    <figcaption>
      A beautiful butterfly seen in the Jungle near Cairns
    </figcaption>
  </figure>

  <figure class="two">
    <img
      src="https://mdn.github.io/shared-assets/images/examples/learn/gallery/pic5.jpg"
      alt="A butterfly with red, white, and gold wing sections, sitting in a leaf" />
    <figcaption>
      A beautiful butterfly seen in the Jungle near Cairns
    </figcaption>
  </figure>
</div>

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

We apply the same `animation` to both `` elements as in previous examples, but their `animation-trigger` property values reference two different `timeline-trigger-name` values.

```css
figcaption {
  animation: fade-in 0.4s ease-in both;
}

.one figcaption {
  animation-trigger: --t1 play-forwards play-backwards;
}

.two figcaption {
  animation-trigger: --t2 play-forwards play-backwards;
}
```

We set the same `timeline-trigger-source` and the same `timeline-trigger-activation-range` on both `` elements. The `timeline-trigger-name` for each `` element reference the two different dashed identifiers in the previous code block, which means the trigger created on each `` acts as the trigger for the animation on its own sibling ``.

The `timeline-trigger-activation-range: contain 40% contain 60%` declaration means that the trigger activates — and thus the animation starts playing — when the tracked element reaches a narrow range, the middle `20%` of the scrollport, and deactivates when the subject exits that narrow range.

By default, the activation range is the same as the active range. However, we also set a `timeline-trigger-active-range` range of `entry 50% exit 100%` on the second ``. This means that, once faded in, the second `` will only fade out again when the second `` scrolls to `exit 100%`, which is when it has completely left the scrollport.

```css
img {
  timeline-trigger-source: view();
  timeline-trigger-activation-range: contain 40% contain 60%;
}

.one img {
  timeline-trigger-name: --t1;
}

.two img {
  timeline-trigger-name: --t2;
  timeline-trigger-active-range: entry 50% exit 100%;
}
```

> **Note:**
> To have an effect, the `timeline-trigger-active-range` must be set to a larger range than the `timeline-trigger-activation-range`.

```css
.figure-wrapper {
  display: flex;
  gap: 20px;
}

figcaption {
  left: 5px;
  right: -1px;
}
```

This example renders like so:

Scroll the images into view, and then scroll them carefully up and down. Note how both captions fade into view at the same time, at a point roughly one third up the embedded page. The first caption fades out slightly further up, whereas the second caption doesn't fade out until it has been moved completely out of the scrollport. This is because both `` triggers have the same _activation_ range, while the second one has a much larger _active_ range applied to it than the activation range.

## The timeline-trigger shorthand

So far, we've written all the CSS for our scroll-triggered animation as a mixture of shorthand and longhand properties, to effectively explain each of the properties and their values. However, this is cumbersome and wordy. Now that you've understood the concepts, we can use the `timeline-trigger` shorthand to create the shortest possible equivalent. You'll likely opt for this shorthand in your future projects.

Taking these declarations as an example:

```css
img {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
  timeline-trigger-activation-range: contain 25% contain 75%;
  timeline-trigger-active-range: entry 0% exit 100%;
}
```

We can rewrite these in a single line of CSS using the `timeline-trigger` shorthand:

```css
img {
  timeline-trigger: --t view() contain 25% contain 75% / entry 0% exit 100%;
}
```

## Adjusting the animation's action

All the examples so far in this guide have triggered the `fade-in` animation, causing the caption to fade in and fade out. The forwards and backwards play is controlled by the `animation-trigger` declaration set on the animated element:

```css
animation-trigger: --t play-forwards play-backwards;
```

The `animation-action` values `play-forwards` and `play-backwards` specify that the animation plays forwards when the trigger activates, and backwards when the trigger deactivates. The first value is the animation activation action, and the second value is the animation deactivation action.

If we set the following `animation` declaration on the same element:

```css
animation: fade-in 1s ease-in both;
```

The animation only happens once when the trigger is activated, and once in reverse when it is deactivated: we didn't specify an `animation-iteration-count` in our `animation` shorthand, therefore the default value, `1`, is used.

There are other `animation-action` values that can be set to produce different effects. For example:

- `play-once` causes the animation to play only once. Once finished, it won't play again on subsequent activations or deactivations.
- `play` causes the animation to play, in whatever direction it was previously playing in. In contrast, `play-forwards` and `play-backwards` interact with the animation's `playbackRate`, setting it to its absolute positive value or its absolute positive value multiplied by `-1`, respectively. This results in the animation playing forwards or backwards. Note that the `animation-direction` value is not affected.
- `pause` causes the animation to pause. For example, you could set an animation's iteration count to `infinite`, and set the corresponding `animation-trigger` to `--t play pause`: This would cause the animation to play when the trigger is activated, and pause when it deactivates.
- `reset` has the same effect as `pause`, except that additionally it sets the animation progress back to `0`.

Some of these values are designed to be used together. For example, `play-forwards play-backwards` is intended for use in cases where you want to alternate the direction of play in the animation's end visual effect, causing a UI element to "animate in" when it appears on-screen and then "animate out" again when it goes off-screen. On the other hand, `play pause` is common for animating an element as it appears, then pausing the animation as it starts to go off-screen.

Let's look at a brief example — we'll take our first example and change it so that our `` fades in only once, when has completely entered the scrollport, and doesn't fade out or animate again until the page is reloaded.

We set the `animation-trigger` property's `animation-action` to `play-once` so that the animation only plays once when the `` first enters the activation range. We've also set the `timeline-trigger-activation-range` to `contain` so that the animation only plays when the `` is completely on-screen — it only plays once, so we don't want you to miss it.

```css
figure {
  animation: fade-in 1s ease-in both;
  animation-trigger: --t play-once;

  timeline-trigger: --t view() contain;
}
```

This example renders like so:

When you first scroll the `` on-screen, it will fade in. After that, it will stay at `100%` opacity regardless of how many times you scroll it up and down the scrollport. You can only get it to fade in again by refreshing the page (or reloading the embedded example's ``).

## Trigger scope

If multiple triggers use the same `timeline-trigger-name`, because of how triggers are determined by the browser by default, the triggers will be associated with the last element in the HTML source order that has that `timeline-trigger-name` value. This is likely not the desired behavior.

For example, if a document contains multiple repeated components, each containing a scroll-triggered animation where the animated element and tracked element are different elements, all of the animated elements will have their animations controlled by the last component's trigger, unless you use a different `timeline-trigger-name` in each component, or scope the name by subtree.

The `trigger-scope` property limits the visibility, or "scope", of a `timeline-trigger-name` value to a specific subtree. The result is that each animated element can only have its animation triggered by a trigger created within the same scoped subtree. See the `trigger-scope` reference page for details of how this works and a `trigger-scope` example.
