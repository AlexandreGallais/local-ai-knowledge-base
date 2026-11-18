# ezpolar

```octave
function h = ezpolar (varargin)
```

@deftypefn  {} {} ezpolar (@var{f})
@deftypefnx {} {} ezpolar (@dots{}, @var{dom})
@deftypefnx {} {} ezpolar (@dots{}, @var{n})
@deftypefnx {} {} ezpolar (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} ezpolar (@dots{})

Plot a 2-D function in polar coordinates.

The function @var{f} is a string, inline function, or function handle with
a single argument.  The expected form of the function is
@code{@var{rho} = @var{f}(@var{theta})}.
By default the plot is over the domain @code{0 <= @var{theta} <= 2*pi}
with 500 points.

If @var{dom} is a two element vector, it represents the minimum and maximum
values of @var{theta}.

@var{n} is a scalar defining the number of points to use in plotting
the function.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created plot.

Example:

@example
ezpolar (@@(t) sin (5/4 * t), [0, 8*pi]);
@end example

@seealso{polar, ezplot}
@end deftypefn
