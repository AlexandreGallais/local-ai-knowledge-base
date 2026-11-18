# now

```octave
function t = now ()
```

@deftypefn {} {t =} now ()
Return the current local date/time as a serial day number
(@pxref{XREFdatenum,,@code{datenum}}).

The integral part, @code{floor (now)} corresponds to the number of days
between today and Jan 1, 0000.

The fractional part, @code{rem (now, 1)} corresponds to the current time.
@seealso{clock, date, datenum}
@end deftypefn
