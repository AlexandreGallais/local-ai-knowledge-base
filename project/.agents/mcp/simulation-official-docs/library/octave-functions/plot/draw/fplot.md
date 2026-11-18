# fplot

```octave
function [X, Y] = fplot (varargin)
```

@deftypefn  {} {} fplot (@var{fcn})
@deftypefnx {} {} fplot (@var{fcn}, @var{limits})
@deftypefnx {} {} fplot (@dots{}, @var{tol})
@deftypefnx {} {} fplot (@dots{}, @var{n})
@deftypefnx {} {} fplot (@dots{}, @var{fmt})
@deftypefnx {} {} fplot (@dots{}, @var{property}, @var{value}, @dots{})
@deftypefnx {} {} fplot (@var{hax}, @dots{})
@deftypefnx {} {[@var{x}, @var{y}] =} fplot (@dots{})
Plot a function @var{fcn} within the range defined by @var{limits}.

@var{fcn} is a function handle, inline function, or string containing the
name of the function to evaluate.

The limits of the plot are of the form @w{@code{[@var{xlo}, @var{xhi}]}}@ or
@w{@code{[@var{xlo}, @var{xhi}, @var{ylo}, @var{yhi}]}}.  If no limits
are specified the default is @code{[-5, 5]}.

The next three arguments are all optional and any number of them may be
given in any order.

@var{tol} is the relative tolerance to use for the plot and defaults
to 2e-3 (.2%).

@var{n} is the minimum number of points to use.  When @var{n} is specified,
the maximum stepsize will be @code{(@var{xhi} - @var{xlo}) / @var{n}}.  More
than @var{n} points may still be used in order to meet the relative
tolerance requirement.

The @var{fmt} argument specifies the linestyle to be used by the plot
command.

Multiple property-value pairs may also be specified, but they must appear
in pairs.  These arguments are applied to the line objects drawn by
@code{plot}.

The full list of line properties is documented at @ref{Line Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

With no output arguments, the results are immediately plotted.  With two
output arguments, the 2-D plot data is returned.  The data can subsequently
be plotted manually with @code{plot (@var{x}, @var{y})}.

Example:

@example
@group
fplot (@@cos, [0, 2*pi])
fplot ("[cos(x), sin(x)]", [0, 2*pi])
@end group
@end example

Programming Notes:

@code{fplot} works best with continuous functions.  Functions with
discontinuities are unlikely to plot well.  This restriction may be removed
in the future.

@code{fplot} performance is better when the function accepts and returns a
vector argument.  Consider this when writing user-defined functions and use
element-by-element operators such as @code{.*}, @code{./}, etc.

@seealso{ezplot, plot}
@end deftypefn
