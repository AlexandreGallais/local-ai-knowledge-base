# fliplr

```octave
function B = fliplr (A)
```

@deftypefn {} {@var{B} =} fliplr (@var{A})
Flip array left to right.

Return a copy of @var{A} with the order of the columns reversed.  In other
words, @var{A} is flipped left-to-right about a vertical axis.  For example:

@example
@group
fliplr ([1, 2; 3, 4])
     @xresult{}  2  1
         4  3
@end group
@end example

@seealso{flipud, flip, rot90, rotdim}
@end deftypefn
