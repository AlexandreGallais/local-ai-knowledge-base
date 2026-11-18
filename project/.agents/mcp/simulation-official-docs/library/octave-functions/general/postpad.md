# postpad

```octave
function B = postpad (A, l, c, dim)
```

@deftypefn  {} {@var{B} =} postpad (@var{A}, @var{l})
@deftypefnx {} {@var{B} =} postpad (@var{A}, @var{l}, @var{c})
@deftypefnx {} {@var{B} =} postpad (@var{A}, @var{l}, @var{c}, @var{dim})
Append the scalar value @var{c} to the vector @var{A} until it is of length
@var{l}.  If @var{c} is not given, a value of 0 is used.

If @code{length (@var{A}) > @var{l}}, elements from the end of @var{A} are
removed until a vector of length @var{l} is obtained.

If @var{A} is a matrix, elements are appended or removed from each row.

If the optional argument @var{dim} is given, operate along this dimension.

If @var{dim} is larger than the dimensions of @var{A}, the result will have
@var{dim} dimensions.
@seealso{prepad, cat, resize}
@end deftypefn
