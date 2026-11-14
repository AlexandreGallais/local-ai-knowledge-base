---
title: "Creating an irregular nav menu with border-shape"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/borders_and_box_decorations/border_shape_nav_menu/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Creating an irregular nav menu with border-shape

The CSS `border-shape` property can be applied to elements to create precisely-shaped containers such as speech bubbles, abstract tooltip designs, and more, enabling many new creative ideas to be put into production without the need for workarounds or hacks. You can learn all about the property and see basic <example-value> in action on the property reference page.

In this guide, we show you how to use `border-shape` to create an irregular animated navigation menu with each nav item shaped like a jigsaw piece.

## Defining the nav menu markup

Our HTML is fairly typical for a navigation menu — a list of links.

```html
<ul>
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

## Setting the basic page styles

The basic page setup styles are as follows. We apply some rudimentary font styles, use `height` to cause the `<body>` to fill the viewport, and use flexbox to place the nav menu in the center of the screen.

```css
* {
  box-sizing: border-box;
}

html {
  height: 100%;
  font-family: "Helvetica", "Arial";
  font-size: 1.2rem;
}

body {
  margin: 0;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Applying the general nav styles

First, we style the `` by removing the default `list-style-type` and `padding` and setting a `display` value of `flex` to lay out the contained `` elements in a row. We then set a `gap` value of `0` and apply a `transition`, so that when the `` state changes, a change in the `gap` value animates smoothly.

```css
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 0;
  transition: gap 0.6s;
}
```

Next, we style the `` elements. We want each nav item to be square, so we set an equal `width` and `height`.

```css
li {
  width: 160px;
  height: 160px;
}
```

Next, we style the `` elements inside the list items. We start by removing the default `text-decoration` and setting the `color` to `black`. We then set a `width` and `height` of `100%` to make the `` elements fill the full area of the `` elements, then use flexbox to center their text horizontally and vertically.

We then set `box-shadow` and `text-shadow` properties on the links, plus a `transition` so that any property value changes are animated smoothly when the element's state changes.

```css
a {
  text-decoration: none;
  color: black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow:
    2px 0px 2px rgb(0 0 0 / 0.5),
    inset 3px 3px 3px rgb(255 255 255 / 0.5);
  text-shadow: 1px 1px 1px rgb(0 0 0 / 0.5);
  transition: all 0.6s;
}
```

We then give each jigsaw piece a different color:

```css
li:nth-child(1) a {
  background-color: #2de1fc;
}

li:nth-child(2) a {
  background-color: #2afc98;
}

li:nth-child(3) a {
  background-color: #09e85e;
}

li:nth-child(4) a {
  background-color: #16c172;
}
```

## Handling the border shape

Now it's time to set the `border-shape` for each nav item to get the jigsaw piece look we are after. For variety, we've shaped each odd-numbered `` element like a downwards-pointing jigsaw-piece, and each even-numbered `` element like an upwards-pointing jigsaw-piece:

```css
li:nth-child(even) a {
  border-shape: shape(
      from 0% 0%,
      hline to 33%,
      arc by 33% 0% of 16% 20% small cw,
      hline to 100%,
      line to 100% 33%,
      arc by 0% 33% of 20% 16% small cw,
      line to 100% 100%,
      hline to 66%,
      arc by -33% 0% of 16% 20% small ccw,
      hline to 0%,
      line to 0% 66%,
      arc by 0% -33% of 20% 16% small ccw,
      close
    )
    content-box;
}

li:nth-child(odd) a {
  border-shape: shape(
      from 0% 0%,
      hline to 33%,
      arc by 33% 0% of 16% 20% small ccw,
      hline to 100%,
      line to 100% 33%,
      arc by 0% 33% of 20% 16% small cw,
      line to 100% 100%,
      hline to 66%,
      arc by -33% 0% of 16% 20% small cw,
      hline to 0%,
      line to 0% 66%,
      arc by 0% -33% of 20% 16% small ccw,
      close
    )
    content-box;
}
```

This immediately creates an issue — the notches on the jigsaw pieces that extend out from the original `` area aren't filled by the `` elements' background colors.

There is a solution to this problem. We've deliberately included the `content-box` `<geometry-box>` value after each `shape()` function in the previous two rules. This means the shapes will be drawn relative to the elements' content boxes, and any applied `padding` won't be set inside the shape. Instead, the padding will be placed outside the shape, causing it to get smaller and forcing the background color to fill up the notches.

The required `padding` is set like so:

```css
a {
  padding: 24px;
}
```

> **Note:**
> You can see what the background problem looks like by inspecting the live example in your browser's developer tools and disabling the `padding` applied to the `` elements.

The `padding` causes the jigsaw pieces to get smaller, so there are gaps between them. We want them to touch initially, so we set a large negative `margin-right` value on each list item to bring them together:

```css
li {
  margin-right: -47px;
}
```

A side-effect of this `margin-right` setting is that all of the `` items are moved to the right, so the nav menu is no longer horizontally centered. To fix this, we use relative positioning to move the `` back to the left:

```css
ul {
  position: relative;
  right: 23.5px;
}
```

Finally, we apply some style updates on `:hover` and `:focus` that, when combined with the `transition` properties we set earlier, produce some animated effects on interaction with the nav items. We increase the `gap` set on the `` flexbox layout when it is hovered over or focused. To handle the focus state, we use the `:has` pseudo-class to select the entire `` when any `` inside it is focused.

```css
ul:hover,
ul:has(a:focus) {
  gap: 30px;
}
```

We then set an increased `brightness` `filter`, `scale` factor, and outer `box-shadow` on the `` elements themselves when they are hovered over or focused, making them appear brighter and raised up on interaction.

```css
a:hover,
a:focus {
  filter: brightness(1.2);
  scale: 1.1;
  box-shadow:
    5px 0px 10px rgb(0 0 0 / 0.5),
    inset 3px 3px 3px rgb(255 255 255 / 0.5);
}
```

## Result

Hover over or focus the nav items to see the animated effects. Note how naturally the different applied effects work with the `border-shape` values.

```css
@supports not (border-shape: circle(50%)) {
  body::before {
    content: "Your browser does not support the 'border-shape' property.";
    font-family: sans-serif;
    background-color: wheat;
    padding: 1rem 0;
    text-align: center;

    z-index: 1;
    position: fixed;
    inset: 40% 0 auto;
  }
}
```

## See also

- `border-shape`
- CSS borders and box decorations module
- CSS backgrounds and borders module
- border-shape: the future of the non-rectangular web by Una Kravets (2026)
- Get Ready For the Powerful CSS border-shape Property! on CSS Tricks (2026)
