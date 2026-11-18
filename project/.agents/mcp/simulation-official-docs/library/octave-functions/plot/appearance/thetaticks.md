# thetaticks

```octave
function tickval = thetaticks (varargin)
```

@deftypefn  {} {@var{tickval} =} thetaticks
@deftypefnx {} {} thetaticks (@var{tickval})
@deftypefnx {} {@dots{} =} thetaticks (@var{hax}, @dots{})
Query or set the tick values on the theta-axis of the current axis.

When called without argument, return the current tick locations as specified
in the @qcode{"ttick"} axes property.  These locations can be changed by
calling @code{thetaticks} with a vector of tick values.  Note: ascending
order is not required.

If the first argument @var{hax} is an axes handle, then operate on
this axis rather than the current axes returned by @code{gca}.

Requesting a return value when calling @code{thetaticks} to set a property
value will result in an error.

NOTE: Octave does not currently implement polaraxes objects.  It is
therefore not possible to query or set a @qcode{"mode"} for the
@qcode{"thetatick"} property as can be done with the equivalent functions
for @var{x}, @var{y}, and @var{z} axes.

@seealso{rticks, xticks, yticks, zticks, polar, get, set}
@end deftypefn
