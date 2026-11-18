# zticklabels

```octave
function labels = zticklabels (varargin)
```

@deftypefn  {} {@var{labels} =} zticklabels
@deftypefnx {} {@var{mode} =} zticklabels ("mode")
@deftypefnx {} {} zticklabels (@var{tickval})
@deftypefnx {} {} zticklabels ("auto")
@deftypefnx {} {} zticklabels ("manual")
@deftypefnx {} {@dots{} =} zticklabels (@var{hax}, @dots{})
Query or set the tick labels on the x-axis of the current axis.

When called without an argument, return a cell array of strings of the
current tick labels as specified in the @qcode{"zticklabel"} axes property.
These labels can be changed by calling @code{zticklabels} with a cell array
of strings.  Note: a vector of numbers will be mapped to a cell array of
strings.  If fewer labels are specified than the current number of ticks,
blank labels will be appended to the array.

When called with argument @qcode{"mode"}, @code{zticklabels} returns the
current value of the axes property @qcode{"zticklabelmode"}.  This property
can be changed by calling @code{zticklabels} with either @qcode{"auto"}
(algorithm determines tick labels) or @qcode{"manual"} (tick labels remain
fixed).  Note: Specifying zticklabel values will also set the
@qcode{"zticklabelmode"} and @qcode{"zticks"} properties to
@qcode{"manual"}.

If the first argument @var{hax} is an axes handle, then operate on
this axis rather than the current axes returned by @code{gca}.

Requesting a return value when calling @code{xticklabels} to set a property
value will result in an error.

@seealso{zticks, xticklabels, zticklabels, get, set}
@end deftypefn
