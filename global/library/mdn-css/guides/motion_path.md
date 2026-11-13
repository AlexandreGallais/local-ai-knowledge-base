---
title: "CSS motion path"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/motion_path/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS motion path

The **CSS motion path** module allows authors to animate any graphical object along a custom path.

The CSS transforms module provides features that enable boxes to be repositioned, rotated, scaled, and skewed relative to its laid out position, without disrupting the layout of any other elements on the page. These transforms can be animated and transitioned, but only in relatively basic ways.

The features of the CSS motion path module provide offset transforms: transforms that align a point on an element to an offset distance along an offset path, optionally rotating the transformed element to follow the path direction. This module enables powerful transform possibilities, for example:

- Positioning using polar coordinates rather than limiting transformation to the standard rectangular `transform` coordinates.
- Animating an element along a defined path.

CSS motion paths allow the definition of complex 2D spatial transitions by leveraging CSS shape functions.

For example, you can define a specific path of any shape you want with the `offset-path` property. You can then animate an element to move along that path by animating the `offset-distance` property, and rotate it at any point with the `offset-rotate` property.

## Motion paths in action

```html
<div id="heart">
  <div id="motion-demo"></div>
</div>
```

```css
#motion-demo {
  offset-path: path(
    "M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z"
  );
  animation: move 3000ms infinite linear;
  width: 10px;
  height: 10px;
  background: red;
}

#heart {
  width: 200px;
  height: 200px;
  background-color: lightpink;
  clip-path: path(
    "M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z"
  );
}

@keyframes move {
  100% {
    offset-distance: 100%;
  }
}
```

In this example, we used CSS masking and CSS shapes to clip a container with a light pink background into a heart shape. We used a `path()` function as the value of the `clip-path` property. Its child is a `10px` by `10px` red box that is made to follow the edge of its parent. We did this by using the same `basic-shape` as the path, setting the box's `offset-path` property to the same `path()` function value. We used CSS animations to change the `offset-distance` from `0%` to `100%` over three seconds.

## Reference

### Properties

- `offset` shorthand
- `offset-anchor`
- `offset-distance`
- `offset-path`
- `offset-position`
- `offset-rotate`

### Functions

- `ray`

## Guides

- Using CSS animations
    Step-by-step tutorial on how to create animations using CSS.

## Related concepts

CSS transforms module

- `transform`
- `transform-origin`
- `translate`

CSS masking module

- `clip-path`
- `clip-rule`

CSS shapes module

- `basic-shape`
- `circle()`
- `ellipse()`
- `inset()`
- `path()`
- `polygon()`
- `rect()`
- `shape()`
- `xywh()`

CSS animations module

- `animation` shorthand
- `@keyframes`

CSS box model module

- `<coord-box>`

## See also

- `<position>`
- `easing-function`
- `gradient/radial-gradient` function
- `@media/prefers-reduced-motion` media query
- `will-change` CSS property
