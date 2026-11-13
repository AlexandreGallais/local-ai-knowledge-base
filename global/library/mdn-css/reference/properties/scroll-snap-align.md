---
title: "`scroll-snap-align` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/scroll-snap-align/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scroll-snap-align` CSS property

The **`scroll-snap-align`** CSS property specifies the box's snap position as an alignment of its snap area.

```css
scroll-snap-align: start;
```

```css
scroll-snap-align: end;
```

```css
scroll-snap-align: center;
```

```html
<section class="default-example" id="default-example">
  <div id="example-parent">
    <div>1</div>
    <div id="example-element">2</div>
    <div>3</div>
  </div>
  <div class="info">Scroll »</div>
</section>
```

```css
.default-example {
  flex-wrap: wrap;
}

.default-example .info {
  width: 100%;
  padding: 0.5em 0;
  font-size: 90%;
}

#example-parent {
  text-align: left;
  width: 250px;
  height: 250px;
  overflow-x: scroll;
  display: flex;
  box-sizing: border-box;
  border: 1px solid black;
  scroll-snap-type: x mandatory;
}

#example-parent > div {
  flex: 0 0 66%;
  width: 250px;
  background-color: rebeccapurple;
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#example-parent > div:nth-child(even) {
  background-color: white;
  color: rebeccapurple;
}
```

## Syntax

```css
/* Single keyword value */
scroll-snap-align: none;
scroll-snap-align: center;
scroll-snap-align: start;
scroll-snap-align: end;

/* Two keyword values */
scroll-snap-align: start end;
scroll-snap-align: end center;
scroll-snap-align: center start;

/* Global values */
scroll-snap-align: inherit;
scroll-snap-align: initial;
scroll-snap-align: revert;
scroll-snap-align: revert-layer;
scroll-snap-align: unset;
```

### Values

This property is specified as one or two of the following keyword values, space-separated:

- `none`
    The box does not define a snap position in that axis.
- `start`
    The start alignment of this box's scroll snap area, within the scroll container's snapport is a snap position in this axis.
- `end`
    The end alignment of this box's scroll snap area, within the scroll container's snapport is a snap position in this axis.
- `center`
    The center alignment of this box's scroll snap area, within the scroll container's snapport is a snap position in this axis.

## Description

The `scroll-snap-align` property specifies the box's snap position as an alignment of its snap area (as the alignment subject) within its snap container's snap port (as the alignment container).

One or two values can be specified for the `scroll-snap-align` property. If one value is set, it is applied to both the block and inline axes. If two values are set, the first value controls the block axis and the second value controls the inline axis.

## See also

- `scroll-snap-stop`
- `scroll-initial-target`
- CSS scroll snap module
- Well-controlled scrolling with CSS scroll snap on web.dev (2018)
