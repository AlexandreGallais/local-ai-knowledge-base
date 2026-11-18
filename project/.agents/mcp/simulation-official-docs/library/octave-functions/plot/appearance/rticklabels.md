# rticklabels

```octave
function labels = rticklabels (varargin)
```

@deftypefn  {} {@var{labels} =} rticklabels
@deftypefnx {} {} rticklabels (@var{tickval})
@deftypefnx {} {@dots{} =} rticklabels (@var{hax}, @dots{})
Query or set the tick labels on the r-axis of a polar plot.

When called without an argument, return a cell array of strings of the
current rtick labels.

When called with the argument @var{tickval} being a vector of numbers or
a cell array of strings and/or numbers, the labels will be changed to
match these new values.  Note that the center point of the plots made by
@code{polar} are never labeled, so the first specified label will be
applied to the second rtick location and subsequent labels will progress
outward.

If fewer labels are specified than the current number of tick marks, those
labels will be applied starting with the innermost tick labels, and blank
labels will be appended to the remainder.  If the specified label count
exceeds the number of tick labels, the excess labels are ignored.

If the first argument @var{hax} is an axes handle, then operate on
this axis rather than the current axes returned by @code{gca}.

Requesting a return value when calling @code{rticklabels} to set a property
value will result in an error.

Compatibility Note: The @qcode{'mode'} property for rticklabels has not yet
been implemented.

@seealso{polar, rticks, thetaticklabels, xticklabels, yticklabels,
zticklabels, get, set}
@end deftypefn
