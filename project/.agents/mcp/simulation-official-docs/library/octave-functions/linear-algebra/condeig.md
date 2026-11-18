# condeig

```octave
function [v, lambda, c] = condeig (a)
```

@deftypefn  {} {@var{c} =} condeig (@var{a})
@deftypefnx {} {[@var{v}, @var{lambda}, @var{c}] =} condeig (@var{a})
Compute condition numbers of a matrix with respect to eigenvalues.

The condition numbers are the reciprocals of the cosines of the angles
between the left and right eigenvectors; Large values indicate that the
matrix has multiple distinct eigenvalues.

The input @var{a} must be a square numeric matrix.

The outputs are:

@itemize @bullet
@item
@var{c} is a vector of condition numbers for the eigenvalues of
@var{a}.

@item
@var{v} is the matrix of right eigenvectors of @var{a}.  The result is
equivalent to calling @code{[@var{v}, @var{lambda}] = eig (@var{a})}.

@item
@var{lambda} is the diagonal matrix of eigenvalues of @var{a}.  The
result is equivalent to calling
@code{[@var{v}, @var{lambda}] = eig (@var{a})}.
@end itemize

Example

@example
@group
a = [1, 2; 3, 4];
c = condeig (a)
  @xresult{} c =
       1.0150
       1.0150
@end group
@end example
@seealso{eig, cond, balance}
@end deftypefn
