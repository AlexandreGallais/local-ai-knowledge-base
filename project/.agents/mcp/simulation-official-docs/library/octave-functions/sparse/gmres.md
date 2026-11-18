# gmres

```octave
function [x_min, flag, relres, it, resvec] = ...
```

@deftypefn  {} {@var{x} =} gmres (@var{A}, @var{b}, @var{restart}, @var{tol}, @var{maxit}, @var{M1}, @var{M2}, @var{x0}, @dots{})
@deftypefnx {} {@var{x} =} gmres (@var{A}, @var{b}, @var{restart}, @var{tol}, @var{maxit}, @var{M}, [], @var{x0}, @dots{})
@deftypefnx {} {[@var{x}, @var{flag}, @var{relres}, @var{iter}, @var{resvec}] =} gmres (@var{A}, @var{b}, @dots{})
Solve @code{A x = b} using the Preconditioned GMRES iterative method with
restart, a.k.a.@: PGMRES(restart).

The input arguments are:

@itemize @minus

@item @var{A} is the matrix of the linear system and it must be square.
@var{A} can be passed as a matrix, function handle, or inline
function @code{Afcn} such that @code{Afcn(x) = A * x}.  Additional
parameters to @code{Afcn} are passed after @var{x0}.

@item @var{b} is the right hand side vector.  It must be a column vector
with the same numbers of rows as @var{A}.

@item @var{restart} is the number of iterations before that the
method restarts.  If it is [] or N = numel (b), then the restart
is not applied.

@item @var{tol} is the required relative tolerance for the
preconditioned residual error,
@code{inv (@var{M}) * (@var{b} - @var{a} * @var{x})}.  The iteration
stops if @code{norm (inv (@var{M}) * (@var{b} - @var{a} * @var{x}))
@leq{} @var{tol} * norm (inv (@var{M}) * @var{B})}.  If @var{tol} is
omitted or empty, then a tolerance of 1e-6 is used.

@item @var{maxit} is the maximum number of outer iterations, if not given or
set to [], then the default value @code{min (10, @var{N} / @var{restart})}
is used.
Note that, if @var{restart} is empty, then @var{maxit} is the maximum number
of iterations.  If @var{restart} and @var{maxit} are not empty, then
the maximum number of iterations is @code{@var{restart} * @var{maxit}}.
If both @var{restart} and @var{maxit} are empty, then the maximum
number of iterations is set to @code{min (10, @var{N})}.

@item @var{M1}, @var{M2} are the preconditioners.  The preconditioner
@var{M} is given as @code{M = M1 * M2}.  Both @var{M1} and @var{M2} can
be passed as a matrix, function handle, or inline function @code{g} such
that @code{g(x) = M1 \ x} or @code{g(x) = M2 \ x}.  If @var{M1} is [] or not
given, then the preconditioner is not applied.
The technique used is the left-preconditioning, i.e., it is solved
@code{inv(@var{M}) * @var{A} * @var{x} = inv(@var{M}) * @var{b}} instead of
@code{@var{A} * @var{x} = @var{b}}.

@item @var{x0} is the initial guess,
if not given or set to [], then the default value
@code{zeros (size (@var{b}))} is used.

@end itemize

The arguments which follow @var{x0} are treated as parameters, and passed in
a proper way to any of the functions (@var{A} or @var{M} or
@var{M1} or @var{M2}) which are passed to @code{gmres}.

The outputs are:

@itemize @minus

@item @var{x} the computed approximation.  If the method does not
converge, then it is the iterated with minimum residual.

@item @var{flag} indicates the exit status:

@table @asis
@item 0
iteration converged to within the specified tolerance

@item 1
maximum number of iterations exceeded

@item 2
the preconditioner matrix is singular

@item 3
algorithm reached stagnation (the relative difference between two
consecutive iterations is less than eps)
@end table

@item @var{relres} is the value of the relative preconditioned
residual of the approximation @var{x}.

@item @var{iter} is a vector containing the number of outer iterations and
inner iterations performed to compute @var{x}.  That is:

