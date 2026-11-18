# repmat

```octave
function B = repmat (A, m, varargin)
```

@deftypefn  {} {@var{B} =} repmat (@var{A}, @var{m})
@deftypefnx {} {@var{B} =} repmat (@var{A}, @var{m}, @var{n})
@deftypefnx {} {@var{B} =} repmat (@var{A}, @var{m}, @var{n}, @var{p} @dots{})
@deftypefnx {} {@var{B} =} repmat (@var{A}, [@var{m} @var{n}])
@deftypefnx {} {@var{B} =} repmat (@var{A}, [@var{m} @var{n} @var{p} @dots{}])
Repeat matrix or N-D array.

Form a block matrix of size @var{m} by @var{n}, with a copy of matrix
@var{A} as each element.

If @var{n} is not specified, form an @var{m} by @var{m} block matrix.  For
copying along more than two dimensions, specify the number of times to copy
across each dimension @var{m}, @var{n}, @var{p}, @dots{}, in a vector in the
second argument.

@seealso{bsxfun, kron, repelems}
@end deftypefn
