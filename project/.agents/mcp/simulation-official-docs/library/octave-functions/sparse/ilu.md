# ilu

```octave
function [L, U, P] = ilu (A, opts = struct ())
```

@deftypefn  {} {@var{LUA} =} ilu (@var{A})
@deftypefnx {} {@var{LUA} =} ilu (@var{A}, @var{opts})
@deftypefnx {} {[@var{L}, @var{U}] =} ilu (@dots{})
@deftypefnx {} {[@var{L}, @var{U}, @var{P}] =} ilu (@dots{})

Compute the incomplete LU factorization of the sparse square matrix @var{A}.

@code{ilu} returns a unit lower triangular matrix @var{L}, an upper
triangular matrix @var{U}, and optionally a permutation matrix @var{P}, such
that @code{@var{L}*@var{U}} approximates @code{@var{P}*@var{A}}.

The factors given by this routine may be useful as preconditioners for a
system of linear equations being solved by iterative methods such as BICG
(BiConjugate Gradients) or GMRES (Generalized Minimum Residual Method).

The factorization may be modified by passing options in a structure
@var{opts}.  The option name is a field of the structure and the setting
is the value of field.  Names and specifiers are case sensitive.

@table @code
@item type
Type of factorization.

@table @asis
@item @qcode{"nofill"} (default)
ILU factorization with no fill-in (ILU(0)).

Additional supported options: @code{milu}.

@item @qcode{"crout"}
Crout version of ILU factorization (@nospell{ILUC}).

Additional supported options: @code{milu}, @code{droptol}.

@item @qcode{"ilutp"}
ILU factorization with threshold and pivoting.

Additional supported options: @code{milu}, @code{droptol}, @code{udiag},
@code{thresh}.
@end table

@item droptol
A non-negative scalar specifying the drop tolerance for factorization.  The
default value is 0 which produces the complete LU factorization.

Non-diagonal entries of @var{U} are set to 0 unless

@code{abs (@var{U}(i,j)) >= droptol * norm (@var{A}(:,j))}.

Non-diagonal entries of @var{L} are set to 0 unless

@code{abs (@var{L}(i,j)) >= droptol * norm (@var{A}(:,j))/@var{U}(j,j)}.

@item milu
Modified incomplete LU factorization:

@table @asis
@item @qcode{"row"}
Row-sum modified incomplete LU factorization.
The factorization preserves row sums:
@code{@var{A} * e = @var{L} * @var{U} * e}, where e is a vector of ones.

@item @qcode{"col"}
Column-sum modified incomplete LU factorization.
The factorization preserves column sums:
@code{e' * @var{A} = e' * @var{L} * @var{U}}.

@item @qcode{"off"} (default)
Row and column sums are not necessarily preserved.
@end table

@item udiag
If true, any zeros on the diagonal of the upper triangular factor are
replaced by the local drop tolerance
@code{droptol * norm (@var{A}(:,j))/@var{U}(j,j)}.  The default is false.

@item thresh
Pivot threshold for factorization.  It can range between 0 (diagonal
pivoting) and 1 (default), where the maximum magnitude entry in the column
is chosen to be the pivot.
@end table

If @code{ilu} is called with just one output, the returned matrix is
@code{@var{L} + @var{U} - speye (size (@var{A}))}, where @var{L} is unit
lower triangular and @var{U} is upper triangular.

With two outputs, @code{ilu} returns a unit lower triangular matrix @var{L}
and an upper triangular matrix @var{U}.  For @var{opts}.type ==
@qcode{"ilutp"}, one of the factors is permuted based on the value of
@var{opts}.milu.  When @var{opts}.milu == @qcode{"row"}, @var{U} is a
column permuted upper triangular factor.  Otherwise, @var{L} is a
row-permuted unit lower triangular factor.

If there are three named outputs and @var{opts}.milu != @qcode{"row"},
@var{P} is returned such that @var{L} and @var{U} are incomplete factors
of @code{@var{P}*@var{A}}.  When @var{opts}.milu == @qcode{"row"}, @var{P}
is returned such that @var{L} and @var{U} are incomplete factors of
@code{@var{A}*@var{P}}.

EXAMPLES

@example
@group
A = gallery ("neumann", 1600) + speye (1600);
opts.type = "nofill";
nnz (A)
ans = 7840

nnz (lu (A))
ans = 126478

nnz (ilu (A, opts))
ans = 7840
@end group
@end example

This shows that @var{A} has 7,840 nonzeros, the complete LU factorization
has 126,478 nonzeros, and the incomplete LU factorization, with 0 level of
fill-in, has 7,840 nonzeros, the same amount as @var{A}.  Taken from:
@url{https://www.mathworks.com/help/matlab/ref/ilu.html}

@example
@group
A = gallery ("wathen", 10, 10);
b = sum (A, 2);
tol = 1e-8;
maxit = 50;
opts.type = "crout";
opts.droptol = 1e-4;
[L, U] = ilu (A, opts);
x = bicg (A, b, tol, maxit, L, U);
norm (A * x - b, inf)
@end group
@end example

This example uses ILU as preconditioner for a random FEM-Matrix, which has a
large condition number.  Without @var{L} and @var{U} BICG would not
converge.

@seealso{lu, ichol, bicg, gmres}
@end deftypefn
