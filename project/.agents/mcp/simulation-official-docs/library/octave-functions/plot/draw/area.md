# area

```octave
function h = area (varargin)
```

@deftypefn  {} {} area (@var{y})
@deftypefnx {} {} area (@var{x}, @var{y})
@deftypefnx {} {} area (@dots{}, @var{lvl})
@deftypefnx {} {} area (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} area (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} area (@dots{})
Area plot of the columns of @var{y}.

This plot shows the contributions of each column value to the row sum.
It is functionally similar to @code{plot (@var{x}, cumsum (@var{y}, 2))},
except that the area under the curve is shaded.

If the @var{x} argument is omitted it defaults to @code{1:rows (@var{y})}.
A value @var{lvl} can be defined that determines where the base level of
the shading under the curve should be defined.  The default level is 0.

Additional property/value pairs are passed directly to the underlying patch
object.  The full list of properties is documented at @ref{Patch Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the hggroup
object comprising the area patch objects.  The @qcode{"BaseValue"} property
of the hggroup can be used to adjust the level where shading begins.

Example: Verify identity sin^2 + cos^2 = 1

@example
@group
t = linspace (0, 2*pi, 100)';
y = [sin(t).^2, cos(t).^2];
area (t, y);
legend ("sin^2", "cos^2", "location", "NorthEastOutside");
@end group
@end example
@seealso{plot, patch}
@end deftypefn
