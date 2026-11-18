# datestr

```octave
function retval = datestr (date, f = [], p = [])
```

@deftypefn  {} {@var{str} =} datestr (@var{date})
@deftypefnx {} {@var{str} =} datestr (@var{date}, @var{f})
@deftypefnx {} {@var{str} =} datestr (@var{date}, @var{f}, @var{p})
Format the given date/time according to the format @var{f} and return
the result in @var{str}.

@var{date} is a serial date number (@pxref{XREFdatenum,,@code{datenum}}), a
date vector (@pxref{XREFdatevec,,@code{datevec}}), or a string or cell array
of strings.  In the latter case, it is passed to @code{datevec} to guess the
input date format.

@var{f} can be an integer which corresponds to one of the codes in the table
below, or a date format string.

@var{p} is the year at the start of the century in which two-digit years are
to be interpreted in.  If not specified, it defaults to the current year
minus 50.

For example, the date 730736.65149 (2000-09-07 15:38:09.0934) would be
formatted as follows:

@multitable @columnfractions 0.1 0.45 0.35
@headitem Code @tab Format @tab Example
@item 0 @tab dd-mmm-yyyy HH:MM:SS    @tab 07-Sep-2000 15:38:09
@item 1 @tab dd-mmm-yyyy             @tab 07-Sep-2000
@item 2 @tab mm/dd/yy                @tab 09/07/00
@item 3 @tab mmm                     @tab Sep
@item 4 @tab m                       @tab S
@item 5 @tab mm                      @tab 09
@item 6 @tab mm/dd                   @tab 09/07
@item 7 @tab dd                      @tab 07
@item 8 @tab ddd                     @tab Thu
@item 9 @tab d                       @tab T
@item 10 @tab yyyy                   @tab 2000
@item 11 @tab yy                     @tab 00
@item 12 @tab mmmyy                  @tab Sep00
@item 13 @tab HH:MM:SS               @tab 15:38:09
@item 14 @tab HH:MM:SS PM            @tab  3:38:09 PM
@item 15 @tab HH:MM                  @tab 15:38
@item 16 @tab HH:MM PM               @tab  3:38 PM
@item 17 @tab QQ-YY                  @tab Q3-00
@item 18 @tab QQ                     @tab Q3
@item 19 @tab dd/mm                  @tab 07/09
@item 20 @tab dd/mm/yy               @tab 07/09/00
@item 21 @tab mmm.dd,yyyy HH:MM:SS   @tab Sep.07,2000 15:38:08
@item 22 @tab mmm.dd,yyyy            @tab Sep.07,2000
@item 23 @tab mm/dd/yyyy             @tab 09/07/2000
@item 24 @tab dd/mm/yyyy             @tab 07/09/2000
@item 25 @tab yy/mm/dd               @tab 00/09/07
@item 26 @tab yyyy/mm/dd             @tab 2000/09/07
@item 27 @tab QQ-YYYY                @tab Q3-2000
@item 28 @tab mmmyyyy                @tab Sep2000
@item 29 @tab yyyy-mm-dd             @tab 2000-09-07
@item 30 @tab yyyymmddTHHMMSS        @tab 20000907T153808
@item 31 @tab yyyy-mm-dd HH:MM:SS    @tab 2000-09-07 15:38:08
@end multitable

If @var{f} is a format string, the following symbols are recognized:

@multitable @columnfractions 0.1 0.7 0.2
@headitem Symbol @tab Meaning @tab Example
@item yyyy @tab Full year                                    @tab 2005
@item yy   @tab Two-digit year                               @tab 05
@item mmmm @tab Full month name                              @tab December
@item mmm  @tab Abbreviated month name                       @tab Dec
@item mm   @tab Numeric month number (padded with zeros)     @tab 01, 08, 12
@item m    @tab First letter of month name (capitalized)     @tab D
@item dddd @tab Full weekday name                            @tab Sunday
@item ddd  @tab Abbreviated weekday name                     @tab Sun
@item dd   @tab Numeric day of month (padded with zeros)     @tab 11
@item d    @tab First letter of weekday name (capitalized)   @tab S
@item HH   @tab Hour of day, padded with zeros,              @tab 09:00
@item      @tab or padded with spaces if PM is set           @tab  9:00 AM
@item MM   @tab Minute of hour (padded with zeros)           @tab 10:05
@item SS   @tab Second of minute (padded with zeros)         @tab 10:05:03
@item FFF  @tab Milliseconds of second (padded with zeros)   @tab 10:05:03.012
@item AM   @tab Use 12-hour time format                      @tab 11:30 AM
@item PM   @tab Use 12-hour time format                      @tab 11:30 PM
@end multitable

If @var{f} is not specified or is @code{-1}, then use 0, 1 or 16, depending
on whether the date portion or the time portion of @var{date} is empty.

If @var{p} is not specified, it defaults to the current year minus 50.

If a matrix or cell array of dates is given, a column vector of date strings
is returned.

@seealso{datenum, datevec, date, now, clock}
@end deftypefn
