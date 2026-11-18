# magic

```octave
function M = magic (n)
```

@deftypefn {} {@var{M} =} magic (@var{n})

Create an @var{n}-by-@var{n} magic square.

A magic square is an arrangement of the integers @code{1:n^2} such that the
row sums, column sums, and diagonal sums are all equal to the same value.

Note: @var{n} must be a scalar greater than or equal to 3.  If you supply
@var{n} less than 3, magic returns either a nonmagic square, or else the
degenerate magic squares 1 and [].
@end deftypefn
