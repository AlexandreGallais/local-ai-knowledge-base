# ezcontourf

```octave
function h = ezcontourf (varargin)
```

@deftypefn  {} {} ezcontourf (@var{f})
@deftypefnx {} {} ezcontourf (@dots{}, @var{dom})
@deftypefnx {} {} ezcontourf (@dots{}, @var{n})
@deftypefnx {} {} ezcontourf (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} ezcontourf (@dots{})

Plot the filled contour lines of a function.

@var{f} is a string, inline function, or function handle with two arguments
defining the function.  By default the plot is over the meshed domain
@code{-2*pi <= @var{x} | @var{y} <= 2*pi} with 60 points in each dimension.

If @var{dom} is a two element vector, it represents the minimum and maximum
values of both @var{x} and @var{y}.  If @var{dom} is a four element vector,
then the minimum and maximum values are @code{[xmin xmax ymin ymax]}.

@var{n} is a scalar defining the number of points to use in each dimension.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created plot.

Example:

@example
@group
f = @@(x,y) sqrt (abs (x .* y)) ./ (1 + x.^2 + y.^2);
ezcontourf (f, [-3, 3]);
@end group
@end example

@seealso{contourf, ezcontour, ezplot, ezmeshc, ezsurfc}
@end deftypefn
