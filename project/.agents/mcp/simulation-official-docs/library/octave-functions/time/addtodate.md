# addtodate

```octave
function d = addtodate (d, q, f)
```

@deftypefn {} {@var{d} =} addtodate (@var{d}, @var{q}, @var{f})
Add @var{q} amount of time (with units @var{f}) to the serial datenum,
@var{d}.

@var{f} must be one of @qcode{"year"}, @qcode{"month"}, @qcode{"day"},
@qcode{"hour"}, @qcode{"minute"}, @qcode{"second"}, or
@qcode{"millisecond"}.
@seealso{datenum, datevec, etime}
@end deftypefn
