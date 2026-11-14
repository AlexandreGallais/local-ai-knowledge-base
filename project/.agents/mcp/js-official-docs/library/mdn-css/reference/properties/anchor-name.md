---
title: "`anchor-name` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/anchor-name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `anchor-name` CSS property

The **`anchor-name`** CSS property enables defining an element as an **anchor element** by giving it one or more identifying **anchor names**. Each name can then be set as the value of a positioned element's `position-anchor` property to associate it with the anchor.

## Syntax

```css
/* Single values */
anchor-name: none;
anchor-name: --name;

/* Multiple values */
anchor-name: --name, --another-name;

/* Global values */
anchor-name: inherit;
anchor-name: initial;
anchor-name: revert;
anchor-name: revert-layer;
anchor-name: unset;
```

### Values

This property is specified as a single value from the following list:

- `none`
    The default value. Setting `anchor-name: none` on an element means that it is not defined as an anchor element. If the element was previously defined as an anchor and associated with a positioned element, setting `anchor-name: none` disassociates the two.

- `dashed-ident`
    One or more comma-separated arbitrary custom identifiers defining the name or names of the anchor, which can then be referenced in a `position-anchor` property.

## Description

To position an element relative to an anchor element, the positioned element requires three features: an association, a position, and a location. The `anchor-name` and `position-anchor` properties provide an explicit association.

The anchor element accepts one or more `<dashed-ident>` anchor names set on it via the `anchor-name` property. When one of those names is then set as the value of the `position-anchor` property of an element that has its `position` set to `absolute` or `fixed`, the two elements are associated. The two elements become tethered by setting a location on the associated element relative to the anchor, making it an "anchor-positioned" element.

If multiple anchor elements have the same anchor name set on them, and that name is referenced by the `position-anchor` property value of a positioned element, that positioned element will be associated with the last anchor element with that anchor name in the source order.

Anchor positioning changes the containing block of anchor-positioned elements, making its `position` relative to its anchor rather than to the nearest positioned ancestor element.

To tether and place a positioned element in a specific location relative to an anchor element, an anchor positioning feature is needed, such as the `anchor()` function (set within an inset property's value) or the `position-area` property.

You cannot associate a positioned element with an anchor element if the anchor is hidden, such as with `display: none` or `visibility: hidden`, or if the anchor is part of the skipped contents of another element due to it having `content-visibility: hidden` set on it.

The `anchor-name` property is supported on all elements that generate a principal box. This means that pseudo-elements, including generated content created using `::before` and `::after`, and UI features like the `range` input thumb (`::-webkit-slider-thumb`) can be anchor elements. Pseudo elements are implicitly anchored to the same element as the pseudo-element's originating element, unless otherwise specified.

For more information on anchor features and usage, see the CSS anchor positioning module and the Using CSS anchor positioning guide.

## Examples

### Basic usage

This example tethers a positioned element to an anchor, positioning the element to the right of the anchor.

#### HTML

We specify two `` elements; an anchor element with a class of `anchor` and a positioned element with a class of `infobox`.

We also include some filler text around the two ``s to make the `<body>` taller so that it will scroll.

```html
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

#### CSS

We first declare the `anchor` `` as an anchor element by setting an anchor name on it via the `anchor-name` property:

```css
body {
  width: 50%;
  margin: 0 auto;
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
```

```css
.anchor {
  anchor-name: --my-anchor;
}
```

We associate the second `` with the anchor element by setting its anchor name as the value of the positioned element's `position-anchor` property. We then set the positioned element's:

- `position` property to `fixed`, converting it to an _anchor-positioned element_ so it can be positioned relative to the anchor's position on the page.
- `left` and `top` properties to `anchor()` functions with values of `right` and `top` respectively. This positions the infobox's left edge flush to the right edge of its anchor, and its top edge relative to the top edge of its anchor.
- `margin-left` to `10px`, creating space between the anchor positioned element and its anchor.

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
  position-anchor: --my-anchor;
  position: fixed;
  left: anchor(right);
  top: anchor(top);
  margin-left: 10px;
}
```

#### Result

Scroll the page to see how the infobox is positioned relative to the anchor. As the anchor scrolls upwards, the positioned element moves along with it.

### Multiple positioned elements

This example demonstrates how you can associate multiple positioned elements with one anchor.

#### HTML

The HTML is the same as for the previous example, except this time we have multiple positioned element ``s with different `id`s to identify them.

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus
  elementum sagittis vitae et.
</p>

<div class="anchor">⚓︎</div>

<div class="infobox" id="infobox1">
  <p>This is an information box.</p>
</div>

<div class="infobox" id="infobox2">
  <p>This is another information box.</p>
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

#### CSS

We declare the `anchor` `` as an anchor element using the `anchor-name` property, giving it an anchor name as before.

```css
body {
  width: 50%;
  margin: 0 auto;
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
```

```css
.anchor {
  anchor-name: --my-anchor;
}
```

Each of the two positioned elements are associated with the anchor element by setting its anchor name as the positioned element's `position-anchor` property value. Both are also given `fixed` positioning, making them **anchor positioned elements**. The positioned elements are then positioned in different places relative to the anchor using a combination of inset properties as seen above and `align-self` / `justify-self` properties with a value of `anchor-center`, centrally aligning the infobox to the center of the anchor in the inline/block directions respectively.

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
  position-anchor: --my-anchor;
  position: fixed;
}

#infobox1 {
  left: anchor(right);
  align-self: anchor-center;
  margin-left: 10px;
}

#infobox2 {
  bottom: anchor(top);
  justify-self: anchor-center;
  margin-bottom: 15px;
}
```

#### Result

Scroll the page to see how both of the infoboxes are tethered to the anchor.

### Multiple anchor names

This example demonstrates how an anchor element can have more than one anchor name.

#### HTML

The HTML is the same as for the previous example.

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus
  elementum sagittis vitae et.
</p>

<div class="anchor">⚓︎</div>

<div class="infobox" id="infobox1">
  <p>This is an information box.</p>
</div>

<div class="infobox" id="infobox2">
  <p>This is another information box.</p>
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

#### CSS

The CSS is the same as the previous example too, except we include two comma-separated names in the target's `anchor-name` property value and each positioned element has a different value for `position-anchor`.

```css
body {
  width: 50%;
  margin: 0 auto;
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
.anchor {
  anchor-name: --anchor1, --anchor2;
}

.infobox {
  position: fixed;
}

#infobox1 {
  position-anchor: --anchor1;
  left: anchor(right);
  align-self: anchor-center;
  margin-left: 10px;
}

#infobox2 {
  position-anchor: --anchor2;
  bottom: anchor(top);
  justify-self: anchor-center;
  margin-bottom: 15px;
}
```

#### Result

Scroll the page to see how both of the infoboxes are tethered to the anchor.

## See also

- `position-anchor`
- `anchor-scope`
- HTML `anchor` attribute
- CSS anchor positioning module
- Using CSS anchor positioning guide
