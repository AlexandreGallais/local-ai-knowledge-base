# circshift

```octave
function y = circshift (x, n, dim)
```

@deftypefn  {} {@var{y} =} circshift (@var{x}, @var{n})
@deftypefnx {} {@var{y} =} circshift (@var{x}, @var{n}, @var{dim})
Circularly shift the values of the array @var{x}.

@var{n} must be a vector of integers no longer than the number of dimensions
in @var{x}.  The values of @var{n} can be either positive or negative, which
determines the direction in which the values of @var{x} are shifted.  If an
element of @var{n} is zero, then the corresponding dimension of @var{x} will
not be shifted.  If @var{n} is a scalar and no @var{dim} is specified then
the shift is applied to the first non-singular dimension.

If a scalar @var{dim} is given then operate along the specified dimension.
In this case @var{n} must be a scalar as well.

Examples:

@example
x = [1, 2, 3;
     4, 5, 6;
     7, 8, 9];
## positive shift on rows (1st non-singular dim)
circshift (x, 1)
  @xresult{}
       7   8   9
       1   2   3
       4   5   6
## negative shift on rows (1st non-singular dim)
circshift (x, -2)
  @xresult{}
       7   8   9
       1   2   3
       4   5   6
## no shift of rows, shift columns by 1 (2nd dimension)
circshift (x, [0,1])
  @xresult{}
       3   1   2
       6   4   5
       9   7   8
## shift columns (2nd dimension)
circshift (x, 1, 2)
  @xresult{}
       3   1   2
       6   4   5
       9   7   8
@end example
@seealso{permute, ipermute, shiftdim}
@end deftypefn
