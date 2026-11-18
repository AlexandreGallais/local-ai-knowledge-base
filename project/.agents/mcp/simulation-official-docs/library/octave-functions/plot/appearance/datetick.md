# datetick

```octave
function datetick (varargin)
```

@deftypefn  {} {} datetick ()
@deftypefnx {} {} datetick (@var{axis_str})
@deftypefnx {} {} datetick (@var{date_format})
@deftypefnx {} {} datetick (@var{axis_str}, @var{date_format})
@deftypefnx {} {} datetick (@dots{}, "keeplimits")
@deftypefnx {} {} datetick (@dots{}, "keepticks")
@deftypefnx {} {} datetick (@var{hax}, @dots{})
Add date-formatted tick labels to an axis.

The axis to apply the ticks to is determined by @var{axis_str} which can
take the values @qcode{"x"}, @qcode{"y"}, or @qcode{"z"}.  The default
value is @qcode{"x"}.

The formatting of the labels is determined by the variable
@var{date_format}, which can either be a string or positive integer that
@code{datestr} accepts.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

@seealso{datenum, datestr}
@end deftypefn
