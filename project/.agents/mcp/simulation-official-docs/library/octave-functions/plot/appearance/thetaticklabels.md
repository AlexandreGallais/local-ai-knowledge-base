# thetaticklabels

```octave
function labels = thetaticklabels (varargin)
```

@deftypefn  {} {@var{labels} =} thetaticklabels
@deftypefnx {} {} thetaticklabels (@var{tickval})
@deftypefnx {} {@dots{} =} thetaticklabels (@var{hax}, @dots{})
Query or set the tick labels on the theta-axis of a polar plot.

When called without an argument, return a cell array of strings of the
current ttick labels.

When called with the argument @var{tickval} being a vector of numbers or
a cell array of strings and/or numbers, the labels will be changed to
match these new values.  Values will be applied starting with the
zero-degree tick mark and will progress counterclockwise.

If fewer labels are specified than the current number of theta tick marks,
those labels will be applied starting at the zero-degree tick mark and
blank labels will be appended to the remainder.  If the specified label
count exceeds the number of tick labels, the excess labels are ignored.

If the first argument @var{hax} is an axes handle, then operate on
this axis rather than the current axes returned by @code{gca}.

Requesting a return value when calling @code{thetaticklabels} to set a
property value will result in an error.

Compatibility Note: The @qcode{'mode'} property for thetaticklabels has not
yet been implemented.

@seealso{polar, thetaticks, rticklabels, xticklabels, yticklabels,
zticklabels, get, set}
@end deftypefn
