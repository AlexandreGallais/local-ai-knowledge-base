# errorbar

```octave
function h = errorbar (varargin)
```

@deftypefn  {} {} errorbar (@var{y}, @var{ey})
@deftypefnx {} {} errorbar (@var{y}, @dots{}, @var{fmt})
@deftypefnx {} {} errorbar (@var{x}, @var{y}, @var{ey})
@deftypefnx {} {} errorbar (@var{x}, @var{y}, @var{err}, @var{fmt})
@deftypefnx {} {} errorbar (@var{x}, @var{y}, @var{lerr}, @var{uerr}, @var{fmt})
@deftypefnx {} {} errorbar (@var{x}, @var{y}, @var{ex}, @var{ey}, @var{fmt})
@deftypefnx {} {} errorbar (@var{x}, @var{y}, @var{lx}, @var{ux}, @var{ly}, @var{uy}, @var{fmt})
@deftypefnx {} {} errorbar (@var{x1}, @var{y1}, @dots{}, @var{fmt}, @var{xn}, @var{yn}, @dots{})
@deftypefnx {} {} errorbar (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} errorbar (@dots{})
Create a 2-D plot with errorbars.

Many different combinations of arguments are possible.  The simplest form is

@example
errorbar (@var{y}, @var{ey})
@end example

@noindent
where the first argument is taken as the set of @var{y} coordinates, the
second argument @var{ey} are the errors around the @var{y} values, and the
@var{x} coordinates are taken to be the indices of the elements
(@code{1:numel (@var{y})}).

The general form of the function is

@example
errorbar (@var{x}, @var{y}, @var{err1}, @dots{}, @var{fmt}, @dots{})
@end example

@noindent
After the @var{x} and @var{y} arguments there can be 1, 2, or 4
parameters specifying the error values depending on the nature of the error
values and the plot format @var{fmt}.

@table @asis
@item @var{err} (scalar)
When the error is a scalar all points share the same error value.
The errorbars are symmetric and are drawn from @var{data}-@var{err} to
@var{data}+@var{err}.
The @var{fmt} argument determines whether @var{err} is in the x-direction,
y-direction (default), or both.

@item @var{err} (vector or matrix)
Each data point has a particular error value.
The errorbars are symmetric and are drawn from @var{data}(n)-@var{err}(n) to
@var{data}(n)+@var{err}(n).

@item @var{lerr}, @var{uerr} (scalar)
The errors have a single low-side value and a single upper-side value.
The errorbars are not symmetric and are drawn from @var{data}-@var{lerr} to
@var{data}+@var{uerr}.

@item @var{lerr}, @var{uerr} (vector or matrix)
Each data point has a low-side error and an upper-side error.
The errorbars are not symmetric and are drawn from
@var{data}(n)-@var{lerr}(n) to @var{data}(n)+@var{uerr}(n).
@end table

Any number of data sets (@var{x1},@var{y1}, @var{x2},@var{y2}, @dots{}) may
appear as long as they are separated by a format string @var{fmt}.

If @var{y} is a matrix, @var{x} and the error parameters must also be
matrices having the same dimensions.  The columns of @var{y} are plotted
versus the corresponding columns of @var{x} and errorbars are taken from
the corresponding columns of the error parameters.

If @var{fmt} is missing, the yerrorbars ("~") plot style is assumed.

If the @var{fmt} argument is supplied then it is interpreted, as in normal
plots, to specify the line style, marker, and color.  In addition,
@var{fmt} may include an errorbar style which @strong{must precede} the
ordinary format codes.  The following errorbar styles are supported:

@table @samp
@item ~
Set yerrorbars plot style (default).

@item >
Set xerrorbars plot style.

@item ~>
Set xyerrorbars plot style.

@item #~
Set yboxes plot style.

@item #
Set xboxes plot style.

@item #~>
Set xyboxes plot style.
@end table

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a handle to the hggroup object
representing the data plot and errorbars.

Note: For compatibility with @sc{matlab} a line is drawn through all data
points.  However, most scientific errorbar plots are a scatter plot of
points with errorbars.  To accomplish this, add a marker style to the
@var{fmt} argument such as @qcode{"."}.  Alternatively, remove the line
by modifying the returned graphic handle with
@code{set (h, "linestyle", "none")}.

Examples:

@example
errorbar (@var{x}, @var{y}, @var{ex}, ">.r")
@end example

@noindent
produces an xerrorbar plot of @var{y} versus @var{x} with @var{x}
errorbars drawn from @var{x}-@var{ex} to @var{x}+@var{ex}.  The marker
@qcode{"."} is used so no connecting line is drawn and the errorbars
appear in red.

@example
@group
errorbar (@var{x}, @var{y1}, @var{ey}, "~",
          @var{x}, @var{y2}, @var{ly}, @var{uy})
@end group
@end example

@noindent
produces yerrorbar plots with @var{y1} and @var{y2} versus @var{x}.
Errorbars for @var{y1} are drawn from @var{y1}-@var{ey} to
@var{y1}+@var{ey}, errorbars for @var{y2} from @var{y2}-@var{ly} to
@var{y2}+@var{uy}.

@example
@group
errorbar (@var{x}, @var{y}, @var{lx}, @var{ux},
          @var{ly}, @var{uy}, "~>")
@end group
@end example

@noindent
produces an xyerrorbar plot of @var{y} versus @var{x} in which
@var{x} errorbars are drawn from @var{x}-@var{lx} to @var{x}+@var{ux}
and @var{y} errorbars from @var{y}-@var{ly} to @var{y}+@var{uy}.
@seealso{semilogxerr, semilogyerr, loglogerr, plot}
@end deftypefn
