# datevec

```octave
function [y, m, d, h, mi, s] = datevec (date, f = [], p = [])
```

@deftypefn  {} {@var{v} =} datevec (@var{date})
@deftypefnx {} {@var{v} =} datevec (@var{date}, @var{f})
@deftypefnx {} {@var{v} =} datevec (@var{date}, @var{p})
@deftypefnx {} {@var{v} =} datevec (@var{date}, @var{f}, @var{p})
@deftypefnx {} {[@var{y}, @var{m}, @var{d}, @var{h}, @var{mi}, @var{s}] =} datevec (@dots{})
Convert a serial date number (@pxref{XREFdatenum,,@code{datenum}}) or date
string (@pxref{XREFdatestr,,@code{datestr}}) into a date vector.

A date vector is a row vector with six members, representing the year,
month, day, hour, minute, and seconds respectively.

Date number inputs can be either a scalar or nonscalar array.  Date string
inputs can be either a single date string, a two-dimensional character
array of dates with each row being a date string, or a cell string array of
any dimension with each cell element containing a single date string.

@var{v} is a two-dimensional array of date vectors, one date vector per
row.  For array inputs, ordering of @var{v} is based on column major order
of dates in @var{data}.

@var{f} is the format string used to interpret date strings
(@pxref{XREFdatestr,,@code{datestr}}).  If @var{date} is a string or a cell
array of strings, but no format is specified, heuristics are used to guess
the input format.  These heuristics could lead to matches that differ from
the result a user might expect.  Additionally, this involves a relatively
slow search through various formats.  It is always preferable to specify
the format string @var{f} if it is known.  Formats which do not specify a
particular time component will have the value set to zero.  Formats which
do not specify a particular date component will default that component to
January 1st of the current year.  Trailing characters are ignored for the
purpose of calculating the date vector, even if the characters contain
additional time/date information.

@var{p} is the year at the start of the century to which two-digit years
will be referenced.  If not specified, it defaults to the current year
minus 50.
@seealso{datenum, datestr, clock, now, date}
@end deftypefn
