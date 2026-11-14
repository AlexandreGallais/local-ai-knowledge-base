---
title: "`<angle>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/angle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<angle>` CSS type

The **`<angle>`** CSS data type represents an angle value expressed in degrees, gradians, radians, or turns. It is used, for example, in `gradient`s and in some `transform` functions.

```css
transform: rotate(45deg);
```

```css
transform: rotate(3.1416rad);
```

```css
transform: rotate(-50grad);
```

```css
transform: rotate(1.75turn);
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This box can rotate to different angles.
  </div>
</section>
```

```css
#example-element {
  background-color: #0118f3;
  padding: 0.75em;
  width: 180px;
  height: 120px;
  color: white;
}
```

## Syntax

The `<angle>` data type consists of a `<number>` followed by one of the units listed below. As with all dimensions, there is no space between the unit literal and the number.
While some legacy uses accept a unitless `0`, you should always include a unit for zero values, such as: `0deg`, `0grad`, `0rad`, or `0turn`.

Optionally, it may be preceded by a single `+` or `-` sign. Positive numbers represent clockwise angles, while negative numbers represent counterclockwise angles. For static properties of a given unit, any angle can be represented by various equivalent values. For example, `90deg` equals `-270deg`, and `1turn` equals `4turn`. For dynamic properties, like when applying an `animation` or `transition`, the effect will nevertheless be different.

### Units

- `deg`
    Represents an angle in degrees. One full circle is `360deg`. Examples: `0deg`, `90deg`, `14.23deg`.
- `grad`
    Represents an angle in gradians. One full circle is `400grad`. Examples: `0grad`, `100grad`, `38.8grad`.
- `rad`
    Represents an angle in radians. One full circle is 2π radians which approximates to `6.2832rad`. `1rad` is 180/π degrees. Examples: `0rad`, `1.0708rad`, `6.2832rad`.
- `turn`
    Represents an angle in a number of turns. One full circle is `1turn`. Examples: `0turn`, `0.25turn`, `1.2turn`.

## Examples

### Setting a clockwise right angle

       |
       | `90deg = 100grad = 0.25turn ≈ 1.5708rad`

### Setting a flat angle

       |
       | `180deg = 200grad = 0.5turn ≈ 3.1416rad`

### Setting a counterclockwise right angle

       |
       | `-90deg = -100grad = -0.25turn ≈ -1.5708rad`

### Setting a null angle

       |
       | `0deg = 0grad = 0turn = 0rad`

## See also

- CSS data types
- The `gradient` type
- CSS rotation transforms: `rotate()`, `rotate3d()`, `rotateX()`, `rotateY()`, and `rotateZ()`
- CSS transforms
- Using CSS transforms
- Using CSS gradients
