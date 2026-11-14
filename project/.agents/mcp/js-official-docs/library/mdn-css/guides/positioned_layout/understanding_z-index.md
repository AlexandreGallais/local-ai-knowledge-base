---
title: "Understanding z-index"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/positioned_layout/understanding_z-index/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding z-index

In the most basic cases, when text, images, and other elements are arranged on the page without overlapping, HTML pages can be considered two-dimensional. In such cases, there is a single rendering flow, and all elements are aware of the space taken by others. CSS isn't that simple — CSS positioning, transformation, containment, and other features can cause elements to overlap. In this guide, we introduce the `z-index` property, which lets you place elements in front or behind other elements in the same stacking context.

## Layers on the z-axis

The elements rendered on a page are comprised of a series of boxes. Each box has a position in three dimensions. In addition to their inline and block positions, boxes lie along a third dimension known as the _z-axis_. Controlling an element's z-axis position becomes especially relevant when element boxes overlap visually. Several property values can cause elements to overlap. The `z-index` property provides you a way to control how they overlap!

By default, element boxes are rendered on Layer 0. The `z-index` property allows you to position elements on different layers along the z-axis, in addition to the default rendering layer. Each element's position along the imaginary z-axis (z-index value) is expressed as an integer (positive, negative, or zero) and controls the stacking order during rendering. Greater numbers mean elements are closer to the observer.

If you are not familiar with the term 'z-axis', imagine the page as a stack of layers, each with an assigned number. Layers are rendered in numerical order, with larger numbers appearing on top of smaller numbers (_X_ in the table below represents an arbitrary positive integer):

| Layer        | Description                           |
| ------------ | ------------------------------------- |
| Bottom layer | Farthest from the observer            |
| Layer -X     | Layers with negative `z-index` values |
| Layer 0      | Default rendering layer               |
| Layer X      | Layers with positive `z-index` values |
| Top layer    | Closest to the observer               |

## Elements in normal flow

By default, when no `z-index` property is specified, elements are rendered on the default rendering layer (Layer 0).

Consider the following three elements:

```html
<div id="div1">#1</div>
<div id="div2">#2</div>
<div id="div3">#3</div>
```

Without any positioning properties applied, these elements flow normally in document order, one after another, without overlapping.

```css
div {
  height: 100px;
  width: 100px;
  outline: 1px dotted;
  line-height: 100px;
  font-size: 40px;
  text-align: center;
  font-family: "Helvetica", "Arial", sans-serif;
}

#div1 {
  background-color: lightpink;
}

#div2 {
  background-color: lightyellow;
}

#div3 {
  background-color: lightgreen;
}
```

## Default layering behavior

To stack the elements, we can position them.
If we use absolute positioning to place them in (almost) the same spot, the default stacking order follows the source order: the first element in the HTML appears at the bottom layer and the last element appears at the top layer.

```css
div {
  position: absolute;
}

#div1 {
  top: 0;
  left: 0;
}

#div2 {
  top: 10px;
  left: 10px;
}

#div3 {
  top: 20px;
  left: 20px;
}
```

## Rearranging layers

We can use the CSS `z-index` property to position each element along the z-axis, effectively rearranging the stacking order.

By adding `z-index` values, we change the default layer order:

```css
#div1 {
  z-index: 5;
}

#div2 {
  z-index: -9;
}

#div3 {
  z-index: 0;
}
```

The element with the lowest `z-index` value appears on the bottom layer. The element with the highest `z-index` value appears on the top layer. In this example, `-9` is the lowest value, so `#div2` is behind all the others. The first element in the source order, `#div1`, has the greatest value, so it appears on top of all the others.

## Impact of stacking contexts

Using `z-index` may appear fairly straightforward at first: a single property assigned a single integer number with a seemingly understandable behavior. When `z-index` is applied to complex hierarchies of HTML elements, many find the resulting behavior hard to understand or predict.

If the elements are not siblings, the stacking behavior can become more complicated because each element may belong to a different stacking context. This is shown in the example below.

```html
<section>
  <div id="div1">#1</div>
  <div id="div2">#2</div>
</section>
<div id="div3">#3</div>
```

```css
section {
  position: absolute;
  z-index: 2;
}
```

Even though the `z-index` value of `#div3` (`0`) is greater than that of `#div2` (`-9`), `#div2` appears above `#div3` because `#div1` and `#div2` are nested in a separate stacking context created by ``. The `` element and `#div3` are siblings, and since the `` element's z-index is greater than that of `#div3` (`2` versus `0`), `#div3` is placed behind `` and all of ``'s contents. For more in-depth details about the topic, see our Stacking context guide.

## Conclusion

As we've seen in this guide, `z-index` provides a way to control how elements stack along z-axis. You learned how the integer values of the `z-index` property can be used to alter the stacking order. However, as demonstrated in the last example, stacking orders can be complicated. Stacking orders follow a series of complex stacking rules to ensure that all browsers stack the same content in the same manner providing consistency and predictability. It's important to understand the features that create stacking contexts and how nested stacking contexts affect layer order.

## See also

- Stacking without the `z-index` property
- Stacking floating elements
- Using `z-index`
- Stacking context
- CSS positioned layout module
