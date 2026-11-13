---
title: "SVGMarkerElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgmarkerelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGMarkerElement

The **`SVGMarkerElement`** interface provides access to the properties of `<marker>` elements, as well as methods to manipulate them. The `<marker>` element defines the graphics used for drawing marks on a shape.

The following properties and methods all return, or act on the attributes of the `<marker>` element represented by `SVGMarkerElement`.

## Instance properties

_This interface also inherits properties from its parent, `SVGElement`._

- `SVGMarkerElement.markerUnits` (read-only)
    Returns an `SVGAnimatedEnumeration` object, with one of the following values:
    - 0
        `SVG_MARKERUNITS_UNKNOWN` which means that the `markerUnits` attribute has a value other than the two predefined keywords.
    - 1
        `SVG_MARKERUNITS_USERSPACEONUSE` which means that the `markerUnits` attribute has the keyword value `userSpaceOnUse`.
    - 2
        `SVG_MARKERUNITS_STROKEWIDTH` which means that the `markerUnits` attribute has the keyword value `strokeWidth`.

- `SVGMarkerElement.markerWidth` (read-only)
    Returns an `SVGAnimatedLength` object containing the width of the `<marker>` viewport.
- `SVGMarkerElement.markerHeight` (read-only)
    Returns an `SVGAnimatedLength` object containing the height of the `<marker>` viewport.
- `SVGMarkerElement.orientType` (read-only)
    Returns an `SVGAnimatedEnumeration` object, with one of the following values:
    - 0
        `SVG_MARKER_ORIENT_UNKNOWN` which means that the `orient` attribute has a value other than the two predefined keywords.
    - 1
        `SVG_MARKERUNITS_ORIENT_AUTO` which means that the `orient` attribute has the keyword value `auto`.
    - 2
        `SVG_MARKERUNITS_ORIENT_ANGLE` which means that the `orient` attribute has an `<angle>` or `<number>` value indicating the angle.

- `SVGMarkerElement.orient`
    A string defining how the marker is rotated when it is placed at its position on the shape. It reflects the `orient` attribute of the `<marker>` element.
- `SVGMarkerElement.orientAngle` (read-only)
    Returns an `SVGAnimatedAngle` object containing the angle of the `orient` attribute.
- `SVGMarkerElement.refX` (read-only)
    Returns an `SVGAnimatedLength` object containing the value of the `refX` attribute of the `<marker>`.
- `SVGMarkerElement.refY` (read-only)
    Returns an `SVGAnimatedLength` object containing the value of the `refY` attribute of the `<marker>`.
- `SVGMarkerElement.viewBox` (read-only)
    Returns an `SVGAnimatedRect` object containing an `SVGRect` which contains the values set by the `viewBox` attribute on the `<marker>`.
- `SVGMarkerElement.preserveAspectRatio` (read-only)
    Returns an `SVGPreserveAspectRatio` object which contains the values set by the `preserveAspectRatio` attribute on the `<marker>` viewport.

## Instance methods

_This interface also inherits methods from its parent, `SVGElement`._

- `SVGMarkerElement.setOrientToAuto()`
    Sets the value of the `orient` attribute to `auto`.
- `SVGMarkerElement.setOrientToAngle()`
    Sets the value of the `orient` attribute to a specific angle value.

## Examples

The following SVG will be referenced in the examples.

```html
<svg id="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX="5"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="90">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
</svg>
```

### Finding the Width of the Marker

The `markerWidth` property returns an `SVGAnimatedLength` which contains an `SVGLength` with the value of the `markerWidth` attribute.

```js
let marker = document.getElementById("arrow");
console.log(marker.markerWidth.baseVal.value); // 6
```

### Updating the Orientation Angle

In the following example the value of the `orient` attribute is updated using `setOrientToAngle()` using an `SVGAngle` created using `SVGSVGElement.createSVGAngle()`.

```js
let svg = document.getElementById("svg");
let marker = document.getElementById("arrow");
console.log(marker.orientAngle.baseVal.value); // value in SVG above - 90
let angle = svg.createSVGAngle();
angle.value = "110";
marker.setOrientToAngle(angle);
console.log(marker.orientAngle.baseVal.value); // new value - 110
```
