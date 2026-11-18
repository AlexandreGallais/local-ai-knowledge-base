# loglogerr

```octave
function h = loglogerr (varargin)
```

@deftypefn  {} {} loglogerr (@var{y}, @var{ey})
@deftypefnx {} {} loglogerr (@var{y}, @dots{}, @var{fmt})
@deftypefnx {} {} loglogerr (@var{x}, @var{y}, @var{ey})
@deftypefnx {} {} loglogerr (@var{x}, @var{y}, @var{err}, @var{fmt})
@deftypefnx {} {} loglogerr (@var{x}, @var{y}, @var{lerr}, @var{uerr}, @var{fmt})
@deftypefnx {} {} loglogerr (@var{x}, @var{y}, @var{ex}, @var{ey}, @var{fmt})
@deftypefnx {} {} loglogerr (@var{x}, @var{y}, @var{lx}, @var{ux}, @var{ly}, @var{uy}, @var{fmt})
@deftypefnx {} {} loglogerr (@var{x1}, @var{y1}, @dots{}, @var{fmt}, @var{xn}, @var{yn}, @dots{})
@deftypefnx {} {} loglogerr (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} loglogerr (@dots{})
Produce 2-D plots on a double logarithm axis with errorbars.

Many different combinations of arguments are possible.  The most common
form is

@example
loglogerr (@var{x}, @var{y}, @var{ey}, @var{fmt})
@end example

@noindent
which produces a double logarithm plot of @var{y} versus @var{x} with errors
in the @var{y}-scale defined by @var{ey} and the plot format defined by
@var{fmt}.  @xref{XREFerrorbar,,errorbar}, for available formats and
additional information.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.
@seealso{errorbar, semilogxerr, semilogyerr}
@end deftypefn
