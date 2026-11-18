# namelengthmax

```octave
function n = namelengthmax ()
```

@deftypefn {} {@var{n} =} namelengthmax ()
Return the @sc{matlab} compatible maximum variable name length.

Octave is capable of storing strings up to @math{2^{31} - 1} in length.
However for @sc{matlab} compatibility all variable, function, and structure
field names should be shorter than the length returned by
@code{namelengthmax}.  In particular, variables stored to a @sc{matlab} file
format (@file{*.mat}) will have their names truncated to this length.
@end deftypefn
