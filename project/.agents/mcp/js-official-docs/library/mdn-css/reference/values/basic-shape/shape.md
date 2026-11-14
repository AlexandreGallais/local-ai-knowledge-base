---
title: "`shape()` CSS function (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/basic-shape/shape/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `shape()` CSS function

The **`shape()`** CSS function is used to define a shape for the `border-shape`, `clip-path`, and `offset-path` properties. It combines an initial starting point with a series of shape commands that define the path of the shape. The `shape()` function is a member of the `basic-shape` data type.

## Syntax

```css
/* <fill-rule> */
clip-path: shape(nonzero from 0 0, line to 10px 10px);

/* <move-command>, <line-command>, and close */
offset-path: shape(from 10px 10px, move by 10px 5px, line by 20px 40%, close);

/* <hvline-command> */
offset-path: shape(from 10px 10px, hline by 50px, vline to 5rem);

/* <curve-command> */
offset-path: shape(
  from 10px 10px,
  curve to 80px 80px with 160px 1px / 20% 16px
);

/* <smooth-command> */
offset-path: shape(from 10px 10px, smooth to 100px 50pt);

/* <arc-command> */
offset-path: shape(
  from 5% 0.5rem,
  arc to 80px 1pt of 10% ccw large rotate 25deg
);

/* Using a CSS math function */
offset-path: shape(
  from 5px -5%,
  hline to 50px,
  vline by calc(0% + 160px),
  hline by 70.5px,
  close,
  vline by 60px
);

clip-path: shape(
  evenodd from 10px 10px,
  curve to 60px 20% with 40px 0,
  smooth to 90px 0,
  curve by -20px 60% with 10% 40px / 20% 20px,
  smooth by -40% -10px with -10px 70px,
  close
);
```

### Parameters

- `<fill-rule>` (optional)
    Specifies how overlapping regions of a shape should be filled. The possible values include:
    - `nonzero`: A point is considered inside the shape if a ray drawn from the point crosses more left-to-right than right-to-left path segments, resulting in a non-zero count. This is the default value when `<fill-rule>` is omitted.

    - `evenodd`: A point is considered to be inside the shape if a ray drawn from the point crosses an odd number of path segments. This means that for each time the ray enters the shape, it has not exited an equal number of times, indicating an odd count of entries without corresponding exits.

    > **Warning:**
    > `<fill-rule>` is not supported in `offset-path` and using it invalidates the property.

- `from <coordinate-pair>`
    Defines the starting point of the first `<shape-command>` as a pair of coordinates that are measured from the top-left corner of the reference box. The coordinates are specified as space-separated `<x> <y>` `<length-percentage>` values representing the left offset and top offset, respectively. Percentage values are relative to the width and height of the element's reference box, respectively. Add a comma after this parameter.

- `<shape-command>`
    Specifies a list of one or more comma-separated commands that define the shape, using syntax similar to SVG path commands. Commands include `<move-command>`, `<line-command>`, `<hv-line-command>`, `<curve-command>`, `<smooth-command>`, `<arc-command>`, and `close`. Each command's starting point is the previous command's ending point, with the first point of the shape defined by the `from <coordinate-pair>` parameter.

#### Shape commands

The syntax of most shape commands is a keyword that provides a directive, such as `move` or `line`, followed by the `by` or `to` keyword, and a set of coordinates.

- `by`: Indicates that the `<coordinate-pair>` is relative to the command's starting point (a "relative" value).
- `to`: Indicates that the `<coordinate-pair>` is relative to the top-left corner of the reference box (an "absolute" value).

> **Note:**
> If a coordinate in a `<coordinate-pair>` is specified as a percentage, the value is calculated relative to the respective width or height of the reference box.

The following `<shape-command>`s can be specified:

- `<move-command>`
    Specified as `move [by | to] <coordinate-pair>`. This command adds a MoveTo command to the list of shape commands. It draws nothing; instead, it specifies the starting position for the next command. The `by` or `to` keyword specifies whether the `<coordinate-pair>` point is relative or absolute, respectively. If the `<move-command>` follows the `close` command, it identifies the starting point of the next shape or subpath.

- `<line-command>`
    Specified as `line [by | to] <coordinate-pair>`. This command adds a LineTo command to the list of shape commands. It draws a straight line from the command's starting point to its ending point. The `by` or `to` keyword specifies whether the ending point specified by `<coordinate-pair>` is relative or absolute, respectively.

- `<hv-line-command>`
    Specified as `[hline | vline] [by | to] <length-percentage>`. This command adds a horizontal (`hline`) or vertical (`vline`) LineTo command to the list of shape commands. With `hline`, a horizontal line is drawn from the command's starting point `to` or `by` the `x` position defined by `<length-percentage>`. With `vline`, a vertical line is drawn from the command's starting point `to` or `by` the `y` position defined by `<length-percentage>`. The `by` or `to` keyword determines the relative or absolute ending point, respectively. This command is equivalent to `<line-command>` with one coordinate value set by the single `<length-percentage>` and the other coordinate value remaining unchanged from its starting command.

