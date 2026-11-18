# comet3

```octave
function comet3 (varargin)
```

@deftypefn  {} {} comet3 (@var{z})
@deftypefnx {} {} comet3 (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} comet3 (@var{x}, @var{y}, @var{z}, @var{p})
@deftypefnx {} {} comet3 (@var{hax}, @dots{})
Produce a simple comet style animation along the trajectory provided by
the input coordinate vectors (@var{x}, @var{y}, @var{z}).

If only @var{z} is specified then @var{x}, @var{y} default to the indices
of @var{z}.

The speed of the comet may be controlled by @var{p}, which represents the
time each point is displayed before moving to the next one.  The default for
@var{p} is @code{5 / numel (@var{z})}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.
@seealso{comet}
@end deftypefn
