---
title: "Fallback options and conditional hiding for overflow (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/anchor_positioning/try_options_hiding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Fallback options and conditional hiding for overflow (part 2 of 2)

## Custom fallback options

To use custom position fallback options that aren't available via the above mechanisms, you can create your own with the `@position-try` at-rule. The syntax is:

```plain
@position-try --try-fallback-name {
  descriptor-list
}
```

The `--try-fallback-name` is a developer-defined name for the position try fallback option. This name can then be specified within the comma-separated list of try fallback options within the `position-try-fallbacks` property value. If multiple `@position-try` rules have the same name, the last one in the document order overrides the others. Avoid using the same name for your try fallback options _and_ your anchor or custom property names; it doesn't invalidate the at-rule, but it will make your CSS very difficult to follow.

The `descriptor-list` defines the property values for that individual custom try fallback option, including how the positioned element should be placed and sized, and any margins. The limited list of property descriptors allowed includes:

- `position-area`
- Inset properties
- Margin properties (e.g., `margin-left`, `margin-block-start`)
- self-alignment properties
- Sizing properties (`width`, `block-size`, etc.)
- `position-anchor`

The values you include in the at-rule get applied to the positioned element if the named custom-try fallback option gets applied. If any of the properties were previously set on the positioned element, those property values get overridden by the descriptor values. If the user scrolls, causing a different try fallback option or no try fallback option to be applied, the values from the previously-applied try fallback option are unset.

In this example, we set up and use several custom try fallback options. We use the same base HTML and CSS code as in the previous examples.

We start by defining four custom try fallback options using `@position-try`:

```html
<div class="anchor">⚓︎</div>

<div class="infobox">
  <p>This is an information box.</p>
</div>
```

```css
body {
  width: 1500px;
  height: 500px;
}

.anchor {
  font-size: 1.8rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  width: fit-content;
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px;
}

.anchor {
  anchor-name: --my-anchor;
  position: absolute;
  top: 100px;
  left: 45%;
}

.infobox {
  color: darkblue;
  background-color: azure;
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
}
```

```css
@position-try --custom-left {
  position-area: left;
  width: 100px;
  margin-right: 10px;
}

@position-try --custom-bottom {
  position-area: bottom;
  margin-top: 10px;
}

@position-try --custom-right {
  position-area: right;
  width: 100px;
  margin-left: 10px;
}

@position-try --custom-bottom-right {
  position-area: bottom right;
  margin: 10px 0 0 10px;
}
```

Once our custom try fallback options are created, we can include them in the position list by referencing their names:

```css
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  position-area: top;
  width: 200px;
  margin-bottom: 10px;
  position-try-fallbacks:
    --custom-left, --custom-bottom, --custom-right, --custom-bottom-right;
}
```

Note that our default position is defined by `position-area: top`. When the infobox isn't overflowing the page in any direction, the infobox sits above the anchor, and the position-try fallback options set in the `position-try-fallbacks` property are ignored. Also, note that the infobox has a fixed width and bottom margin set. These values will change as different position-try fallback options are applied.

If the infobox starts to overflow, the browser tries the position options listed in the `position-try-fallbacks` property:

- The browser first tries the `--custom-left` fallback position. This moves the infobox to the left of the anchor, adjusts the margin to suit, and also gives the infobox a different width.
- Next, the browser tries the `--custom-bottom` position. This moves the infobox to the bottom of the anchor, and sets an appropriate margin. It doesn't include a `width` descriptor, so the infobox returns to its default width of `200px` set by the `width` property.
- The browser next tries the `--custom-right` position. This works much the same as the `--custom-left` position, with the same `width` descriptor value applied, but the `position-area` and `margin` values are mirrored to place the infobox appropriately to the right.
- If none of the other fallbacks succeed in stopping the positioned element from overflowing, the browser tries the `--custom-bottom-right` position as a last resort. This works in much the same way as the other fallback options, but it places the positioned element to the bottom-right of the anchor.

If none of the fallbacks succeed in stopping the positioned element from overflowing, the position will revert to the initial `position-area: top;` value.

> **Note:**
> When a position try fallback option is applied, its values will override the default values set on the positioned element. For example, the default `width` set on the positioned element is `200px`, but when the `--custom-right` position try fallback option is applied, its width is set to `100px`.

Scroll the page and check out the effect of these position-try fallback options as the anchor nears the edge of the viewport:

