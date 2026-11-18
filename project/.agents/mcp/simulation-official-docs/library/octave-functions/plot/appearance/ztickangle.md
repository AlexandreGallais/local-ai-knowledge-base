# ztickangle

```octave
function angle = ztickangle (hax, angle)
```

@deftypefn  {} {@var{angle} =} ztickangle ()
@deftypefnx {} {@var{angle} =} ztickangle (@var{hax})
@deftypefnx {} {} ztickangle (@var{angle})
@deftypefnx {} {} ztickangle (@var{hax}, @var{angle})
Query or set the rotation angle of the tick labels on the z-axis of the
current axes.

When called without an argument, return the rotation angle in degrees of the
tick labels as specified in the axes property @qcode{"ZTickLabelRotation"}.
When called with a numeric scalar @var{angle}, rotate the tick labels
counterclockwise to @var{angle} degrees.

If the first argument @var{hax} is an axes handle, then operate on this axes
rather than the current axes returned by @code{gca}.

Programming Notes:
@enumerate
@item
The @qcode{"ZTickLabelRotation"} property is @emph{not} currently
implemented in Octave.  The property can be set and queried, but has no
effect on the plot.

@item
Requesting a return value while also setting a specified rotation will
result in an error.
@end enumerate

@seealso{xtickangle, ytickangle, get, set}
@end deftypefn
