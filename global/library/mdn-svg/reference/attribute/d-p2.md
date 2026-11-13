---
title: "d (part 2 of 3)"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# d (part 2 of 3)

## Path commands

Path commands are instructions that define a path to be drawn. Each command is composed of a command letter and numbers that represent the command parameters.

SVG defines 6 types of path commands, for a total of 20 commands:

- MoveTo: `M`, `m`
- LineTo: `L`, `l`, `H`, `h`, `V`, `v`
- Cubic Bézier curve: `C`, `c`, `S`, `s`
- Quadratic Bézier curve: `Q`, `q`, `T`, `t`
- Elliptical arc curve: `A`, `a`
- ClosePath: `Z`, `z`

> **Note:**
> Commands are _case-sensitive_. An upper-case command specifies absolute coordinates, while a lower-case command specifies coordinates relative to the current position.

It is always possible to specify a negative value as an argument to a command:

- negative angles will be anti-clockwise;
- _absolute_ negative _x_ and _y_ values are interpreted as negative coordinates;
- _relative_ negative _x_ values move to the left, and relative negative _y_ values move upwards.

### MoveTo path commands

_MoveTo_ instructions can be thought of as picking up the drawing instrument, and setting it down somewhere else—in other words, moving the _current point_ (_Po_; {_xo_, _yo_}). There is no line drawn between _Po_ and the new _current point_ (_Pn_; {_xn_, _yn_}).

       | Command
       | Parameters
       | Notes

       | M
       |
        (<code>x</code
        >, <code>y</code
        >)+

       |

          Move the current point to the coordinate
          <code>x</code
          >,<code>y</code
          >. Any subsequent coordinate pair(s) are interpreted as parameter(s)
          for implicit absolute LineTo (`L`) command(s) (see below).

          Formula: Pn = {<code
            >x</code
          >, <code>y</code
          >}

       | m
       |
        (<code>dx</code
        >, <code>dy</code
        >)+

       |

          Move the current point by shifting the last known position of
          the path by <code>dx</code> along the x-axis and by
          <code>dy</code> along the y-axis. Any subsequent coordinate
          pair(s) are interpreted as parameter(s) for implicit relative LineTo
          (`l`) command(s) (see below).

          Formula: Pn = {xo
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
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="none"
    stroke="red"
    d="M 10,10 h 10
       m  0,10 h 10
       m  0,10 h 10
       M 40,20 h 10
       m  0,10 h 10
       m  0,10 h 10
       m  0,10 h 10
       M 50,50 h 10
       m-20,10 h 10
       m-20,10 h 10
       m-20,10 h 10" />
</svg>
```

### LineTo path commands

_LineTo_ instructions draw a straight line from the _current point_ (_Po_; {_xo_, _yo_}) to the _end point_ (_Pn_; {_xn_, _yn_}), based on the parameters specified. The _end point_ (_Pn_) then becomes the _current point_ for the next command (_Po′_).

       | Command
       | Parameters
       | Notes

       | L
       | (`x`, `y`)+
       |

          Draw a line from the current point to the
          end point specified by <code>x</code
          >,<code>y</code
          >. Any subsequent coordinate pair(s) are interpreted as parameter(s)
          for implicit absolute LineTo (`L`) command(s).

          Formula: Po′ =
          Pn = {<code>x</code
          >, <code>y</code
          >}

       | l
       |
        (<code>dx</code
        >, <code>dy</code
        >)+

       |

          Draw a line from the current point to the
          end point, which is the current point shifted by
          <code>dx</code> along the x-axis and
          <code>dy</code> along the y-axis. Any subsequent coordinate
          pair(s) are interpreted as parameter(s) for implicit relative LineTo
          (`l`) command(s) (see below).

          Formula: Po′ =
          Pn = {xo +
          <code>dx</code
          >, yo + <code>dy</code
          >}

       | H
       |
        <code>x</code
        >+

       |

          Draw a horizontal line from the current point to the
          end point, which is specified by the
          <code>x</code> parameter and the current point's
          `y` coordinate. Any subsequent value(s) are interpreted as
          parameter(s) for implicit absolute horizontal LineTo (`H`)
          command(s).

          Formula: Po′ =
          Pn = {<code>x</code
          >, yo}

       | h
       |
        <code>dx</code
        >+

       |

          Draw a horizontal line from the current point to the
          end point, which is specified by the
          current point shifted by <code>dx</code> along the
          x-axis and the current point's `y` coordinate. Any
          subsequent value(s) are interpreted as parameter(s) for implicit
          relative horizontal LineTo (`h`) command(s).

          Formula: Po′ =
          Pn = {xo +
          <code>dx</code
          >, yo}

       | V
       |
        <code>y</code
        >+

       |

          Draw a vertical line from the current point to the
          end point, which is specified by the
          <code>y</code> parameter and the current point's
          `x` coordinate. Any subsequent values are interpreted as
          parameters for implicit absolute vertical LineTo (`V`)
          command(s).

          Formula: Po′ =
          Pn = {xo, <code>y</code
          >}

       | v
       |
        <code>dy</code
        >+

       |

          Draw a vertical line from the current point to the
          end point, which is specified by the
          current point shifted by <code>dy</code> along the
          y-axis and the current point's `x` coordinate. Any
          subsequent value(s) are interpreted as parameter(s) for implicit
          relative vertical LineTo (`v`) command(s).

          Formula: Po′ =
          Pn = {xo, yo + <code>dy</code
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
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <!-- LineTo commands with absolute coordinates -->
  <path
    fill="none"
    stroke="red"
    d="M 10,10
           L 90,90
           V 10
           H 50" />

  <!-- LineTo commands with relative coordinates -->
  <path
    fill="none"
    stroke="red"
    d="M 110,10
           l 80,80
           v -80
           h -40" />
</svg>
```

### Cubic Bézier curve

_Cubic Bézier curves_ are smooth curve definitions using four points:

- starting point (current point)
    (_Po_ = {_xo_, _yo_})
- end point
    (_Pn_ = {_xn_, _yn_})
- start control point
    (_Pcs_ = {_xcs_, _ycs_})
    (controls curvature near the start of the curve)
- end control point
    (_Pce_ = {_xce_, _yce_})
    (controls curvature near the end of the curve)

After drawing, the _end point_ (_Pn_) becomes the _current point_ for the next command (_Po′_).

       | Command
       | Parameters
       | Notes

       | C
       |
        (<code>x1</code
        >,<code>y1</code
        >, <code>x2</code
        >,<code>y2</code
        >, <code>x</code
        >,<code>y</code
        >)+

       |

          Draw a cubic Bézier curve from the current point to the
          end point specified by <code>x</code
          >,<code>y</code
          >. The start control point is specified by
          <code>x1</code
          >,<code>y1</code> and the end control point is
          specified by <code>x2</code
          >,<code>y2</code
          >. Any subsequent triplet(s) of coordinate pairs are interpreted as
          parameter(s) for implicit absolute cubic Bézier curve (`C`)
          command(s).

          Formulae:

            Po′ = Pn = {<code
              >x</code
            >, <code>y</code
            >} ;Pcs = {<code>x1</code
            >, <code>y1</code
            >} ;Pce = {<code>x2</code
            >, <code>y2</code
            >}

       | c
       |
        (<code>dx1</code
        >,<code>dy1</code
        >, <code>dx2</code
        >,<code>dy2</code
        >, <code>dx</code
        >,<code>dy</code
        >)+

       |

          Draw a cubic Bézier curve from the current point to the
          end point, which is the current point shifted by
          <code>dx</code> along the x-axis and
          <code>dy</code> along the y-axis. The
          start control point is the current point (starting
          point of the curve) shifted by <code>dx1</code> along the
          x-axis and <code>dy1</code> along the y-axis. The
          end control point is the current point (starting
          point of the curve) shifted by <code>dx2</code> along the
          x-axis and <code>dy2</code> along the y-axis. Any
          subsequent triplet(s) of coordinate pairs are interpreted as
          parameter(s) for implicit relative cubic Bézier curve (`c`)
          command(s).

          Formulae:

            Po′ = Pn = {xo
            + <code>dx</code
            >, yo + <code>dy</code
            >} ;Pcs = {xo +
            <code>dx1</code
            >, yo + <code>dy1</code
            >} ;Pce = {xo +
            <code>dx2</code
            >, yo + <code>dy2</code
            >}

       | S
       |
        (<code>x2</code
        >,<code>y2</code
        >, <code>x</code
        >,<code>y</code
        >)+

       |
        Draw a smooth cubic Bézier curve from the current point to the
        end point specified by <code>x</code
        >,<code>y</code
        >. The end control point is specified by
        <code>x2</code
        >,<code>y2</code
        >. The start control point is the reflection of the
        end control point of the previous curve command about the current point. If the
        previous command wasn't a cubic Bézier curve, the
        start control point is the same as the curve starting point
        (current point). Any subsequent pair(s) of coordinate pairs are
        interpreted as parameter(s) for implicit absolute smooth cubic Bézier
        curve (`S`) commands.

       | s
       |
        (<code>dx2</code
        >,<code>dy2</code
        >, <code>dx</code
        >,<code>dy</code
        >)+

       |
        Draw a smooth cubic Bézier curve from the current point to the
        end point, which is the current point shifted by
        <code>dx</code> along the x-axis and
        <code>dy</code> along the y-axis. The
        end control point is the current point (starting point
        of the curve) shifted by <code>dx2</code> along the x-axis
        and <code>dy2</code> along the y-axis. The
        start control point is the reflection of the
        end control point of the previous curve command about the current point. If the
        previous command wasn't a cubic Bézier curve, the
        start control point is the same as the curve starting point
        (current point). Any subsequent pair(s) of coordinate pairs are
        interpreted as parameter(s) for implicit relative smooth cubic Bézier
        curve (`s`) commands.

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
  <!-- Cubic Bézier curve with absolute coordinates -->
  <path
    fill="none"
    stroke="red"
    d="M 10,90
           C 30,90 25,10 50,10
           S 70,90 90,90" />

  <!-- Cubic Bézier curve with relative coordinates -->
  <path
    fill="none"
    stroke="red"
    d="M 110,90
           c 20,0 15,-80 40,-80
           s 20,80 40,80" />

  <!-- Highlight the curve vertex and control points -->
  <g id="ControlPoints">
    <!-- First cubic command control points -->
    <line x1="10" y1="90" x2="30" y2="90" stroke="lightgrey" />
    <circle cx="30" cy="90" r="1.5" />

    <line x1="50" y1="10" x2="25" y2="10" stroke="lightgrey" />
    <circle cx="25" cy="10" r="1.5" />

    <!-- Second smooth command control points (the first one is implicit) -->
    <line
      x1="50"
      y1="10"
      x2="75"
      y2="10"
      stroke="lightgrey"
      stroke-dasharray="2" />
    <circle cx="75" cy="10" r="1.5" fill="lightgrey" />

    <line x1="90" y1="90" x2="70" y2="90" stroke="lightgrey" />
    <circle cx="70" cy="90" r="1.5" />

    <!-- curve vertex points -->
    <circle cx="10" cy="90" r="1.5" />
    <circle cx="50" cy="10" r="1.5" />
    <circle cx="90" cy="90" r="1.5" />
  </g>
  <use href="#ControlPoints" x="100" />
</svg>
```
