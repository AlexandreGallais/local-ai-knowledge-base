# voronoi

```octave
function [vx, vy] = voronoi (varargin)
```

@deftypefn  {} {} voronoi (@var{x}, @var{y})
@deftypefnx {} {} voronoi (@var{x}, @var{y}, @var{options})
@deftypefnx {} {} voronoi (@dots{}, "linespec")
@deftypefnx {} {} voronoi (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} voronoi (@dots{})
@deftypefnx {} {[@var{vx}, @var{vy}] =} voronoi (@dots{})
Plot the Voronoi diagram of points @code{(@var{x}, @var{y})}.

The Voronoi facets with points at infinity are not drawn.

The @var{options} argument, which must be a string or cell array of strings,
contains options passed to the underlying qhull command.
See the documentation for the Qhull library for details
@url{http://www.qhull.org/html/qh-quick.htm#options}.

If @qcode{"linespec"} is given it is used to set the color and line style of
the plot.

If an axes graphics handle @var{hax} is supplied then the Voronoi diagram is
drawn on the specified axes rather than in a new figure.

If a single output argument is requested then the Voronoi diagram will be
plotted and a graphics handle @var{h} to the plot is returned.

[@var{vx}, @var{vy}] = voronoi (@dots{}) returns the Voronoi vertices
instead of plotting the diagram.

@example
@group
x = rand (10, 1);
y = rand (size (x));
h = convhull (x, y);
[vx, vy] = voronoi (x, y);
plot (vx, vy, "-b", x, y, "o", x(h), y(h), "-g");
legend ("", "points", "hull");
@end group
@end example

@seealso{voronoin, delaunay, convhull}
@end deftypefn
