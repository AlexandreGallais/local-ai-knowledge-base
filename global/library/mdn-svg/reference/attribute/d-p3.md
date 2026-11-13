---
title: "d (part 3 of 3)"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# d (part 3 of 3)

### Quadratic Bézier curve

_Quadratic Bézier curves_ are smooth curve definitions using three points:

- starting point (current point)
    _Po_ = {_xo_, _yo_}
- end point
    _Pn_ = {_xn_, _yn_}
- control point
    _Pc_ = {_xc_, _yc_}
    (controls curvature)

After drawing, the _end point_ (_Pn_) becomes the _current point_ for the next command (_Po′_).

       | Command
       | Parameters
       | Notes

       | Q
       |
        (<code>x1</code
        >,<code>y1</code
        >, <code>x</code
        >,<code>y</code
        >)+

       |

          Draw a quadratic Bézier curve from the current point to the
          end point specified by <code>x</code
          >,<code>y</code
          >. The control point is specified by
          <code>x1</code
          >,<code>y1</code
          >. Any subsequent pair(s) of coordinate pairs are interpreted as
          parameter(s) for implicit absolute quadratic Bézier curve
          (`Q`) command(s).

          Formulae:

            Po′ = Pn = {<code
              >x</code
            >, <code>y</code
            >} ;Pc = {<code>x1</code
            >, <code>y1</code
            >}

       | q
       |
        (<code>dx1</code
        >,<code>dy1</code
        >, <code>dx</code
        >,<code>dy</code
        >)+

       |

          Draw a quadratic Bézier curve from the current point to the
          end point, which is the current point shifted by
          <code>dx</code> along the x-axis and
          <code>dy</code> along the y-axis. The
          control point is the current point (starting point
          of the curve) shifted by <code>dx1</code> along the x-axis
          and <code>dy1</code> along the y-axis. Any subsequent
          pair(s) of coordinate pairs are interpreted as parameter(s) for
          implicit relative quadratic Bézier curve (`q`) command(s).

          Formulae:

            Po′ = Pn = {xo
            + <code>dx</code
            >, yo + <code>dy</code
            >} ;Pc = {xo +
            <code>dx1</code
            >, yo + <code>dy1</code
            >}

       | T
       |
        (<code>x</code
        >,<code>y</code
        >)+

       |

          Draw a smooth quadratic Bézier curve from the
          current point to the end point specified by
          <code>x</code
          >,<code>y</code
          >. The control point is the reflection of the
          control point of the previous curve command about the current point. If the previous
          command wasn't a quadratic Bézier curve, the control point is
          the same as the curve starting point (current point). Any
          subsequent coordinate pair(s) are interpreted as parameter(s) for
          implicit absolute smooth quadratic Bézier curve (`T`)
          command(s).

          Formula:

            Po′ = Pn = {<code
              >x</code
            >, <code>y</code
            >}

       | t
       |
        (<code>dx</code
        >,<code>dy</code
        >)+

       |

          Draw a smooth quadratic Bézier curve from the
          current point to the end point, which is the
          current point shifted by <code>dx</code> along the
          x-axis and <code>dy</code> along the y-axis. The
          control point is the reflection of the
          control point of the previous curve command about the current point. If the previous
          command wasn't a quadratic Bézier curve, the control point is
          the same as the curve starting point (current point). Any
          subsequent coordinate pair(s) are interpreted as parameter(s) for
          implicit relative smooth quadratic Bézier curve (`t`)
          command(s).

          Formulae:

            Po′ = Pn = {xo
            + <code>dx</code
            >, yo + <code>dy</code
            >}

#### Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg
  viewBox="0 0 200 100"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Quadratic Bézier curve with implicit repetition -->
  <path
    fill="none"
    stroke="red"
    d="M 10,50
           Q 25,25 40,50
           t 30,0 30,0 30,0 30,0 30,0" />

  <!-- Highlight the curve vertex and control points -->
  <g>
    <polyline
      points="10,50 25,25 40,50"
      stroke="rgb(0 0 0 / 20%)"
      fill="none" />
    <circle cx="25" cy="25" r="1.5" />

    <!-- Curve vertex points -->
    <circle cx="10" cy="50" r="1.5" />
    <circle cx="40" cy="50" r="1.5" />

    <g id="SmoothQuadraticDown">
      <polyline
        points="40,50 55,75 70,50"
        stroke="rgb(0 0 0 / 20%)"
        stroke-dasharray="2"
        fill="none" />
      <circle cx="55" cy="75" r="1.5" fill="lightgrey" />
      <circle cx="70" cy="50" r="1.5" />
    </g>

    <g id="SmoothQuadraticUp">
      <polyline
        points="70,50 85,25 100,50"
        stroke="rgb(0 0 0 / 20%)"
        stroke-dasharray="2"
        fill="none" />
      <circle cx="85" cy="25" r="1.5" fill="lightgrey" />
      <circle cx="100" cy="50" r="1.5" />
    </g>

    <use href="#SmoothQuadraticDown" x="60" />
    <use href="#SmoothQuadraticUp" x="60" />
    <use href="#SmoothQuadraticDown" x="120" />
  </g>
