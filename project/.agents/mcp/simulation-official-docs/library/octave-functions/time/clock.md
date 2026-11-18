# clock

```octave
function [datevec, isdst] = clock ()
```

@deftypefn  {} {@var{datevec} =} clock ()
@deftypefnx {} {[@var{datevec}, @var{isdst}] =} clock ()
Return the current local date and time as a date vector.

The date vector contains the following fields: current year, month (1-12),
day (1-31), hour (0-23), minute (0-59), and second (0-61).  The seconds
field has a fractional part after the decimal point for extended accuracy.

The optional second output @var{isdst} is true if Daylight Savings Time
(DST) is in effect for the system's time zone.

For example:

@example
@group
fix (clock ())
  @xresult{}   1993      8     20      4     56      1
@end group
@end example

@code{clock} is more accurate on systems that have the @code{gettimeofday}
function.
@seealso{now, date, datevec}
@end deftypefn
