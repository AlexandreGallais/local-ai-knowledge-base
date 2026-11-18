# xticks

```octave
function tickval = xticks (varargin)
```

@deftypefn  {} {@var{tickval} =} xticks
@deftypefnx {} {@var{mode} =} xticks ("mode")
@deftypefnx {} {} xticks (@var{tickval})
@deftypefnx {} {} xticks ("auto")
@deftypefnx {} {} xticks ("manual")
@deftypefnx {} {@dots{} =} xticks (@var{hax}, @dots{})
Query or set the tick values on the x-axis of the current axis.

When called without an argument, return the current tick locations as
specified in the @qcode{"xtick"} axes property.  These locations can be
changed by calling @code{xticks} with a vector of tick values.  Note:
ascending order is not required.

When called with argument @qcode{"mode"}, @code{xticks} returns the current
value of the axes property @qcode{"xtickmode"}.  This property can be
changed by calling @code{xticks} with either @qcode{"auto"} (algorithm
determines tick positions) or @qcode{"manual"} (tick values remain fixed
regardless of axes resizing or rotation).  Note: Specifying xtick values
will also set the property @qcode{"xtickmode"} to @qcode{"manual"}.

If the first argument @var{hax} is an axes handle, then operate on
this axis rather than the current axes returned by @code{gca}.

Requesting a return value when calling @code{xticks} to set a property value
will result in an error.

@seealso{xticklabels, yticks, zticks, rticks, thetaticks, get, set}
@end deftypefn
