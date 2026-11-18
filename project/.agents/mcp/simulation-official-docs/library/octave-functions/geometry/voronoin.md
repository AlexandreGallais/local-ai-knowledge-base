# voronoin

```octave
function [C, F] = voronoin (pts, options)
```

@deftypefn  {} {[@var{C}, @var{F}] =} voronoin (@var{pts})
@deftypefnx {} {[@var{C}, @var{F}] =} voronoin (@var{pts}, @var{options})
Compute N-dimensional Voronoi facets.

The input matrix @var{pts} of size [n, dim] contains n points in a space of
dimension dim.

@var{C} contains the points of the Voronoi facets.  The list @var{F}
contains, for each facet, the indices of the Voronoi points.

An optional second argument, which must be a string or cell array of
strings, contains options passed to the underlying qhull command.  See the
documentation for the Qhull library for details
@url{http://www.qhull.org/html/qh-quick.htm#options}.

The default options depend on the dimension of the input:

@itemize
@item 2-D and 3-D: @var{options} = @code{@{"Qbb"@}}

@item 4-D and higher: @var{options} = @code{@{"Qbb", "Qx"@}}
@end itemize

If @var{options} is not present or @code{[]} then the default arguments are
used.  Otherwise, @var{options} replaces the default argument list.
To append user options to the defaults it is necessary to repeat the
default arguments in @var{options}.  Use a null string to pass no arguments.

@seealso{voronoi, convhulln, delaunayn}
@end deftypefn
