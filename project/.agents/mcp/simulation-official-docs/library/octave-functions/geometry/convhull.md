# convhull

```octave
function [H, V] = convhull (varargin)
```

@deftypefn  {} {@var{H} =} convhull (@var{x}, @var{y})
@deftypefnx {} {@var{H} =} convhull (@var{x}, @var{y}, @var{z})
@deftypefnx {} {@var{H} =} convhull (@var{x})
@deftypefnx {} {@var{H} =} convhull (@dots{}, @var{options})
@deftypefnx {} {[@var{H}, @var{V}] =} convhull (@dots{})
Compute the convex hull of a 2-D or 3-D set of points.

The hull @var{H} is a linear index vector into the original set of points
that specifies which points form the enclosing hull.  For 2-D inputs only,
the output is ordered in a counterclockwise manner around the hull.

The input @var{x} may also be a matrix with two or three columns where the
first column contains x-data, the second y-data, and the optional third
column contains z-data.

An optional final argument, which must be a string or cell array of strings,
contains options passed to the underlying qhull command.
See the documentation for the Qhull library for details
@url{http://www.qhull.org/html/qh-quick.htm#options}.
The default option is @code{@{"Qt"@}}.

If @var{options} is not present or @code{[]} then the default arguments are
used.  Otherwise, @var{options} replaces the default argument list.
To append user options to the defaults it is necessary to repeat the
default arguments in @var{options}.  Use a null string to pass no arguments.

If the second output @var{V} is requested the volume of the enclosing
convex hull is calculated.

@seealso{convhulln, delaunay, voronoi}
@end deftypefn
