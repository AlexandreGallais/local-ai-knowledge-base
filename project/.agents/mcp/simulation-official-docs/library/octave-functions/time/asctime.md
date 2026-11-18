# asctime

```octave
function str = asctime (tm_struct)
```

@deftypefn {} {@var{str} =} asctime (@var{tm_struct})
Convert a time structure to a string using the following
format: @qcode{"ddd mmm mm HH:MM:SS yyyy@backslashchar{}n"}.

For example:

@example
@group
asctime (localtime (time ()))
     @xresult{} "Mon Feb 17 01:15:06 1997@backslashchar{}n"
@end group
@end example

This is equivalent to @code{ctime (time ())}.
@seealso{ctime, localtime, time}
@end deftypefn
