# xticklabels

```octave
function labels = xticklabels (varargin)
```

@deftypefn  {} {@var{labels} =} xticklabels
@deftypefnx {} {@var{mode} =} xticklabels ("mode")
@deftypefnx {} {} xticklabels (@var{tickval})
@deftypefnx {} {} xticklabels ("auto")
@deftypefnx {} {} xticklabels ("manual")
@deftypefnx {} {@dots{} =} xticklabels (@var{hax}, @dots{})
Query or set the tick labels on the x-axis of the current axis.

When called without an argument, return a cell array of strings of the
current tick labels as specified in the @qcode{"xticklabel"} axes property.
These labels can be changed by calling @code{xticklabels} with a cell array
of strings.  Note: a vector of numbers will be mapped to a cell array of
strings.  If fewer labels are specified than the current number of ticks,
blank labels will be appended to the array.

When called with argument @qcode{"mode"}, @code{xticklabels} returns the
current value of the axes property @qcode{"xticklabelmode"}.  This property
can be changed by calling @code{xticklabels} with either @qcode{"auto"}
(algorithm determines tick labels) or @qcode{"manual"} (tick labels remain
fixed).  Note: Specifying xticklabel values will also set the
@qcode{"xticklabelmode"} and @qcode{"xticks"} properties to
@qcode{"manual"}.

If the first argument @var{hax} is an axes handle, then operate on
this axis rather than the current axes returned by @code{gca}.

Requesting a return value when calling @code{xticklabels} to set a property
value will result in an error.

@seealso{xticks, yticklabels, zticklabels, get, set}
@end deftypefn
