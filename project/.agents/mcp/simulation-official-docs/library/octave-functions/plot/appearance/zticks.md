# zticks

```octave
function tickval = zticks (varargin)
```

@deftypefn  {} {@var{tickval} =} zticks
@deftypefnx {} {@var{mode} =} zticks ("mode")
@deftypefnx {} {} zticks (@var{tickval})
@deftypefnx {} {} zticks ("auto")
@deftypefnx {} {} zticks ("manual")
@deftypefnx {} {@dots{} =} zticks (@var{hax}, @dots{})
Query or set the tick values on the z-axis of the current axis.

When called without an argument, return the current tick locations as
specified in the @qcode{"ztick"} axes property.  These locations can be
changed by calling @code{zticks} with a vector of tick values.  Note:
ascending order is not required.

When called with argument @qcode{"mode"}, @code{zticks} returns the current
value of the axes property @qcode{"ztickmode"}.  This property can be
changed by calling @code{zticks} with either @qcode{"auto"} (algorithm
determines tick positions) or @qcode{"manual"} (tick values remain fixed
regardless of axes resizing or rotation).  Note: Specifying ztick values
will also set the property @qcode{"ztickmode"} to @qcode{"manual"}.

If the first argument @var{hax} is an axes handle, then operate on
this axis rather than the current axes returned by @code{gca}.

Requesting a return value when calling @code{zticks} to set a property value
will result in an error.

@seealso{zticklabels, xticks, yticks, rticks, thetaticks, get, set}
@end deftypefn
