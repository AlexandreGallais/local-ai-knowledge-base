# spy

```octave
function spy (x, varargin)
```

@deftypefn  {} {} spy (@var{x})
@deftypefnx {} {} spy (@dots{}, @var{markersize})
@deftypefnx {} {} spy (@dots{}, @var{line_spec})
Plot the sparsity pattern of the sparse matrix @var{x}.

If the optional numeric argument @var{markersize} is given, it determines
the size of the markers used in the plot.

If the optional string @var{line_spec} is given it is passed to @code{plot}
and determines the appearance of the plot.
@seealso{plot, gplot}
@end deftypefn
