---
title: "Fallback options and conditional hiding for overflow (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/anchor_positioning/try_options_hiding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Fallback options and conditional hiding for overflow

When using CSS anchor positioning, an important consideration is ensuring that anchor-positioned elements always appear in a convenient place for the user to interact with them, if at all possible, regardless of where the anchor is positioned. For example, when you scroll the page, anchors and their associated positioned elements will move toward the edge of the viewport. When a positioned element starts to overflow the viewport, you will want to change its position to put it back on the screen again, for example on the opposite side of the anchor.

Alternatively, in some situations it may be preferable to just hide overflowing positioned elements — for example, if their anchors are off-screen their content might not make sense.

This guide explains how to use CSS anchor positioning mechanisms to manage these issues — **position-try fallback options** and **conditional hiding**. Position-try fallback options provide alternative positions for the browser to try placing positioned elements in as they start to overflow, to keep them on-screen. Conditional hiding allows conditions to be specified under which the anchor or a positioned element will be hidden.

> **Note:**
> For information on the basic <example-value> of CSS anchor positioning, see Using CSS anchor positioning.

## Feature summary

If a tooltip is fixed to the top-right of a UI element, when the user scrolls the content so that the UI feature is in the top-right corner of the viewport, that UI feature's tooltip will have scrolled off the screen. CSS anchor positioning solves such problems. The module's `position-try-fallbacks` property specifies one or more alternative position-try fallback options for the browser to try to prevent the positioned element from overflowing.

Position-try fallback options can be specified using:

- Predefined fallback options.
- `position-area` values.
- Custom options defined using the `@position-try` at-rule.

In addition, the `position-try-order` property allows you to specify various options that result in an available position try option being set in preference to the element's initial positioning when it first renders. For example, you might want to initially display the element in a space that has more available height or width.

The shorthand property `position-try` can be used to specify `position-try-order` and `position-try-fallbacks` values in a single declaration.

In some situations, anchor-positioned content does not make sense if the anchor is off-screen, or vice-versa. For example, you might have an anchor containing a quiz question, and answers contained in associated positioned elements, and wish to show them both together or not at all. This can be achieved with conditional hiding, which is managed via the `position-visibility` property. This property takes various values that define conditions under which overflowing elements will be hidden.

## Predefined fallback options

The predefined fallback option values of the `position-try-fallbacks` property (defined as `<try-tactic>`s in the spec) will "flip" the position of the anchor-positioned element across one or both axes if the element would otherwise overflow.

The element can be set to flip across the block axis (`flip-block`), the inline axis (`flip-inline`), or diagonally across an imaginary line drawn from a corner of the anchor through its center to its opposite corner (`flip-start`). These three values flip the element, mirroring its position on an opposite side for the first two values, and an adjacent side for `flip-start`. For example, if an element positioned `10px` above its anchor starts to overflow at the top of the anchor, the `flip-block` value would flip the positioned element to be 10px below its anchor.

In this example, we include two `` elements. The first one will be our anchor element, and the second one will be positioned relative to the anchor:

```html
<div class="anchor">⚓︎</div>

<div class="infobox">
  <p>This is an information box.</p>
</div>
```

We style the `<body>` element to be larger than the viewport so that we can scroll the anchor and the positioned element around in the viewport, both horizontally and vertically:

```css
body {
  width: 1500px;
  height: 500px;
}
```

For illustrative purposes, we absolutely position the anchor so that it appears near the center of the initial `<body>` rendering:

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
  position: absolute;
  top: 100px;
  left: 45%;
}
```

The anchor-positioned element is given fixed positioning and tethered to the anchor's top-left corner using a `position-area`. It is given `position-try-fallbacks: flip-block, flip-inline;` to provide it with some fallback options for moving the positioned element to stop it from overflowing when the anchor gets near the edge of the viewport.

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
  position-area: top left;
  position-try-fallbacks: flip-block, flip-inline;
}
```

> **Note:**
> When multiple position try fallback options are specified, they are separated by commas, and tried in the order they are specified.

Try scrolling the demo so that the anchor starts to get near the edges:

- Move the anchor to the top of the viewport. The positioned element flips to the bottom-left of the anchor to avoid overflowing.
- Move the anchor to the left of the viewport. The positioned element flips to the top-right of the anchor to avoid overflowing.

If you move the anchor towards the top-left corner of the viewport, you'll notice a problem — as the positioned element starts to overflow in the block and inline direction, it flips back to its default top-left position and overflows in both directions, which is not what we want.

This happens because we only gave the browser position options of `flip-block` _or_ `flip-inline`. We didn't give it the option of trying both at the same time. The browser tries the fallback options, looking for one that causes the positioned element to be rendered completely inside the viewport or containing block. If it doesn't find one, it renders the positioned element in its originally-defined rendering position, with no position fallback options applied.

The next section demonstrates how to fix this issue.

## Combining multiple values into one option

It is possible to put multiple predefined try fallback options or custom try option names into a single space-separated try fallback option value within the comma-separated `position-try-fallbacks` list. When trying to apply these fallback options, the browser will combine the individual effects into a single combined fallback option.

Let's use a combined try fallback option to fix the problem we found with the previous demo. The HTML and CSS in this demo are the same, except for the infobox positioning styles. In this case, it is given a third position try fallback option: `flip-block flip-inline`:

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
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  position-area: top left;
  position-try-fallbacks:
    flip-block,
    flip-inline,
    flip-block flip-inline;
}
```

This means that the browser will first try `flip-block` and then try `flip-inline` to avoid overflow. If those fallback options both fail, it will then try combining the two, flipping the element's position in the block _and_ inline directions at the same time. Now when you scroll the anchor towards the top _and_ left edges of the viewport, the positioned element will flip over to the bottom-right.

## Using `position-area` try fallback options

The predefined `<try-tactic>` try fallback options are useful but limited, as they only allow positioned element placement to be flipped across axes. What if you had an anchor-positioned element positioned to the top left of its anchor, and wanted to change its position to directly below the anchor if it started to overflow?

To achieve this, you can use a `position-area` value as a position-try fallback option, including it in the `position-try-fallbacks` list. This automatically creates a try fallback option based on that position area. In effect, it is a shortcut for creating a custom position option that contains only that `position-area` property value.

The following example shows `position-area` position try fallback options in use. We use the same HTML and CSS, except for the infobox positioning. In this case, our position-try fallback options are `position-area` values — `top`, `top-right`, `right`, `bottom-right`, `bottom`, `bottom-left`, and `left`. The positioned element will be reasonably positioned no matter which viewport edge the anchor approaches. This verbose approach is more granular and flexible than the predefined values approach.

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
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  position-area: top left;
  position-try-fallbacks:
    top, top right, right,
    bottom right, bottom,
    bottom left, left;
}
```

> **Note:**
> You can't add `position-area` try fallback options into a space-separated combined position option within a position-try fallback list.

Scroll the page and check out the effect of these position-try fallback options as the anchor nears the edge of the viewport:
