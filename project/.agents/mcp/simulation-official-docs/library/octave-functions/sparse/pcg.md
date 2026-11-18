# pcg

```octave
function [x_min, flag, relres, iter_min, resvec, eigest] =...
```

@deftypefn  {} {@var{x} =} pcg (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{m1}, @var{m2}, @var{x0}, @dots{})
@deftypefnx {} {@var{x} =} pcg (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{M}, [], @var{x0}, @dots{})
@deftypefnx {} {[@var{x}, @var{flag}, @var{relres}, @var{iter}, @var{resvec}, @var{eigest}] =} pcg (@var{A}, @var{b}, @dots{})

Solve the linear system of equations
@w{@code{@var{A} * @var{x} = @var{b}}}@ by means of the Preconditioned
Conjugate Gradient iterative method.

The input arguments are:

@itemize
@item @var{A} is the matrix of the linear system and it must be square.
@var{A} can be passed as a matrix, function handle, or inline function
@code{Afcn} such that @code{Afcn(x) = A * x}.  Additional parameters to
@code{Afcn} may be passed after @var{x0}.

@var{A} has to be Hermitian and Positive Definite (@nospell{HPD})@.  If
@code{pcg} detects @var{A} not to be positive definite, a warning is printed
and the @var{flag} output is set.

@item
@var{b} is the right-hand side vector.

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
@var{m} is a @nospell{HPD} preconditioning matrix.  For any decomposition
@code{@var{m} = @var{p1} * @var{p2}} such that
@w{@code{inv (@var{p1}) * @var{A} * inv (@var{p2})}}@ is @nospell{HPD}, the
conjugate gradient method is formally applied to the linear system
@w{@code{inv (@var{p1}) * @var{A} * inv (@var{p2}) * @var{y} = inv
(@var{p1}) * @var{b}}},
with @code{@var{x} = inv (@var{p2}) * @var{y}} (split preconditioning).
In practice, at each iteration of the conjugate gradient method a
linear system with matrix @var{m} is solved with @code{mldivide}.
If a particular factorization
@code{@var{m} = @var{m1} * @var{m2}} is available (for instance, an
incomplete Cholesky factorization of @var{a}), the two matrices
@var{m1} and @var{m2} can be passed and the relative linear systems
are solved with the @code{mldivide} operator.
Note that a proper choice of the preconditioner may dramatically improve
the overall performance of the method.  Instead of matrices @var{m1} and
@var{m2}, the user may pass two functions which return the results of
applying the inverse of @var{m1} and @var{m2} to a vector.
If @var{m1} is omitted or empty @code{[]}, then no preconditioning
is applied.  If no factorization of @var{m} is available, @var{m2}
can be omitted or left [], and the input variable @var{m1} can be
used to pass the preconditioner @var{m}.

@item
@var{x0} is the initial guess.  If @var{x0} is omitted or empty then the
function sets @var{x0} to a zero vector by default.
@end itemize

The arguments which follow @var{x0} are treated as parameters, and passed in
an appropriate manner to any of the functions (@var{A} or @var{m1} or
@var{m2}) that have been given to @code{pcg}.
See the examples below for further details.

The output arguments are:

@itemize
@item
@var{x} is the computed approximation to the solution of
@w{@code{@var{A} * @var{x} = @var{b}}}.  If the algorithm did not converge,
then @var{x} is the iteration which has the minimum residual.

@item
@var{flag} reports on the convergence:

@itemize
@item 0: The algorithm converged to within the prescribed tolerance.

@item 1: The algorithm did not converge and it reached the maximum
number of iterations.

@item 2: The preconditioner matrix is singular.

@item 3: The algorithm stagnated, i.e., the absolute value of the
difference between the current iteration @var{x} and the previous is less
than @code{@var{eps} * norm (@var{x},2)}.

@item 4: The algorithm detects that the input (preconditioned) matrix is not
@nospell{HPD}.
@end itemize

@item
@var{relres} is the ratio of the final residual to its initial value,
measured in the Euclidean norm.

@item
@var{iter} indicates the iteration of @var{x} which it was
computed.  Since the output @var{x} corresponds to the minimal
residual solution, the total number of iterations that
the method performed is given by @code{length(resvec) - 1}.

