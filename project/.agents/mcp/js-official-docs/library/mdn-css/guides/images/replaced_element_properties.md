---
title: "Styling replaced elements"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/images/replaced_element_properties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Styling replaced elements

Some CSS properties apply to all elements, some only to grid and flex containers, others only to transformable elements. This guide introduces the properties that only apply to _replaced elements_.

A **replaced element** is an element whose representation is outside the scope of CSS; they're external objects whose representation is independent of the CSS formatting model. Some replaced elements, such as `` elements, may have stylesheets of their own, but they don't inherit the styles of the parent document.

## Using CSS with replaced elements

CSS handles replaced elements specifically in some cases, like when calculating margins and some `auto` values. Only replaced elements can ever have intrinsic dimensions. Some replaced elements, but not all, have intrinsic dimensions or a defined baseline, which is used by some CSS properties, such as `vertical-align`.

While document styles can set the size and position of replaced elements, document styles don't affect the replaced elements' content, with some exceptions: The CSS images module includes properties which support controlling the positioning of the element's content within its box.

## Controlling object position within the content box

The CSS images module defines two properties which can be used to specify how the object contained within the replaced element should be positioned within the element's box area. The `object-fit` property is used to size objects, while the `object-position` property is used to position them.

### The `object-fit` property

The `object-fit` property specifies how the replaced element's content object should be fitted to the containing element's box. The property defines how images, videos and other embeddable media formats respond to the height and width of the replaced element's content box. If the height, width, or aspect-ratio of an element differ from the resource that will be occupying space reserved for the element, the `fill`, `contain`, `cover`, `scale-down`, and `none` values define whether the browser should scale the resource, cover the allocated space, contain the asset within the space, or allow the resource to be distorted.

When contained or scaled down, any areas of the box not covered by the replaced element will show the element's background.

The `object-fit` property has no effect on ``, ``, and `<fencedframe>` elements.

If we place the image, a square with a 1:1 aspect ratio, in a 100px x 300px box (1:3 aspect ratio), by default the image will fill the box, distorting itself. We can use the `object-fit` property to define how the image should be rendered when forced into a box with a different size and aspect ratio:

```html
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
<p>
  <label><input type="checkbox" /> Change dimensions</label>
</p>
```

```css
body {
  display: flex;
  gap: 20px;
  flex-flow: row wrap;
  grid-auto-flow: column;
  max-width: 98%;
  margin: 10px auto 0;
}
img {
  width: 100px;
  height: 300px;
  outline: 2px solid purple;
}
body:has(:checked) img {
  width: 300px;
  height: 100px;
}
```

```css
img:nth-of-type(1) {
  object-fit: fill;
}
img:nth-of-type(2) {
  object-fit: cover;
}
img:nth-of-type(3) {
  object-fit: contain;
}
img:nth-of-type(4) {
  object-fit: scale-down;
}
img:nth-of-type(5) {
  object-fit: none;
}
img:nth-of-type(6) {
  /* no object-fit property */
  outline: 2px dashed red;
}
```

Check the box to set the height and width values. Note that only the `fill` value (the default) distorts the original image. With all other values, the intrinsic aspect ratio of the image is maintained.

### The `object-position` property

The `object-position` property specifies the alignment of the replaced element's content object within the element's box.

Often used in conjunction with the `object-fit` property, it takes as its value a `<position>` value, the same value type as used for `background-position`.

```css
img {
  object-position: bottom right;
}
```

```html
<img
  src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
  alt="Pride flag" />
```

It can be used without `object-fit`. In this case, the image is rendered at it's intrinsic size (218px x 218px), with the position of the contents of the image set by the `object-position` value.

```css
img {
  margin: 10px 0 0 10px;
}
```

```css
img {
  outline: 2px solid;
  object-position: 114px 72px;
}
```

The `object-position` property works equally well with ``, ``, and `` elements as it does for ``.

## See also

- Understanding aspect ratios
- CSS images module
- CSS display module
- CSS backgrounds and borders module
