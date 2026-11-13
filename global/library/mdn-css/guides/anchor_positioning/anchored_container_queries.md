---
title: "Using anchored container queries (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/anchor_positioning/anchored_container_queries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using anchored container queries

CSS anchor positioning includes mechanisms for providing fallback options. These are alternative positions that the browser can try placing an anchor-positioned element in, relative to its anchor, to put it back on-screen if the positioned element starts to overflow the viewport.

**Anchored container queries** further increase the usefulness of anchor positioning fallback options by enabling different styling of the anchor-positioned element depending on which fallback position it is placed in. This guide shows how to use anchored container queries and provides a couple of examples.

> **Note:**
> For information on the basic <example-value> of CSS anchor positioning, see Using CSS anchor positioning.

## Feature summary

When positioning a tooltip relative to a UI element using anchor positioning, it is useful to provide `position-try` fallback options, via the `position-try-fallbacks` property. These can be used to ensure that the tooltip is displayed on-screen for as long as possible.

For example, if the tooltip is placed above the UI element it is anchored to by default, if the user scrolls upward you can use fallbacks to move the tooltip below the element just before the tooltip goes off-screen.

One problem this doesn't solve on its own is updating the styling of the anchor-positioned element to suit the different fallback options. For example, it is common to include a small arrow on the tooltip that points to the anchor element it is associated with, improving UX by making the visual association clearer. When the tooltip moves to a different position, the position and orientation of the arrow must also change, otherwise it will look wrong.

To solve this problem, you can use anchored container queries. These extend the functionality of CSS container queries to enable you to detect when a specific fallback option is applied to an anchor-positioned element, and apply CSS to its descendants as a result. Specifically, anchored container queries rely on two features:

- The `container-type` property `anchored` value: Apply this to the anchor-positioned element to start detecting when different fallback options are applied to it.
- The `@container` at-rule `anchored()` function: This is given a `fallback` descriptor as an argument. The descriptor's value is a `position-try-fallbacks` value.

For example, let's say we have a tooltip element that is positioned above its anchor by default via a `position-area` value of `top`, but has a `position-try-fallbacks` value of `flip-block` specified. This will cause the tooltip to flip in the block direction to the bottom of its anchor when it starts to overflow the top of the viewport. If we want to detect when the fallback is applied to the tooltip, we first need to set `container-type: anchored` on it to turn it into an anchored query container.

```css
.tooltip {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top;
  position-try-fallbacks: flip-block;
  container-type: anchored;
}
```

With this in place, we can now write a container query like so:

```css
@container anchored(fallback: flip-block) {
  /* Descendant styles here */
}
```

The query test — `anchored(fallback: flip-block)` — will return true when the `flip-block` fallback option is applied to the tooltip, in which case the styles specified within the `@container` block will be applied. You might for example want to change the position and orientation of an arrow so that it points upwards rather than downwards, or change the direction of a gradient.

> **Note:**
> Bear in mind that, as with all container queries, the applied styles can only affect descendants of the container, not the container itself. This might require you to apply some of your positioned element styles to a wrapper element inside it, rather than to the element itself, as demonstrated in Multiple fallbacks example.

## Basic usage example

This example includes an anchor element that has an infobox positioned relative to it.
Initially, the infobox is positioned above the anchor and includes an arrow pointing down towards the anchor. We include a position try fallback so that the infobox moves below the anchor when the content scrolls up enough that the infobox starts to scroll off the top of the viewport. In addition, we use an anchored container query to change styles once the fallback kicks in, moving the arrow and pointing it upwards instead.

The anchor and infobox are represented by two `` elements, as shown below. They are surrounded by text content in the final rendering to cause the page to scroll, but we've hidden it for brevity:

```html
<div class="anchor">⚓︎</div>

<div class="infobox">Infobox</div>
```

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>

<p>
  Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. In arcu
  cursus euismod quis viverra nibh cras pulvinar. Vulputate ut pharetra sit amet
  aliquam.
</p>

<div class="anchor">⚓︎</div>

<div class="infobox">Infobox</div>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>
```

In our CSS, we start by specifying the `anchor` `` as an anchor element by giving it an `anchor-name` of `--my-anchor`.

```css
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}

p {
  font-size: 1.4em;
  line-height: 1.5;
}

.anchor {
  font-size: 2em;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: blue;
  width: fit-content;
  padding: 5px 10px;
}

.infobox {
  color: white;
  background-color: black;
  font-size: 1.4em;
  padding: 10px;
  margin: 1rem;
  border-radius: 10px;
}

.infobox::before {
  color: black;
  font-size: 1rem;
  margin: 0;
  line-height: 0.5;
  left: 0;
  width: 100%;
  text-align: center;
}

@supports not (container-type: anchored) {
  body::before {
    content: "Your browser does not support anchored container queries.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
.anchor {
  anchor-name: --my-anchor;
}
```

Next, we give the `infobox` `` a `position` value of `fixed` and a `position-anchor` value of `--my-anchor` to associate it with the anchor element. We then give the infobox a `position-area` value of `top` to position it above the anchor element and a `position-try-fallbacks` value of `bottom` so that the infobox will be moved below the anchor when it starts to overflow the top of the viewport as the content is scrolled upwards.

Finally, we set a `container-type` value of `anchored` on the infobox to designate it as an anchored query container, meaning that we can now detect when different `position-try-fallbacks` are active on the infobox via `@container` at-rules, and update styles on its descendants as a result.

```css
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  position-area: top;
  position-try-fallbacks: bottom;
  container-type: anchored;
}
```

Now we'll add the arrow to the infobox using generated content on its `::before` pseudo-element. We set the pseudo-element's `content` property to a suitable down arrow icon, position it absolutely, and set its `top` property to `105%` to position it at the bottom of the infobox (we set it to more than `100%` so that it visually matches up with the position of the corresponding up arrow).

```css
.infobox::before {
  content: "▼";
  position: absolute;
  top: 105%;
}
```

Next we add the anchored container query. We include a `@container` at-rule with its test defined as `anchored(fallback: bottom)`. This means that when the `bottom` position-try fallback is applied to the infobox, the CSS inside the at-rule is applied to the document. Inside, we define alternative styling for the infobox `::before` pseudo-element that swaps out the down arrow icon for an up arrow and positions it at the top of the infobox.

```css
@container anchored(fallback: bottom) {
  .infobox::before {
    content: "▲";
    bottom: 100%;
    top: auto;
  }
}
```

> **Note:**
> There is more CSS included in this example to handle the basic <example-value> of all the elements, but we've only shown you the parts relevant to anchored container queries. To see the full code, open the example in the MDN Playground by pressing the "Play" button on one of the code blocks or the live rendering.

This example renders like so:

Try scrolling the demo so that the anchor moves near to the top of the viewport and note how, not only does the infobox move below the anchor to remain on the screen, but the styling also updates so that the arrow icon still works for the new infobox position.

If you scroll the anchor back down towards the bottom of the viewport, the infobox will move back up above it again. We don't need to specify an additional `position-try-fallbacks` value of `top` to achieve this because `position-area: top` is the infobox's default provided position. If the provided fallbacks don't stop the anchor-positioned element from overflowing, the browser will revert to its default position.
