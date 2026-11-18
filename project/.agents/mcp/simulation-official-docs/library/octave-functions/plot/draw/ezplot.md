# ezplot

```octave
function h = ezplot (varargin)
```

@deftypefn  {} {} ezplot (@var{f})
@deftypefnx {} {} ezplot (@var{f2v})
@deftypefnx {} {} ezplot (@var{fx}, @var{fy})
@deftypefnx {} {} ezplot (@dots{}, @var{dom})
@deftypefnx {} {} ezplot (@dots{}, @var{n})
@deftypefnx {} {} ezplot (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} ezplot (@dots{})

Plot the 2-D curve defined by the function @var{f}.

The function @var{f} may be a string, inline function, or function handle
and can have either one or two variables.  If @var{f} has one variable, then
the function is plotted over the domain @code{-2*pi < @var{x} < 2*pi}
with 500 points.

If @var{f2v} is a function of two variables then the implicit function
@code{@var{f}(@var{x},@var{y}) = 0} is calculated over the meshed domain
@code{-2*pi <= @var{x} | @var{y} <= 2*pi} with 60 points in each dimension.

For example:

@example
ezplot (@@(@var{x}, @var{y}) @var{x}.^2 - @var{y}.^2 - 1)
@end example

If two functions are passed as inputs then the parametric function

@example
@group
@var{x} = @var{fx} (@var{t})
@var{y} = @var{fy} (@var{t})
@end group
@end example

@noindent
is plotted over the domain @code{-2*pi <= @var{t} <= 2*pi} with 500 points.

If @var{dom} is a two element vector, it represents the minimum and maximum
values of both @var{x} and @var{y}, or @var{t} for a parametric plot.  If
@var{dom} is a four element vector, then the minimum and maximum values are
@code{[xmin xmax ymin ymax]}.

@var{n} is a scalar defining the number of points to use in plotting
the function.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a vector of graphics handles to
the created line objects.

@seealso{plot, ezplot3, ezpolar, ezcontour, ezcontourf, ezmesh, ezmeshc,
ezsurf, ezsurfc}
@end deftypefn
