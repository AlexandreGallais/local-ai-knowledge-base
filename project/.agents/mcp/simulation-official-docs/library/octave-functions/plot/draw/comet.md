# comet

```octave
function comet (varargin)
```

@deftypefn  {} {} comet (@var{y})
@deftypefnx {} {} comet (@var{x}, @var{y})
@deftypefnx {} {} comet (@var{x}, @var{y}, @var{p})
@deftypefnx {} {} comet (@var{hax}, @dots{})
Produce a simple comet style animation along the trajectory provided by
the input coordinate vectors (@var{x}, @var{y}).

If @var{x} is not specified it defaults to the indices of @var{y}.

The speed of the comet may be controlled by @var{p}, which represents the
time each point is displayed before moving to the next one.  The default for
@var{p} is @code{5 / numel (@var{y})}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.
@seealso{comet3}
@end deftypefn
