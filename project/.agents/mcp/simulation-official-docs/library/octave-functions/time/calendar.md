# calendar

```octave
function c = calendar (y, m)
```

@deftypefn  {} {@var{c} =} calendar ()
@deftypefnx {} {@var{c} =} calendar (@var{d})
@deftypefnx {} {@var{c} =} calendar (@var{y}, @var{m})
@deftypefnx {} {} calendar (@dots{})
Return the current monthly calendar in a 6x7 matrix.

If @var{d} is specified, return the calendar for the month containing the
date @var{d}, which must be a serial date number or a date string.

If @var{y} and @var{m} are specified, return the calendar for year @var{y}
and month @var{m}.

If no output arguments are specified, print the calendar on the screen
instead of returning a matrix.
@seealso{datenum, datestr}
@end deftypefn
