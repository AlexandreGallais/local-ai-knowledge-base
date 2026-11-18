# bicg

```octave
function [x_min, flag, relres, iter_min, resvec] = ...
```

@deftypefn  {} {@var{x} =} bicg (@var{A}, @var{b})
@deftypefnx {} {@var{x} =} bicg (@var{A}, @var{b}, @var{tol})
@deftypefnx {} {@var{x} =} bicg (@var{A}, @var{b}, @var{tol}, @var{maxit})
@deftypefnx {} {@var{x} =} bicg (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{M})
@deftypefnx {} {@var{x} =} bicg (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{M1}, @var{M2})
@deftypefnx {} {@var{x} =} bicg (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{M}, [], @var{x0})
@deftypefnx {} {@var{x} =} bicg (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{M1}, @var{M2}, @var{x0})
@deftypefnx {} {@var{x} =} bicg (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{M}, [], @var{x0}, @dots{})
@deftypefnx {} {@var{x} =} bicg (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{M1}, @var{M2}, @var{x0}, @dots{})
@deftypefnx {} {[@var{x}, @var{flag}, @var{relres}, @var{iter}, @var{resvec}] =} bicg (@var{A}, @var{b}, @dots{})
Solve the linear system of equations
@w{@code{@var{A} * @var{x} = @var{b}}}@ by means of the Bi-Conjugate
Gradient iterative method.

The input arguments are:

@itemize

