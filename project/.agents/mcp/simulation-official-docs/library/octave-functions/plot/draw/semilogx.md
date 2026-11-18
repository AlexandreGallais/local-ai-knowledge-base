# semilogx

```octave
function h = semilogx (varargin)
```

@deftypefn  {} {} semilogx (@var{y})
@deftypefnx {} {} semilogx (@var{x}, @var{y})
@deftypefnx {} {} semilogx (@var{x}, @var{y}, @var{property}, @var{value}, @dots{})
@deftypefnx {} {} semilogx (@var{x}, @var{y}, @var{fmt})
@deftypefnx {} {} semilogx (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} semilogx (@dots{})
Produce a 2-D plot using a logarithmic scale for the x-axis.

See the documentation of @code{plot} for a description of the
arguments that @code{semilogx} will accept.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created plot.
@seealso{plot, semilogy, loglog}
@end deftypefn
