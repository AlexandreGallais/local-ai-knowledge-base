# flipud

```octave
function B = flipud (A)
```

@deftypefn {} {@var{B} =} flipud (@var{A})
Flip array upside down.

Return a copy of @var{A} with the order of the rows reversed.  In other
words, @var{A} is flipped upside-down about a horizontal axis.  For example:

@example
@group
flipud ([1, 2; 3, 4])
     @xresult{}  3  4
         1  2
@end group
@end example

@seealso{fliplr, flip, rot90, rotdim}
@end deftypefn