@item @var{A} is the matrix of the linear system and it must be square.
@var{A} can be passed as a matrix, function handle, or inline function
@code{Afcn} such that @w{@code{Afcn (x, "notransp") = A * x}}@ and
@w{@code{Afcn (x, "transp") = A' * x}}.  Additional parameters to
@code{Afcn} may be passed after @var{x0}.

@item @var{b} is the right-hand side vector.  It must be a column vector
with the same number of rows as @var{A}.

@item
@var{tol} is the required relative tolerance for the residual error,
@w{@code{@var{b} - @var{A} * @var{x}}}.  The iteration stops if
@w{@code{norm (@var{b} - @var{A} * @var{x})} @leq{}
@w{@code{@var{tol} * norm (@var{b})}}}.
If @var{tol} is omitted or empty, then a tolerance of 1e-6 is used.

@item
@var{maxit} is the maximum allowed number of iterations; if @var{maxit}
is omitted or empty then a value of 20 is used.

@item
@var{M1}, @var{M2} are the preconditioners.  The preconditioner @var{M} is
given as @code{@var{M} = @var{M1} * @var{M2}}.  Both @var{M1} and @var{M2}
can be passed as a matrix or as a function handle or inline function
@code{g} such that
@w{@code{g (@var{x}, "notransp") = @var{M1} \ @var{x}}}@ or
@w{@code{g (@var{x}, "notransp") = @var{M2} \ @var{x}}}@ and
@w{@code{g (@var{x}, "transp") = @var{M1}' \ @var{x}}}@ or
@w{@code{g (@var{x}, "transp") = @var{M2}' \ @var{x}}}.
If @var{M1} is omitted or empty, then preconditioning is not applied.
The preconditioned system is theoretically equivalent to applying the
@code{bicg} method to the linear system
@code{inv (@var{M1}) * A * inv (@var{M2}) * @var{y} = inv
(@var{M1}) * @var{b}} and
@code{inv (@var{M2'}) * A' * inv (@var{M1'}) * @var{z} =
inv (@var{M2'}) * @var{b}} and then setting
@code{@var{x} = inv (@var{M2}) * @var{y}}.

@item
@var{x0} is the initial guess.  If @var{x0} is omitted or empty then the
function sets @var{x0} to a zero vector by default.
@end itemize

Any arguments which follow @var{x0} are treated as parameters, and passed in
an appropriate manner to any of the functions (@var{Afcn} or @var{Mfcn}) or
that have been given to @code{bicg}.

The output parameters are:

@itemize

@item
@var{x} is the computed approximation to the solution of
@w{@code{@var{A} * @var{x} = @var{b}}}.  If the algorithm did not converge,
then @var{x} is the iteration which has the minimum residual.

@item
@var{flag} indicates the exit status:

@itemize
@item 0: The algorithm converged to within the prescribed tolerance.

@item 1: The algorithm did not converge and it reached the maximum number of
iterations.

@item 2: The preconditioner matrix is singular.

@item 3: The algorithm stagnated, i.e., the absolute value of the
difference between the current iteration @var{x} and the previous is less
than @code{eps * norm (@var{x},2)}.

@item 4: The algorithm could not continue because intermediate values
became too small or too large for reliable computation.
@end itemize

@item
@var{relres} is the ratio of the final residual to its initial value,
measured in the Euclidean norm.

@item
@var{iter} is the iteration which @var{x} is computed.

@item
@var{resvec} is a vector containing the residual at each iteration.
The total number of iterations performed is given by
@code{length (@var{resvec}) - 1}.
@end itemize

Consider a trivial problem with a tridiagonal matrix

@smallexample
@group
n = 20;
A = toeplitz (sparse ([1, 1], [1, 2], [2, 1] * n ^ 2, 1, n)) + ...
    toeplitz (sparse (1, 2, -1, 1, n) * n / 2, ...
              sparse (1, 2, 1, 1, n) * n / 2);
b = A * ones (n, 1);
restart = 5;
[M1, M2] = ilu (A);  # in this tridiag case, it corresponds to lu (A)
M = M1 * M2;
Afcn = @@(x, string) strcmp (string, "notransp") * (A * x) + ...
                     strcmp (string, "transp") * (A' * x);
Mfcn = @@(x, string) strcmp (string, "notransp") * (M \ x) + ...
                     strcmp (string, "transp") * (M' \ x);
M1fcn = @@(x, string) strcmp (string, "notransp") * (M1 \ x) + ...
                     strcmp (string, "transp") * (M1' \ x);
M2fcn = @@(x, string) strcmp (string, "notransp") * (M2 \ x) + ...
                     strcmp (string, "transp") * (M2' \ x);
@end group
@end smallexample

@sc{Example 1:} simplest usage of @code{bicg}

@example
x = bicg (A, b)
@end example

@sc{Example 2:} @code{bicg} with a function that computes
@code{@var{A}*@var{x}} and @code{@var{A'}*@var{x}}

@example
x = bicg (Afcn, b, [], n)
@end example

@sc{Example 3:} @code{bicg} with a preconditioner matrix @var{M}

@example
x = bicg (A, b, 1e-6, n, M)
@end example

@sc{Example 4:} @code{bicg} with a function as preconditioner

@example
x = bicg (Afcn, b, 1e-6, n, Mfcn)
@end example

@sc{Example 5:} @code{bicg} with preconditioner matrices @var{M1}
and @var{M2}

@example
x = bicg (A, b, 1e-6, n, M1, M2)
@end example

@sc{Example 6:} @code{bicg} with functions as preconditioners

@example
x = bicg (Afcn, b, 1e-6, n, M1fcn, M2fcn)
@end example

@sc{Example 7:} @code{bicg} with as input a function requiring an argument

@example
@group
function y = Ap (A, x, string, z)
  ## compute A^z * x or (A^z)' * x
  y = x;
  if (strcmp (string, "notransp"))
    for i = 1:z
      y = A * y;
    endfor
  elseif (strcmp (string, "transp"))
    for i = 1:z
      y = A' * y;
    endfor
  endif
endfunction

Apfcn = @@(x, string, p) Ap (A, x, string, p);
x = bicg (Apfcn, b, [], [], [], [], [], 2);
@end group
@end example

Reference:

@nospell{Y. Saad}, @cite{Iterative Methods for Sparse Linear Systems},
2nd edition, SIAM, 2003.

@seealso{bicgstab, cgs, gmres, pcg, qmr, tfqmr}
@end deftypefn