@item
@var{resvec} describes the convergence history of the method.
@code{@var{resvec} (@var{i}, 1)} is the Euclidean norm of the residual, and
@code{@var{resvec} (@var{i}, 2)} is the preconditioned residual
norm, after the
(@var{i}-1)-th iteration, @code{@var{i} = 1, 2, @dots{}, @var{iter}+1}.
The preconditioned residual norm is defined as
@code{@var{r}' * (@var{m} \ @var{r})} where
@code{@var{r} = @var{b} - @var{A} * @var{x}}, see also the
description of @var{m}.  If @var{eigest} is not required, only
@code{@var{resvec} (:, 1)} is returned.

@item
@var{eigest} returns the estimate for the smallest @code{@var{eigest}(1)}
and largest @code{@var{eigest}(2)} eigenvalues of the preconditioned matrix
@w{@code{@var{P} = @var{m} \ @var{A}}}.  In particular, if no
preconditioning is used, the estimates for the extreme eigenvalues of
@var{A} are returned.  @code{@var{eigest}(1)} is an overestimate and
@code{@var{eigest}(2)} is an underestimate, so that
@code{@var{eigest}(2) / @var{eigest}(1)} is a lower bound for
@code{cond (@var{P}, 2)}, which nevertheless in the limit should
theoretically be equal to the actual value of the condition number.
@end itemize


Let us consider a trivial problem with a tridiagonal matrix

@smallexample
@group
n = 10;
A = toeplitz (sparse ([1, 1], [1, 2], [2, 1], 1, n));
b = A * ones (n, 1);
M1 = ichol (A); # in this tridiagonal case it corresponds to chol (A)'
M2 = M1';
M = M1 * M2;
Afcn = @@(x) A * x;
Mfcn = @@(x) M \ x;
M1fcn = @@(x) M1 \ x;
M2fcn = @@(x) M2 \ x;
@end group
@end smallexample

@sc{Example 1:} Simplest use of @code{pcg}

@example
x = pcg (A, b)
@end example

@sc{Example 2:} @code{pcg} with a function which computes
@code{@var{A} * @var{x}}

@example
x = pcg (Afcn, b)
@end example

@sc{Example 3:} @code{pcg} with a preconditioner matrix @var{M}

@example
x = pcg (A, b, 1e-06, 100, M)
@end example

@sc{Example 4:} @code{pcg} with a function as preconditioner

@example
x = pcg (Afcn, b, 1e-6, 100, Mfcn)
@end example

@sc{Example 5:} @code{pcg} with preconditioner matrices @var{M1}
and @var{M2}

@example
x = pcg (A, b, 1e-6, 100, M1, M2)
@end example

@sc{Example 6:} @code{pcg} with functions as preconditioners

@example
x = pcg (Afcn, b, 1e-6, 100, M1fcn, M2fcn)
@end example

@sc{Example 7:} @code{pcg} with as input a function requiring an argument

@example
@group
  function y = Ap (A, x, p) # compute A^p * x
     y = x;
     for i = 1:p
       y = A * y;
     endfor
  endfunction
Apfcn = @@(x, p) Ap (A, x, p);
x = pcg (Apfcn, b, [], [], [], [], [], 2);
@end group
@end example

@sc{Example 8:} explicit example to show that @code{pcg} uses a
split preconditioner

@example
@group
M1 = ichol (A + 0.1 * eye (n)); # factorization of A perturbed
M2 = M1';
M = M1 * M2;

## reference solution computed by pcg after two iterations
[x_ref, fl] = pcg (A, b, [], 2, M)

## split preconditioning
[y, fl] = pcg ((M1 \ A) / M2, M1 \ b, [], 2)
x = M2 \ y # compare x and x_ref

@end group
@end example

References:

@enumerate
@item
@nospell{C.T. Kelley},
@cite{Iterative Methods for Linear and Nonlinear Equations},
SIAM, 1995.  (the base PCG algorithm)

@item
@nospell{Y. Saad}, @cite{Iterative Methods for Sparse Linear Systems},
@nospell{PWS}, 1996.  (condition number estimate from PCG)
Revised version of this book is available online at
@url{https://www-users.cs.umn.edu/~saad/books.html}
@end enumerate

@seealso{sparse, pcr, gmres, bicg, bicgstab, cgs}
@end deftypefn
