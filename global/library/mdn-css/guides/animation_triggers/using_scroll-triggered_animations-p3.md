---
title: "Using CSS scroll-triggered animations (part 3 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/animation_triggers/using_scroll-triggered_animations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS scroll-triggered animations (part 3 of 3)

## Multiple scroll-triggered animations

In previous examples, we set only a single scroll-triggered animation on an element; however, all of the `animation-*` and `timeline-trigger-*` properties discussed in this guide accept a comma separated list of values to enable triggering multiple animations from multiple triggers. In this section we'll build a slightly more complex example with multiple scroll-triggered animations on the same element.

The `animation-trigger` property works in exactly the same way as the `animation` shorthand property and the other animation longhand properties with regards to setting multiple values. If multiple `animation-name` values are set, but only a single `animation-trigger` value is set, the `animation-trigger` will apply to all the animations. If two `animation-trigger` values are set, they will cycle between the animations until all of them have an `animation-trigger` value set. And so on.

This example progressively animates an element — applying further animations when new triggers are activated as the page scrolls. As the user scrolls, the element first slides in from the right of the screen, then reveals its contents, then slides down the screen and changes its background color.

The HTML is similar to previous examples except that we have included a `` element at the top containing some highlighted content, and some empty `` elements interspersed throughout our main content that will have triggers defined on them to trigger our animations.

```html
<section>
  <h2>This content is animated!</h2>

  <p>
    The countryside surrounding Cairns, located in eastern Australia, is a
    breathtakingly beautiful region characterized by diverse landscapes, lush
    greenery, and unique natural wonders.
  </p>
</section>

<h1>Information about Cairns</h1>

...
```

```html
<section>
  <h2>This content is animated!</h2>

  <p>
    The countryside surrounding Cairns, located in eastern Australia, is a
    breathtakingly beautiful region characterized by diverse landscapes, lush
    greenery, and unique natural wonders.
  </p>
</section>

<h1>Information about Cairns</h1>

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

<div id="one"></div>

<p>
  Fields of sugar cane, banana plantations, and dairy farms stretch as far as
  the eye can see, creating a patchwork of vibrant green hues against the
  backdrop of distant mountains. The region is also famous for its waterfalls,
  such as Millaa Millaa Falls, where crystal-clear water tumbles down verdant
  cliffs, offering a refreshing retreat.
</p>

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

<div id="two"></div>

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

<div id="three"></div>

<p>
  Walshs Pyramid is located within Wooroonooran National Park south of Cairns,
  Queensland, Australia. An annual footrace to its summit is held on the third
  Saturday in August. For experienced hikers, the ascent and descent can take 4
  to 6 hours. The vegetation on the mountain is fairly dense with exposed rocks
  which can make the surface very slippery after rain.
</p>
```

Initially, the highlighted content `` is hidden off-screen. Our CSS starts by styling the `` element, giving it a `position` of `fixed` and positioning it near the top-left of the scrollport. We also define the initial styles that we will be animating from and returning to. We then set three `animation` values, which will make the `` element `slide-from-right`, then `reveal` its contents, then `slide-down` the screen and change its background color. We also set an `animation-trigger` for each one of the animations so that they will be triggered by different triggers being activated.

We want the finished state of each animation to apply throughout, after it is reached, therefore it is important to set appropriate `animation-fill-mode` values on the animations and `<animation-action>` values on the `animation-trigger` values to achieve this. We had to set an `animation-fill-mode` of `forwards` rather than `both` on the last animation because there is no `from` keyframe.

```css
body {
  overflow-x: hidden;
  font-family: "Helvetica", "Arial";
  font-size: 1.3rem;
  width: 80%;
  margin: 0 auto;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2rem;
}

p {
  font-size: 1.5rem;
  line-height: 1.5;
}

section {
  background: red;
  color: #ffffff00;
  padding: 10px;
  width: 400px;
  height: 50px;
}

section p {
  font-size: 1.2rem;
}
```

```css
section {
  position: fixed;
  left: 1em;
  top: 1em;
  height: 240px;
  background: red;
  width: 400px;
  transform-origin: top;

  animation:
    slide-from-right 1s both,
    reveal 1s both,
    slide-down 1s forwards;

  animation-trigger:
    --t1 play-forwards pause,
    --t2 play-forwards pause,
    --t3 play-forwards pause;
}
```

Next, we create triggers on the `` elements, setting their `timeline-trigger-name` equal to the identifiers specified in the `` elements' `animation-trigger` property values. This means that as the user scrolls, when each tracked `` enters the scrollport, a different animation is activated. In this case, our tracked elements are invisible — they don't contain any useful content and are only here to create the triggers.

```css
#one {
  timeline-trigger: --t1 view();
}

#two {
  timeline-trigger: --t2 view();
}

#three {
  timeline-trigger: --t3 view();
}
```

Finally, we define the animation `@keyframes` referenced in the `` element's `animation` property earlier on.

```css
@keyframes slide-from-right {
  from {
    translate: 400%;
  }
  to {
    translate: 0;
  }
}

@keyframes reveal {
  from {
    color: #ffffff00;
    transform: scaleY(0.2);
  }
  to {
    color: white;
    transform: scaleY(1);
  }
}

@keyframes slide-down {
  to {
    translate: 0 100%;
    background: blue;
  }
}
```

```css
@supports not (timeline-trigger-name: --t) {
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

This example renders as follows:

Try carefully scrolling the example, and note how each animation is applied to the `` when each `` is scrolled to.

### Multiple triggers for the same animation

If you have an animated element, and you want to define triggers on multiple different elements that all trigger the same animation, you need to specify the same named animation multiple times on the animated element, and then give each instance of that animation a different trigger. See Multiple triggers for the same animation for more information.

## See also

- CSS animation triggers module
- CSS animations module
- CSS scroll-driven animations module
- Using the Web Animations API
- CSS scroll-triggered animations are coming! on developer.chrome.com (2025)
