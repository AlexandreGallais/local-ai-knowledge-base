# contourf

```octave
function [c, h] = contourf (varargin)
```

@deftypefn  {} {} contourf (@var{z})
@deftypefnx {} {} contourf (@var{z}, @var{vn})
@deftypefnx {} {} contourf (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} contourf (@var{x}, @var{y}, @var{z}, @var{vn})
@deftypefnx {} {} contourf (@dots{}, @var{style})
@deftypefnx {} {} contourf (@var{hax}, @dots{})
@deftypefnx {} {[@var{c}, @var{h}] =} contourf (@dots{})
Create a 2-D contour plot with filled intervals.

Plot level curves (contour lines) of the matrix @var{z} and fill the region
between lines with colors from the current colormap.

The level curves are taken from the contour matrix @var{c} computed by
@code{contourc} for the same arguments; see the latter for their
interpretation.

The appearance of contour lines can be defined with a line style @var{style}
in the same manner as @code{plot}.  Only line style and color are used;
Any markers defined by @var{style} are ignored.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional output @var{c} contains the contour levels in @code{contourc}
format.

The optional return value @var{h} is a graphics handle to the hggroup
comprising the contour lines.

The following example plots filled contours of the @code{peaks} function.

@example
@group
[x, y, z] = peaks (50);
contourf (x, y, z, -7:9)
@end group
@end example
@seealso{ezcontourf, contour, contourc, contour3, clabel, meshc, surfc,
clim, colormap, plot}
@end deftypefn
