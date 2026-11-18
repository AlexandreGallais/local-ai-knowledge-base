# ytickangle

```octave
function angle = ytickangle (hax, angle)
```

@deftypefn  {} {@var{angle} =} ytickangle ()
@deftypefnx {} {@var{angle} =} ytickangle (@var{hax})
@deftypefnx {} {} ytickangle (@var{angle})
@deftypefnx {} {} ytickangle (@var{hax}, @var{angle})
Query or set the rotation angle of the tick labels on the y-axis of the
current axes.

When called without an argument, return the rotation angle in degrees of the
tick labels as specified in the axes property @qcode{"YTickLabelRotation"}.
When called with a numeric scalar @var{angle}, rotate the tick labels
counterclockwise to @var{angle} degrees.

If the first argument @var{hax} is an axes handle, then operate on this axes
rather than the current axes returned by @code{gca}.

Programming Notes:
@enumerate
@item
The @qcode{"YTickLabelRotation"} property is @emph{not} currently
implemented in Octave.  The property can be set and queried, but has no
effect on the plot.

@item
Requesting a return value while also setting a specified rotation will
result in an error.
@end enumerate

@seealso{xtickangle, ztickangle, get, set}
@end deftypefn
