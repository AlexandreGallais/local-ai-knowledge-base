# symvar

```octave
function vars = symvar (str)
```

@deftypefn {} {@var{vars} =} symvar (@var{str})
Identify the symbolic variable names in the string @var{str}.

Common constant names such as @code{i}, @code{j}, @code{pi}, @code{Inf} and
Octave functions such as @code{sin} or @code{plot} are ignored.

Any names identified are returned in a cell array of strings.  The array is
empty if no variables were found.

Example:

@example
@group
symvar ("x^2 + y^2 == 4")
@xresult{} @{
     [1,1] = x
     [2,1] = y
   @}
@end group
@end example
@end deftypefn
