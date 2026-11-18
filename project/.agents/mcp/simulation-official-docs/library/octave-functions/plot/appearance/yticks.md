# yticks

```octave
function tickval = yticks (varargin)
```

@deftypefn  {} {@var{tickval} =} yticks
@deftypefnx {} {@var{mode} =} yticks ("mode")
@deftypefnx {} {} yticks (@var{tickval})
@deftypefnx {} {} yticks ("auto")
@deftypefnx {} {} yticks ("manual")
@deftypefnx {} {@dots{} =} yticks (@var{hax}, @dots{})
Query or set the tick values on the y-axis of the current axis.

When called without an argument, return the current tick locations as
specified in the @qcode{"ytick"} axes property.  These locations can be
changed by calling @code{yticks} with a vector of tick values.  Note:
ascending order is not required.

When called with argument @qcode{"mode"}, @code{yticks} returns the current
value of the axes property @qcode{"ytickmode"}.  This property can be
changed by calling @code{yticks} with either @qcode{"auto"} (algorithm
determines tick positions) or @qcode{"manual"} (tick values remain fixed
regardless of axes resizing or rotation).  Note: Specifying ytick values
will also set the property @qcode{"ytickmode"} to @qcode{"manual"}.

If the first argument @var{hax} is an axes handle, then operate on
this axis rather than the current axes returned by @code{gca}.

Requesting a return value when calling @code{yticks} to set a property value
will result in an error.

@seealso{yticklabels, xticks, zticks, rticks, thetaticks, get, set}
@end deftypefn