## Styling anchor-positioned elements based on active fallback

One problem the above functionality doesn't solve is updating the styling of an anchor-positioned element to suit its different fallback options. For example, it is common to include a small arrow on a tooltip that points to the anchor element it is associated with, improving UX by making the visual association clearer. When the tooltip moves to a different position, you'll need to change the position and orientation of the arrow, otherwise it will look wrong.

To solve this problem, you can use anchored container queries. These extend the functionality of CSS container queries to enable you to detect when a specific fallback option is applied to an anchor-positioned element, and apply CSS to its descendants as a result. Specifically, anchored container queries rely on two features:

- The `container-type` property `anchored` value: Apply this to the anchor-positioned element to start detecting when different fallback options are applied to it.
- The `@container` at-rule `anchored` keyword: This is followed by a set of parentheses inside which the `fallback` descriptor is included. The descriptor's value is a `position-try-fallbacks` value.

For example, let's say we have an anchor-positioned tooltip element that is positioned above its anchor by default via a `position-area` value of `top`, but has a `position-try-fallbacks` value of `flip-block` specified. This will cause the tooltip to flip in the block direction to the bottom of its anchor when it starts to overflow the top of the viewport. If we want to detect when the fallback is applied to the tooltip, we first need to set `container-type: anchored` on it to turn it into an anchored query container.

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

The query test — `anchored(fallback: flip-block)` — will return true when the `flip-block` fallback option is applied to the tooltip, in which case the styles specified within the `@container` block will be applied. You might for example want to change the position and orientation of the arrow icon so that it continues to point towards the anchor, change the direction of a gradient, etc.

For more information on anchored container queries and some examples, see Using anchored container queries.

## Using `position-try-order`

The `position-try-order` property has a slightly different focus from the rest of the position-try features, in that it influences which position-try fallback option is applied when the positioned element is first displayed, rather than when it is being scrolled. For example, you might want to initially display the element in a space that has more available height or width than the default initial position.

The browser tests the available `position-try-fallbacks` to find which one gives the anchor-positioned element the most space in the specified direction. It will then apply that option, overriding the element's initial styling when the page first renders.

Check out the `position-try-order` reference page for more information and a live example that demonstrates the property's effect.

## Conditionally hiding anchor-positioned elements

In some situations, you might want to hide an anchor-positioned element. For example, if the anchor element is clipped because it's too close to the edge of the viewport, you might want to just hide its associated element altogether. The `position-visibility` property allows you to specify conditions under which positioned elements are hidden.

By default, the positioned element is `always` displayed. The `no-overflow` value will **strongly hide** the positioned element if it starts to overflow its containing element or the viewport.

The `anchors-visible` value, on the other hand, strongly hides the positioned element if its associated anchor(s) are _completely_ hidden, either by overflowing its containing element (or the viewport) or being covered by other elements. The positioned element will be visible if any part of the anchor(s) is still visible.

A strongly hidden element acts as though it and its descendant elements have a `visibility` value of `hidden` set, regardless of what their actual `visibility` value is.

Let's see this property in action.

This example uses the same HTML and CSS as in the previous examples, with the infobox tethered to the anchor's bottom edge. The infobox is given `position-visibility: no-overflow;` to hide it completely when it is scrolled upwards to the point where it starts to overflow the viewport.

```html
<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique.
</p>

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus
  elementum sagittis vitae et.
</p>

<div class="anchor">⚓︎</div>

<div class="infobox">
  <p>This is an information box.</p>
</div>

<p>
  Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. In arcu
  cursus euismod quis viverra nibh cras pulvinar. Vulputate ut pharetra sit amet
  aliquam.
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

```css
.anchor {
  font-size: 1.8rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  width: fit-content;
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px;
}

.anchor {
  anchor-name: --my-anchor;
}

body {
  width: 50%;
  margin: 0 auto;
}
```

```css
.infobox {
  color: darkblue;
  background-color: azure;
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
}
```

```css
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  margin-bottom: 5px;
  position-area: top span-all;
  position-visibility: no-overflow;
}
```

Scroll down the page and note how the positioned element is hidden once it reaches the top of the viewport:

## See also

- CSS anchor positioning module
- Using CSS anchor positioning
- Learn: CSS positioning
- CSS logical properties and values module
- Learn: Sizing items in CSS
