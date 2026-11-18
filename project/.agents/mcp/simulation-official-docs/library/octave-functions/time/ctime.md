# ctime

```octave
function str = ctime (t)
```

@deftypefn {} {@var{str} =} ctime (@var{t})
Convert a value returned from @code{time} (or any other non-negative
integer), to the local time and return a string of the same form as
@code{asctime}.

The function @code{ctime (time)} is equivalent to
@code{asctime (localtime (time))}.  For example:

@example
@group
ctime (time ())
   @xresult{} "Mon Feb 17 01:15:06 1997@backslashchar{}n"
@end group
@end example
@seealso{asctime, time, localtime}
@end deftypefn
