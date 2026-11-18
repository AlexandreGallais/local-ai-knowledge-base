# weekday

```octave
function [d, s] = weekday (d, format = "short")
```

@deftypefn  {} {[@var{n}, @var{s}] =} weekday (@var{d})
@deftypefnx {} {[@var{n}, @var{s}] =} weekday (@var{d}, @var{format})
Return the day of the week as a number in @var{n} and as a string in
@var{s}.

The days of the week are numbered 1--7 with the first day being Sunday.

@var{d} is a serial date number or a date string.

If the string @var{format} is not present or is equal to @qcode{"short"}
then @var{s} will contain the abbreviated name of the weekday.  If
@var{format} is @qcode{"long"} then @var{s} will contain the full name.

Table of return values based on @var{format}:

@multitable @columnfractions .06 .13 .16
@headitem @var{n} @tab @qcode{"short"} @tab @qcode{"long"}
@item 1 @tab Sun @tab Sunday
@item 2 @tab Mon @tab Monday
@item 3 @tab Tue @tab Tuesday
@item 4 @tab Wed @tab Wednesday
@item 5 @tab Thu @tab Thursday
@item 6 @tab Fri @tab Friday
@item 7 @tab Sat @tab Saturday
@end multitable

@seealso{eomday, is_leap_year, calendar, datenum, datevec}
@end deftypefn