- `<curve-command>`
    Specified as `curve [by | to] <end-point> with <control-point> [/ <control-point>]`. This command adds a Bézier curve command to the list of shape commands. The `by` or `to` keyword determines whether the ending point of the curve, specified by the `<end-point>`, is relative or absolute.

    The `with` keyword specifies the control points of the Bézier curve as follows.
    - If only a single `<control-point>` is provided, the command draws a quadratic Bézier curve, which is defined by three points (the start point, control point, and end point).
    - If two `<control-point>` values are provided, the command draws a cubic Bézier curve, which is defined by four points (the start point, two control points, and the end point).

    Valid values for `<end-point>` include:
    - `<position>` keywords or a `<coordinate-value-pair>`
        Can be used if the curve end point is absolute (specified using `to`).
    - `<coordinate-value-pair>`
        Can be used if the curve end point is relative (specified using `by`).

    Valid values for `<control-point>` include:
    - `<position>`
        Specifies a position keyword. This value is valid only when the curve end point is absolute (specified using `to`).
    - `<coordinate-value-pair>`
        Specifies a pair of `<length-percentage>` values that define coordinates.
    - `<relative-control-point>`
        Defines a `<coordinate-value-pair>` followed by the `from` keyword and one of the following keywords:
        - `start`
            Indicates that the control point is relative to the start point of the current command.
        - `end`
            Indicates that the control point is relative to the end point of the current command.
        - `origin`
            Indicates that the control point is relative to the top-left (origin) point of the container the shape is being drawn inside.
            > **Note:**
            > If the `<relative-control-point>` keywords are not specified, making the `<control-point>` a regular `<coordinate-value-pair>`, the coordinates are relative to the start of the curve. In other words, `start` is the default setting.

- `<smooth-command>`
    Specified as `smooth [by | to] <end-point> [with <control-point>]`. This command adds a smooth Bézier curve command to the list of shape commands. The `by` or `to` keyword determines whether the ending point of the curve, specified by the `<end-point>`, is relative or absolute.

    The `with` keyword specifies an optional control point for the Bézier curve:
    - If `with <control-point>` is omitted, the command draws a smooth quadratic Bézier curve, which uses the previous control point and the current endpoint to define the curve.
    - If the optional `with` keyword is included, it specifies a control points of the curve through `<control-point>`, drawing a smooth cubic Bézier curve defined by the previous control point, the current control point, and the current endpoint.

    Smooth curves ensure a continuous transition from the shape, while quadratic curves do not. Smooth quadratic curves maintain a seamless transition using a single control point, whereas smooth cubic curves provide a more refined transition using two control points.

    Valid values for the `<end-point>` and `<control-point>` components are the same as those for `<curve-command>`.

- `<arc-command>`
    Specified as `arc [by | to] <coordinate-pair> of <length-percentage> [<length-percentage>] [<arc-sweep> | <arc-size> | rotate <angle>]`. This command adds an elliptical arc curve command to the list of shape commands. It draws an elliptical arc between a starting point and an ending point. The `by` or `to` keyword determines whether the ending point of the curve, specified by the first `<coordinate-pair>`, is relative or absolute, respectively.

    The elliptical arc curve command defines two possible ellipses, which intersect both the starting and ending points, and each can be traced clockwise or counterclockwise, resulting in four possible arcs depending on the arc size, direction, and angle. The `of` keyword specifies the size of the ellipse from which the arc is taken: the first `<length-percentage>` provides the horizontal radius of the ellipse, and the second `<length-percentage>` provides the vertical radius.

    Specify the following parameters to choose which of the four arcs to use:
    - `<arc-sweep>`: Indicates whether the desired arc is the one traced around the ellipse clockwise (`cw`) or counterclockwise (`ccw`). If omitted, this defaults to `ccw`.
    - `<arc-size>`: Indicates whether the desired arc is the larger (`large`) or smaller (`small`) of the two arcs. If omitted, this defaults to `small`.
    - `<angle>`: Specifies the angle, in degrees, by which to rotate the ellipse relative to the x-axis. A positive angle rotates the ellipse clockwise, and a negative angle rotates it counterclockwise. If omitted, this defaults to `0deg`.

    Special situations are handled as follows:
    - If only one `<length-percentage>` is provided, the same value is used for both the horizontal and vertical radii, effectively creating a circle. In this case, `<arc-size>` and `<angle>` have no effect.
    - If either radius is zero, the command is equivalent to a `<line-command>` to the ending point.
    - If either radius is negative, its absolute value is used instead.
    - If the horizontal and vertical radii don't describe an ellipse large enough to intersect both the starting point and ending points (after rotation by the specified `<angle>`), the radii are scaled up uniformly until the ellipse is just large enough to intersect both points.
    - If the starting and ending points of the arc lie on exactly opposite sides of the ellipse, there is only one possible ellipse and two possible arcs. In this case, `<arc-sweep>` specifies the arc to choose, and `<arc-size>` has no effect.

- `close`
    Adds a ClosePath command to the list of shape commands, drawing a straight line from the current position (end of the last command) to the first point in the path defined in the `from <coordinate-pair>` parameter. To close the shape without drawing a line, include a `<move-command>` with the originating coordinates before the close command. If the `close` command is immediately followed by a `<move-command>`, it defines the starting point of the next shape or subpath.

## Description

The `shape()` function allows you to define complex shapes. It is similar to the `path()` shape function in several ways:

- The `<fill-rule>` parameter in the `shape()` function works exactly like the same parameter in the `path()` function.
- The `shape()` function requires specifying one or more `<shape-command>`s, where each command uses an underlying path command, such as MoveTo, LineTo, and ClosePath.

However, `shape()` offers several advantages over using `path()`:

- `shape()` uses standard CSS syntax, making it easier to create and modify shapes directly in your stylesheet. In comparison, `path()` uses the SVG path syntax, which is less intuitive for those not familiar with SVG.
- `shape()` supports a variety of CSS units, including percentages, `rem`, and `em`. `path()`, on the other hand, defines shapes as a single string and limits units to `px`.
- `shape()` also allows the use of CSS math functions, like `calc`, `max`, and `abs`, providing more versatility when defining shapes.
