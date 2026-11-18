# contour

```octave
function [c, h] = contour (varargin)
```

@deftypefn  {} {} contour (@var{z})
@deftypefnx {} {} contour (@var{z}, @var{vn})
@deftypefnx {} {} contour (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} contour (@var{x}, @var{y}, @var{z}, @var{vn})
@deftypefnx {} {} contour (@dots{}, @var{style})
@deftypefnx {} {} contour (@var{hax}, @dots{})
@deftypefnx {} {[@var{c}, @var{h}] =} contour (@dots{})
Create a 2-D contour plot.

Plot level curves (contour lines) of the matrix @var{z}, using the
contour matrix @var{c} computed by @code{contourc} from the same
arguments; see the latter for their interpretation.

The appearance of contour lines can be defined with a line style @var{style}
in the same manner as @code{plot}.  Only line style and color are used;
Any markers defined by @var{style} are ignored.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional output @var{c} contains the contour levels in @code{contourc}
format.

The optional return value @var{h} is a graphics handle to the hggroup
comprising the contour lines.

Example:

@example
@group
x = 0:3;
y = 0:2;
z = y' * x;
contour (x, y, z, 2:3)
@end group
@end example

@seealso{ezcontour, contourc, contourf, contour3, clabel, meshc, surfc,
clim, colormap, plot}

@end deftypefn
