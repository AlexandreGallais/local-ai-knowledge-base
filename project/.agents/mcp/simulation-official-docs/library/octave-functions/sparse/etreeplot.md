# etreeplot

```octave
function etreeplot (A, varargin)
```

@deftypefn  {} {} etreeplot (@var{A})
@deftypefnx {} {} etreeplot (@var{A}, @var{node_style}, @var{edge_style})
Plot the elimination tree of the matrix @var{A} or
@tcode{@var{A}+@var{A}'} if @var{A} in not symmetric.

The optional parameters @var{node_style} and @var{edge_style} define the
output style.
@seealso{treeplot, gplot}
@end deftypefn
