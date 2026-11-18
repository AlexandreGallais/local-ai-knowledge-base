# strtrunc

```octave
function s = strtrunc (s, n)
```

@deftypefn {} {@var{s} =} strtrunc (@var{s}, @var{n})
Truncate the character string @var{s} to length @var{n}.

If @var{s} is a character matrix, then the number of columns is adjusted.

If @var{s} is a cell array of strings, then the operation is performed
on each cell element and the new cell array is returned.
@end deftypefn
