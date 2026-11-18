# rank

```octave
function k = rank (A, tol)
```

@deftypefn  {} {@var{k} =} rank (@var{A})
@deftypefnx {} {@var{k} =} rank (@var{A}, @var{tol})
Compute the rank of matrix @var{A}, using the singular value decomposition.

The rank is taken to be the number of singular values of @var{A} that are
greater than the specified tolerance @var{tol}.  If the second argument is
omitted, it is taken to be

@example
tol = max (size (@var{A})) * sigma(1) * eps;
@end example

@noindent
where @code{eps} is machine precision and @code{sigma(1)} is the largest
singular value of @var{A}.

The rank of a matrix is the number of linearly independent rows or columns
and equals the dimension of the row and column space.  The function
@code{orth} may be used to compute an orthonormal basis of the column space.

For testing if a system @code{@var{A}*@var{x} = @var{b}} of linear equations
is solvable, one can use

@example
rank (@var{A}) == rank ([@var{A} @var{b}])
@end example

In this case, @code{@var{x} = @var{A} \ @var{b}} finds a particular solution
@var{x}.  The general solution is @var{x} plus the null space of matrix
@var{A}.  The function @code{null} may be used to compute a basis of the
null space.

Example:

@example
@group
A = [1 2 3
     4 5 6
     7 8 9];
rank (A)
  @xresult{} 2
@end group
@end example

@noindent
In this example, the number of linearly independent rows is only 2 because
the final row is a linear combination of the first two rows:

@example
A(3,:) == -A(1,:) + 2 * A(2,:)
@end example

@seealso{null, orth, sprank, svd, eps}
@end deftypefn
