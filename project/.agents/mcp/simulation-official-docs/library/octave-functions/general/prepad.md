# prepad

```octave
function B = prepad (A, l, c, dim)
```

@deftypefn  {} {@var{B} =} prepad (@var{A}, @var{l})
@deftypefnx {} {@var{B} =} prepad (@var{A}, @var{l}, @var{c})
@deftypefnx {} {@var{B} =} prepad (@var{A}, @var{l}, @var{c}, @var{dim})
Prepend the scalar value @var{c} to the vector @var{A} until it is of length
@var{l}.  If @var{c} is not given, a value of 0 is used.

If @code{length (@var{A}) > @var{l}}, elements from the beginning of @var{A}
are removed until a vector of length @var{l} is obtained.

If @var{A} is a matrix, elements are prepended or removed from each row.

If the optional argument @var{dim} is given, operate along this dimension.

If @var{dim} is larger than the dimensions of @var{A}, the result will have
@var{dim} dimensions.
@seealso{postpad, cat, resize}
@end deftypefn
