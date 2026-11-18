# yticklabels

```octave
function labels = yticklabels (varargin)
```

@deftypefn  {} {@var{labels} =} yticklabels
@deftypefnx {} {@var{mode} =} yticklabels ("mode")
@deftypefnx {} {} yticklabels (@var{tickval})
@deftypefnx {} {} yticklabels ("auto")
@deftypefnx {} {} yticklabels ("manual")
@deftypefnx {} {@dots{} =} yticklabels (@var{hax}, @dots{})
Query or set the tick labels on the x-axis of the current axis.

When called without an argument, return a cell array of strings of the
current tick labels as specified in the @qcode{"yticklabel"} axes property.
These labels can be changed by calling @code{yticklabels} with a cell array
of strings.  Note: a vector of numbers will be mapped to a cell array of
strings.  If fewer labels are specified than the current number of ticks,
blank labels will be appended to the array.

When called with argument @qcode{"mode"}, @code{yticklabels} returns the
current value of the axes property @qcode{"yticklabelmode"}.  This property
can be changed by calling @code{yticklabels} with either @qcode{"auto"}
(algorithm determines tick labels) or @qcode{"manual"} (tick labels remain
fixed).  Note: Specifying yticklabel values will also set the
@qcode{"yticklabelmode"} and @qcode{"yticks"} properties to
@qcode{"manual"}.

If the first argument @var{hax} is an axes handle, then operate on
this axis rather than the current axes returned by @code{gca}.

Requesting a return value when calling @code{xticklabels} to set a property
value will result in an error.

@seealso{yticks, xticklabels, zticklabels, get, set}
@end deftypefn
