# gplot

```octave
function [x, y] = gplot (A, xy, line_style)
```

@deftypefn  {} {} gplot (@var{A}, @var{xy})
@deftypefnx {} {} gplot (@var{A}, @var{xy}, @var{line_style})
@deftypefnx {} {[@var{x}, @var{y}] =} gplot (@var{A}, @var{xy})
Plot a graph defined by @var{A} and @var{xy} in the graph theory sense.

@var{A} is the adjacency matrix of the array to be plotted and @var{xy} is
an @var{n}-by-2 matrix containing the coordinates of the nodes of the graph.

The optional parameter @var{line_style} defines the output style for the
plot.  Called with no output arguments the graph is plotted directly.
Otherwise, return the coordinates of the plot in @var{x} and @var{y}.
@seealso{treeplot, etreeplot, spy}
@end deftypefn
