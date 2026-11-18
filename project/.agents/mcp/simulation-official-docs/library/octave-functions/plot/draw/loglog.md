# loglog

```octave
function h = loglog (varargin)
```

@deftypefn  {} {} loglog (@var{y})
@deftypefnx {} {} loglog (@var{x}, @var{y})
@deftypefnx {} {} loglog (@var{x}, @var{y}, @var{prop}, @var{value}, @dots{})
@deftypefnx {} {} loglog (@var{x}, @var{y}, @var{fmt})
@deftypefnx {} {} loglog (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} loglog (@dots{})
Produce a 2-D plot using logarithmic scales for both axes.

See the documentation of @code{plot} for a description of the arguments
that @code{loglog} will accept.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created plot.
@seealso{plot, semilogx, semilogy}
@end deftypefn
