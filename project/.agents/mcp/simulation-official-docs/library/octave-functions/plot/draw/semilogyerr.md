# semilogyerr

```octave
function h = semilogyerr (varargin)
```

@deftypefn  {} {} semilogyerr (@var{y}, @var{ey})
@deftypefnx {} {} semilogyerr (@var{y}, @dots{}, @var{fmt})
@deftypefnx {} {} semilogyerr (@var{x}, @var{y}, @var{ey})
@deftypefnx {} {} semilogyerr (@var{x}, @var{y}, @var{err}, @var{fmt})
@deftypefnx {} {} semilogyerr (@var{x}, @var{y}, @var{lerr}, @var{uerr}, @var{fmt})
@deftypefnx {} {} semilogyerr (@var{x}, @var{y}, @var{ex}, @var{ey}, @var{fmt})
@deftypefnx {} {} semilogyerr (@var{x}, @var{y}, @var{lx}, @var{ux}, @var{ly}, @var{uy}, @var{fmt})
@deftypefnx {} {} semilogyerr (@var{x1}, @var{y1}, @dots{}, @var{fmt}, @var{xn}, @var{yn}, @dots{})
@deftypefnx {} {} semilogyerr (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} semilogyerr (@dots{})
Produce 2-D plots using a logarithmic scale for the y-axis and errorbars
at each data point.

Many different combinations of arguments are possible.  The most common
form is

@example
semilogyerr (@var{x}, @var{y}, @var{ey}, @var{fmt})
@end example

@noindent
which produces a semi-logarithmic plot of @var{y} versus @var{x} with errors
in the @var{y}-scale defined by @var{ey} and the plot format defined by
@var{fmt}.  @xref{XREFerrorbar,,errorbar}, for available formats and
additional information.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

@seealso{errorbar, semilogxerr, loglogerr}
@end deftypefn
