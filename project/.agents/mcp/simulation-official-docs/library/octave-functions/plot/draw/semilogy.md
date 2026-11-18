# semilogy

```octave
function h = semilogy (varargin)
```

@deftypefn  {} {} semilogy (@var{y})
@deftypefnx {} {} semilogy (@var{x}, @var{y})
@deftypefnx {} {} semilogy (@var{x}, @var{y}, @var{property}, @var{value}, @dots{})
@deftypefnx {} {} semilogy (@var{x}, @var{y}, @var{fmt})
@deftypefnx {} {} semilogy (@var{h}, @dots{})
@deftypefnx {} {@var{h} =} semilogy (@dots{})
Produce a 2-D plot using a logarithmic scale for the y-axis.

See the documentation of @code{plot} for a description of the
arguments that @code{semilogy} will accept.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created plot.
@seealso{plot, semilogx, loglog}
@end deftypefn
