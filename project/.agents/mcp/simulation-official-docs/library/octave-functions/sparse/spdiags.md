# spdiags

```octave
function [B, d] = spdiags (v, d, m, n)
```

@deftypefn  {} {@var{B} =} spdiags (@var{A})
@deftypefnx {} {[@var{B}, @var{d}] =} spdiags (@var{A})
@deftypefnx {} {@var{B} =} spdiags (@var{A}, @var{d})
@deftypefnx {} {@var{A} =} spdiags (@var{v}, @var{d}, @var{A})
@deftypefnx {} {@var{A} =} spdiags (@var{v}, @var{d}, @var{m}, @var{n})
A generalization of the function @code{diag}.

Called with a single input argument, the nonzero diagonals @var{d} of
@var{A} are extracted.

With two arguments the diagonals to extract are given by the vector @var{d}.

The other two forms of @code{spdiags} modify the input matrix by replacing
the diagonals.  They use the columns of @var{v} to replace the diagonals
represented by the vector @var{d}.  If the sparse matrix @var{A} is
defined then the diagonals of this matrix are replaced.  Otherwise a
matrix of @var{m} by @var{n} is created with the diagonals given by the
columns of @var{v}.

Negative values of @var{d} represent diagonals below the main diagonal, and
positive values of @var{d} diagonals above the main diagonal.

For example:

@example
@group
spdiags (reshape (1:12, 4, 3), [-1 0 1], 5, 4)
   @xresult{} 5 10  0  0
      1  6 11  0
      0  2  7 12
      0  0  3  8
      0  0  0  4
@end group
@end example

@seealso{diag}
@end deftypefn
