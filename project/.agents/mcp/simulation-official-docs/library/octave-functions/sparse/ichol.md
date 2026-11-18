# ichol

```octave
function L = ichol (A, opts = struct ())
```

@deftypefn  {} {@var{L} =} ichol (@var{A})
@deftypefnx {} {@var{L} =} ichol (@var{A}, @var{opts})

Compute the incomplete Cholesky factorization of the sparse square matrix
@var{A}.

By default, @code{ichol} uses only the lower triangle of @var{A} and
produces a lower triangular factor @var{L} such that @tcode{L*L'}
approximates @var{A}.

The factor given by this routine may be useful as a preconditioner for a
system of linear equations being solved by iterative methods such as
PCG (Preconditioned Conjugate Gradient).

The factorization may be modified by passing options in a structure
@var{opts}.  The option name is a field of the structure and the setting
is the value of field.  Names and specifiers are case sensitive.

@table @asis
@item type
Type of factorization.

@table @asis
@item @qcode{"nofill"} (default)
Incomplete Cholesky factorization with no fill-in (@nospell{IC(0)}).

@item @qcode{"ict"}
Incomplete Cholesky factorization with threshold dropping (@nospell{ICT}).
@end table

@item diagcomp
A non-negative scalar @var{alpha} for incomplete Cholesky factorization of
@code{@var{A} + @var{alpha} * diag (diag (@var{A}))} instead of @var{A}.
This can be useful when @var{A} is not positive definite.  The default value
is 0.

@item droptol
A non-negative scalar specifying the drop tolerance for factorization if
performing @nospell{ICT}@.  The default value is 0 which produces the
complete Cholesky factorization.

Non-diagonal entries of @var{L} are set to 0 unless

@code{abs (@var{L}(i,j)) >= droptol * norm (@var{A}(j:end, j), 1)}.

@item michol
Modified incomplete Cholesky factorization:

@table @asis
@item @qcode{"off"} (default)
Row and column sums are not necessarily preserved.

@item @qcode{"on"}
The diagonal of @var{L} is modified so that row (and column) sums are
preserved even when elements have been dropped during the factorization.
The relationship preserved is: @code{@var{A} * e = @var{L} * @var{L}' * e},
where e is a vector of ones.
@end table

@item shape

@table @asis
@item @qcode{"lower"} (default)
Use only the lower triangle of @var{A} and return a lower triangular factor
@var{L} such that @tcode{L*L'} approximates @var{A}.

@item @qcode{"upper"}
Use only the upper triangle of @var{A} and return an upper triangular factor
@var{U} such that @code{U'*U} approximates @var{A}.
@end table
@end table

EXAMPLES

The following problem demonstrates how to factorize a sample symmetric
positive definite matrix with the full Cholesky decomposition and with the
incomplete one.

@example
@group
A = [ 0.37, -0.05,  -0.05,  -0.07;
     -0.05,  0.116,  0.0,   -0.05;
     -0.05,  0.0,    0.116, -0.05;
     -0.07, -0.05,  -0.05,   0.202];
A = sparse (A);
nnz (tril (A))
ans =  9
L = chol (A, "lower");
nnz (L)
ans =  10
norm (A - L * L', "fro") / norm (A, "fro")
ans =  1.1993e-16
opts.type = "nofill";
L = ichol (A, opts);
nnz (L)
ans =  9
norm (A - L * L', "fro") / norm (A, "fro")
ans =  0.019736
@end group
@end example

Another example for decomposition is a finite difference matrix used to
solve a boundary value problem on the unit square.

@example
@group
nx = 400; ny = 200;
hx = 1 / (nx + 1); hy = 1 / (ny + 1);
Dxx = spdiags ([ones(nx, 1), -2*ones(nx, 1), ones(nx, 1)],
               [-1 0 1 ], nx, nx) / (hx ^ 2);
Dyy = spdiags ([ones(ny, 1), -2*ones(ny, 1), ones(ny, 1)],
               [-1 0 1 ], ny, ny) / (hy ^ 2);
A = -kron (Dxx, speye (ny)) - kron (speye (nx), Dyy);
nnz (tril (A))
ans =  239400
opts.type = "nofill";
L = ichol (A, opts);
nnz (tril (A))
ans =  239400
norm (A - L * L', "fro") / norm (A, "fro")
ans =  0.062327
@end group
@end example

References for implemented algorithms:

[1] @nospell{Y. Saad}, "Preconditioning Techniques",
@cite{Iterative Methods for Sparse Linear Systems}, @nospell{PWS} Publishing
Company, 1996.

[2] @nospell{M. Jones, P. Plassmann},
@cite{An Improved Incomplete Cholesky Factorization}, 1992.
@seealso{chol, ilu, pcg}
@end deftypefn
