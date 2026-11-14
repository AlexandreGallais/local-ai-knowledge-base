---
title: "`shape` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `shape` CSS media feature

The `shape` CSS media feature can be used to test the shape of the device to distinguish rectangular and round displays.

## Syntax

The `shape` discrete feature is specified as one of two acceptable strings, either `rect` representing a rectangular screen or `round` representing a circular, oval or elliptical screen.

- `rect`
    The shape is an axis aligned rectangle or square, or a similar shape such as rounded rectangle for which the traditional designs are appropriate.
- `round`
    The shape is rounded or a similar shape to the circle such as an oval, an ellipse for which distinctively rounded designs are appropriate.

## Examples

### Basic <example-value>

#### HTML

```html
<h1>Hello World!</h1>
```

#### CSS

```css
h1 {
  text-align: left;
}

@media (shape: rect) {
  h1 {
    text-align: left;
  }
}

@media (shape: round) {
  h1 {
    text-align: center;
  }
}
```

### Custom stylesheet

This HTML will apply a special stylesheet for devices that have round screens.

```html
<head>
  <link rel="stylesheet" href="default.css" />
  <link
    media="screen and (shape: rect)"
    rel="stylesheet"
    href="rectangle.css" />
  <link media="screen and (shape: round)" rel="stylesheet" href="round.css" />
</head>
```

## Browser compatibility

Currently, no browsers support this feature.

## See also

- Using Media Queries
- @media
- CSS round display module
- Using environment variables
- CSS environment variables module