</svg>
```

### Elliptical arc curve

_Elliptical arc curves_ are curves defined as a portion of an ellipse. It is sometimes easier to draw highly regular curves with an elliptical arc than with a Bézier curve.

       | Command
       | Parameters
       | Notes

       | A
       |
        (<code>rx</code> <code>ry</code>
        <code>angle</code> <code>large-arc-flag</code>
        <code>sweep-flag</code> <code>x</code>
        <code>y</code
        >)+

       |

          Draw an Arc curve from the current point to the coordinate
          <code>x</code
          >,<code>y</code
          >. The center of the ellipse used to draw the arc is determined
          automatically based on the other parameters of the command:

            <code>rx</code> and <code>ry</code> are the
            two radii of the ellipse;

            <code>angle</code> represents a rotation (in degrees) of
            the ellipse relative to the x-axis;

            <code>large-arc-flag</code> and
            <code>sweep-flag</code> allow you to choose which arc to
            draw; 4 possible arcs can be drawn using the other parameters.

                <code>large-arc-flag</code> allows you to choose between
                large arc (`1`) or small arc (`0`),

                <code>sweep-flag</code> allows you to choose between
                clockwise turning arc (`1`) or counterclockwise
                turning arc (`0`)

        The coordinate <code>x</code
        >,<code>y</code> becomes the new current point for the next
        command. All subsequent sets of parameters are considered implicit
        absolute arc curve (`A`) commands.

       | a
       |
        (<code>rx</code> <code>ry</code>
        <code>angle</code> <code>large-arc-flag</code>
        <code>sweep-flag</code> <code>dx</code>
        <code>dy</code
        >)+

       |

          Draw an Arc curve from the current point to a point for which
          coordinates are those of the current point shifted by
          <code>dx</code> along the x-axis and
          <code>dy</code> along the y-axis. The center of the ellipse
          used to draw the arc is determined automatically based on the other
          parameters of the command:

            <code>rx</code> and <code>ry</code> are the
            two radii of the ellipse;

            <code>angle</code> represents a rotation (in degrees) of
            the ellipse relative to the x-axis;

            <code>large-arc-flag</code> and
            <code>sweep-flag</code> allow you to choose which arc to
            draw; 4 possible arcs can be drawn using the other parameters.

                <code>large-arc-flag</code> allows a choice of large
                arc (`1`) or small arc (`0`),

                <code>sweep-flag</code> allows a choice of a
                clockwise arc (`1`) or counterclockwise arc
                (`0`)

        The current point gets its X and Y coordinates shifted by
        <code>dx</code> and <code>dy</code> for the next
        command. All subsequent sets of parameters are considered implicit
        relative arc curve (`a`) commands.

#### Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <!-- The influence of the arc flags with which the arc is drawn -->
  <path
    fill="none"
    stroke="red"
    d="M 6,10
           A 6 4 10 1 0 14,10" />

  <path
    fill="none"
    stroke="lime"
    d="M 6,10
           A 6 4 10 1 1 14,10" />

  <path
    fill="none"
    stroke="purple"
    d="M 6,10
           A 6 4 10 0 1 14,10" />

  <path
    fill="none"
    stroke="pink"
    d="M 6,10
           A 6 4 10 0 0 14,10" />
</svg>
```

### ClosePath

_ClosePath_ instructions draw a straight line from the _current position_ to the first point in the path.

       | Command
       | Parameters
       | Notes

       | Z, z
       |
       |
        Close the current subpath by connecting the last point of the path with
        its initial point. If the two points are at different coordinates, a
        straight line is drawn between those two points.

> **Note:**
> The appearance of a shape closed with _ClosePath_ may be different to that of one closed by drawing a line to the origin, using one of the other commands, because the line ends are joined together (according to the `stroke-linejoin` setting), rather than just being placed at the same coordinates.

#### Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 -1 30 11" xmlns="http://www.w3.org/2000/svg">
  <!--
  An open shape with the last point of
  the path different to the first one
  -->
  <path
    stroke="red"
    d="M 5,1
           l -4,8 8,0" />

  <!--
  An open shape with the last point of
  the path matching the first one
  -->
  <path
    stroke="red"
    d="M 15,1
           l -4,8 8,0 -4,-8" />

  <!--
  A closed shape with the last point of
  the path different to the first one
  -->
  <path
    stroke="red"
    d="M 25,1
           l -4,8 8,0
           z" />
</svg>
```

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="none"
    stroke="red"
    d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z" />
</svg>
```

## See also

- SVG `` element
- CSS `d` property