@itemize
@item @var{iter(1)}: number of outer iterations, i.e., how many
times the method restarted.  (if @var{restart} is empty or @var{N},
then it is 1, if not 1 @leq{} @var{iter(1)} @leq{} @var{maxit}).

@item @var{iter(2)}: the number of iterations performed before the
restart, i.e., the method restarts when
@code{@var{iter(2)} = @var{restart}}.  If @var{restart} is empty or
@var{N}, then 1 @leq{} @var{iter(2)} @leq{} @var{maxit}.
@end itemize

To be more clear, the approximation @var{x} is computed at the iteration
@code{(@var{iter(1)} - 1) * @var{restart} + @var{iter(2)}}.
Since the output @var{x} corresponds to the minimal preconditioned
residual solution, the total number of iterations that
the method performed is given by @code{length (resvec) - 1}.

@item @var{resvec} is a vector containing the preconditioned
relative residual at each iteration, including the 0-th iteration
@code{norm (@var{A} * @var{x0} - @var{b})}.
@end itemize

Let us consider a trivial problem with a tridiagonal matrix

@example
@group
n = 20;
A = toeplitz (sparse ([1, 1], [1, 2], [2, 1] * n ^ 2, 1, n))  + ...
    toeplitz (sparse (1, 2, -1, 1, n) * n / 2, ...
    sparse (1, 2, 1, 1, n) * n / 2);
b = A * ones (n, 1);
restart = 5;
[M1, M2] = ilu (A); # in this tridiag case, it corresponds to lu (A)
M = M1 * M2;
Afcn = @@(x) A * x;
Mfcn = @@(x) M \ x;
M1fcn = @@(x) M1 \ x;
M2fcn = @@(x) M2 \ x;
@end group
@end example

@sc{Example 1:} simplest usage of @code{gmres}

@example
x = gmres (A, b, [], [], n)
@end example

@sc{Example 2:} @code{gmres} with a function which computes
@code{@var{A} * @var{x}}

@example
x = gmres (Afcn, b, [], [], n)
@end example

@sc{Example 3:} usage of @code{gmres} with the restart

@example
x = gmres (A, b, restart);
@end example

@sc{Example 4:} @code{gmres} with a preconditioner matrix @var{M}
with and without restart

@example
@group
x = gmres (A, b, [], 1e-06, n, M)
x = gmres (A, b, restart, 1e-06, n, M)
@end group
@end example

@sc{Example 5:} @code{gmres} with a function as preconditioner

@example
x = gmres (Afcn, b, [], 1e-6, n, Mfcn)
@end example

@sc{Example 6:} @code{gmres} with preconditioner matrices @var{M1}
and @var{M2}

@example
x = gmres (A, b, [], 1e-6, n, M1, M2)
@end example

@sc{Example 7:} @code{gmres} with functions as preconditioners

@example
x = gmres (Afcn, b, 1e-6, n, M1fcn, M2fcn)
@end example

@sc{Example 8:} @code{gmres} with as input a function requiring an argument

@example
@group
  function y = Ap (A, x, p) # compute A^p * x
     y = x;
     for i = 1:p
       y = A * y;
     endfor
  endfunction
Apfcn = @@(x, p) Ap (A, x, p);
x = gmres (Apfcn, b, [], [], [], [], [], [], 2);
@end group
@end example

@sc{Example 9:} explicit example to show that @code{gmres} uses a
left preconditioner

@example
@group
[M1, M2] = ilu (A + 0.1 * eye (n)); # factorization of A perturbed
M = M1 * M2;

## reference solution computed by gmres after two iterations
[x_ref, fl] = gmres (A, b, [], [], 1, M)

## left preconditioning
[x, fl] = gmres (M \ A, M \ b, [], [], 1)
x # compare x and x_ref

@end group
@end example

Reference:

@nospell{Y. Saad}, @cite{Iterative Methods for Sparse Linear Systems},
2nd edition, SIAM, 2003.

@seealso{bicg, bicgstab, cgs, pcg, pcr, qmr, tfqmr}
@end deftypefn
