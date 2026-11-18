# is_leap_year

```octave
function tf = is_leap_year (year)
```

@deftypefn  {} {@var{tf} =} is_leap_year ()
@deftypefnx {} {@var{tf} =} is_leap_year (@var{year})
Return true if @var{year} is a leap year and false otherwise.

If no year is specified, @code{is_leap_year} uses the current year.

For example:

@example
@group
is_leap_year (2000)
   @xresult{} 1
@end group
@end example
@seealso{weekday, eomday, calendar}
@end deftypefn
