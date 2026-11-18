# datenum

```octave
function [days, secs] = datenum (year, month = [], day = [], hour = 0, minute = 0, second = 0)
```

@deftypefn  {} {@var{days} =} datenum (@var{datevec})
@deftypefnx {} {@var{days} =} datenum (@var{year}, @var{month}, @var{day})
@deftypefnx {} {@var{days} =} datenum (@var{year}, @var{month}, @var{day}, @var{hour})
@deftypefnx {} {@var{days} =} datenum (@var{year}, @var{month}, @var{day}, @var{hour}, @var{minute})
@deftypefnx {} {@var{days} =} datenum (@var{year}, @var{month}, @var{day}, @var{hour}, @var{minute}, @var{second})
@deftypefnx {} {@var{days} =} datenum ("datestr")
@deftypefnx {} {@var{days} =} datenum ("datestr", @var{f})
@deftypefnx {} {@var{days} =} datenum ("datestr", @var{p})
@deftypefnx {} {[@var{days}, @var{secs}] =} datenum (@dots{})
Return the date/time input as a serial day number, with Jan 1, 0000
defined as day 1.

The integer part, @code{floor (@var{days})} counts the number of
complete days in the date input.

The fractional part, @code{rem (@var{days}, 1)} corresponds to the time
on the given day.

The input may be a date vector (@pxref{XREFdatevec,,@code{datevec}}),
date string (@pxref{XREFdatestr,,@code{datestr}}), or directly specified
as input.

When processing input datestrings, @var{f} is the format string used to
interpret date strings (@pxref{XREFdatestr,,@code{datestr}}).  If no
format @var{f} is specified, then a relatively slow search is performed
through various formats.  It is always preferable to specify the format
string @var{f} if it is known.  Formats which do not specify a particular
time component will have the value set to zero.  Formats which do not
specify a date will default to January 1st of the current year.

When passing separate @var{year}, @var{month}, @var{day}, etc.@: arguments,
each may be a scalar or nonscalar array.  Nonscalar inputs must all be of
the same size.  Scalar inputs will be expanded to be the size of the
nonscalar inputs.

@var{p} is the year at the start of the century to which two-digit years
will be referenced.  If not specified, it defaults to the current year
minus 50.

The optional output @var{secs} holds the time on the specified day with
greater precision than @var{days}.

Notes:

@itemize
@item
Years can be negative and/or fractional.

@item
Months below 1 are considered to be January.

@item
Days of the month start at 1.

@item
Days beyond the end of the month go into subsequent months.

@item
Days before the beginning of the month go to the previous month.

@item
Days can be fractional.
@end itemize

Examples:

@example
@group
Convert from datestrs:
d = datenum ("1966-06-14")
@xresult{} d = 718232
@end group

@group
d = datenum (@{"1966-06-14", "1966-06-15", "1966-06-16"@})
@xresult{} d =
      718232
      718233
      718234
@end group

@group
Convert from datevec:
d = datenum ([1966 06 14])
@xresult{} d = 718232
@end group

@group
d = datenum ([1966 06 14 23 59 59])
@xresult{} d = 718232.9999884259
@end group

@group
Specify date components separately:
d = datenum (1966, 6, 14)
@xresult{} d = 718232
@end group

@group
d = datenum (1966, magic(3), 1)
@xresult{} d =

      718280   718068   718219
      718127   718188   718249
      718158   718311   718099
@end group
@end example

@strong{Caution:} datenums represent a specific time for the Earth as a
whole.  They do not take in to account time zones (shifts in time based
on location), nor seasonal changes due to Daylight Savings Time (shifts in
time based on local regulation).  Be aware that it is possible to create
datenums that, when interpreted by a function which accounts for time zone
and DST shifts such as @code{datestr}, are nonexistent or ambiguous.

@strong{Caution:} this function does not attempt to handle Julian calendars
so dates before October 15, 1582 are wrong by as much as eleven days.  Also,
be aware that only Roman Catholic countries adopted the calendar in 1582.
It took until 1924 for it to be adopted everywhere.  See the Wikipedia entry
on the Gregorian calendar for more details.

@strong{Warning:} leap seconds are ignored.  A table of leap seconds is
available on the Wikipedia entry for leap seconds.

@seealso{datestr, datevec, now, clock, date}
@end deftypefn
