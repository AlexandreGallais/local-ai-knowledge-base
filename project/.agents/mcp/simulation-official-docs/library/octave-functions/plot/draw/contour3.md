# contour3

```octave
function [c, h] = contour3 (varargin)
```

@deftypefn  {} {} contour3 (@var{z})
@deftypefnx {} {} contour3 (@var{z}, @var{vn})
@deftypefnx {} {} contour3 (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} contour3 (@var{x}, @var{y}, @var{z}, @var{vn})
@deftypefnx {} {} contour3 (@dots{}, @var{style})
@deftypefnx {} {} contour3 (@var{hax}, @dots{})
@deftypefnx {} {[@var{c}, @var{h}] =} contour3 (@dots{})
Create a 3-D contour plot.

@code{contour3} plots level curves (contour lines) of the matrix @var{z}
at a Z level corresponding to each contour.  This is in contrast to
@code{contour} which plots all of the contour lines at the same Z level
and produces a 2-D plot.

The level curves are taken from the contour matrix @var{c} computed by
@code{contourc} for the same arguments; see the latter for their
interpretation.

The appearance of contour lines can be defined with a line style @var{style}
in the same manner as @code{plot}.  Only line style and color are used;
Any markers defined by @var{style} are ignored.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional output @var{c} are the contour levels in @code{contourc}
format.

The optional return value @var{h} is a graphics handle to the hggroup
comprising the contour lines.

Example:

@example
@group
contour3 (peaks (19));
colormap cool;
hold on;
surf (peaks (19), "facecolor", "none", "edgecolor", "black");
@end group
@end example

@seealso{contour, contourc, contourf, clabel, meshc, surfc, clim, colormap,
plot}
@end deftypefn
