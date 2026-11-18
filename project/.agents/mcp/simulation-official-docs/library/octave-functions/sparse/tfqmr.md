# tfqmr

```octave
function [x_min, flag, relres, iter_min, resvec] = ...
```

@deftypefn  {} {@var{x} =} tfqmr (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{M1}, @var{M2}, @var{x0}, @dots{})
@deftypefnx {} {@var{x} =} tfqmr (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{M}, [], @var{x0}, @dots{})
@deftypefnx {} {[@var{x}, @var{flag}, @var{relres}, @var{iter}, @var{resvec}] =} tfqmr (@var{A}, @var{b}, @dots{})
Solve @code{A x = b} using the Transpose-Tree qmr method, based on the cgs.

The input parameters are:

@itemize @minus

@item @var{A} is the matrix of the linear system and it must be square.
@var{A} can be passed as a matrix, function handle, or inline
function @code{Afcn} such that @code{Afcn(x) = A * x}.  Additional
parameters to @code{Afcn} are passed after @var{x0}.

@item @var{b} is the right hand side vector.  It must be a column vector
with the same number of rows as @var{A}.

@item @var{tol} is the relative tolerance, if not given or set to [] the
default value 1e-6 is used.

@item @var{maxit} the maximum number of outer iterations, if not given or
set to [] the default value @code{min (20, numel (b))} is used.  To be
compatible, since the method as different behaviors in the iteration
number is odd or even, is considered as iteration in @code{tfqmr} the
entire odd-even cycle.  That is, to make an entire iteration, the algorithm
performs two sub-iterations: the odd one and the even one.

@item @var{M1}, @var{M2} are the preconditioners.  The preconditioner
@var{M} is given as @code{M = M1 * M2}.
Both @var{M1} and @var{M2} can be passed as a matrix or as a function
handle or inline function @code{g} such that @code{g(x) = M1 \ x} or
@code{g(x) = M2 \ x}.
The technique used is the right-preconditioning, i.e., it is solved
@code{A*inv(M)*y = b} and then @code{x = inv(M)*y}, instead of
@code{A x = b}.

@item @var{x0} the initial guess, if not given or set to [] the default
value @code{zeros (size (b))} is used.

@end itemize

The arguments which follow @var{x0} are treated as parameters, and passed in
a proper way to any of the functions (@var{A} or @var{M}) which are passed
to @code{tfqmr}.

The output parameters are:

@itemize @minus

@item @var{x} is the approximation computed.  If the method doesn't
converge then it is the iterated with the minimum residual.

@item @var{flag} indicates the exit status:

@itemize @minus
@item 0: iteration converged to the within the chosen tolerance

@item 1: the maximum number of iterations was reached before convergence

@item 2: the preconditioner matrix is singular

@item 3: the algorithm reached stagnation

@item 4: the algorithm can't continue due to a division by zero
@end itemize

@item @var{relres} is the relative residual obtained as
@code{(@var{A}*@var{x}-@var{b}) / @code{norm (@var{b})}}.

@item @var{iter} is the iteration which @var{x} is
computed.

@item @var{resvec} is a vector containing the residual at each iteration
(including @code{norm (b - A x0)}).
Doing @code{length (@var{resvec}) - 1} is possible to see the
total number of iterations performed.

@end itemize

Let us consider a trivial problem with a tridiagonal matrix

@smallexample
@group
n = 20;
A = toeplitz (sparse ([1, 1], [1, 2], [2, 1] * n ^ 2, 1, n))  + ...
    toeplitz (sparse (1, 2, -1, 1, n) * n / 2, ...
    sparse (1, 2, 1, 1, n) * n / 2);
b = A * ones (n, 1);
restart = 5;
[M1, M2] = ilu (A); # in this tridiag case it corresponds to chol (A)'
M = M1 * M2;
Afcn = @@(x) A * x;
Mfcn = @@(x) M \ x;
M1fcn = @@(x) M1 \ x;
M2fcn = @@(x) M2 \ x;
@end group
@end smallexample

@sc{Example 1:} simplest usage of @code{tfqmr}

@example
x = tfqmr (A, b, [], n)
@end example

@sc{Example 2:} @code{tfqmr} with a function which computes
@code{@var{A} * @var{x}}

@example
x = tfqmr (Afcn, b, [], n)
@end example

@sc{Example 3:} @code{tfqmr} with a preconditioner matrix @var{M}

@example
x = tfqmr (A, b, [], 1e-06, n, M)
@end example

@sc{Example 4:} @code{tfqmr} with a function as preconditioner

@example
x = tfqmr (Afcn, b, 1e-6, n, Mfcn)
@end example

@sc{Example 5:} @code{tfqmr} with preconditioner matrices @var{M1}
and @var{M2}

@example
x = tfqmr (A, b, [], 1e-6, n, M1, M2)
@end example

@sc{Example 6:} @code{tfmqr} with functions as preconditioners

@example
x = tfqmr (Afcn, b, 1e-6, n, M1fcn, M2fcn)
@end example

@sc{Example 7:} @code{tfqmr} with as input a function requiring an argument

@example
@group
function y = Ap (A, x, z) # compute A^z * x
   y = x;
   for i = 1:z
     y = A * y;
   endfor
 endfunction
Apfcn = @@(x, string, p) Ap (A, x, string, p);
x = tfqmr (Apfcn, b, [], [], [], [], [], 2);
@end group
@end example

@sc{Example 8:} explicit example to show that @code{tfqmr} uses a
right preconditioner

@example
@group
[M1, M2] = ilu (A + 0.3 * eye (n)); # factorization of A perturbed
M = M1 * M2;

## reference solution computed by tfqmr after one iteration
[x_ref, fl] = tfqmr (A, b, [], 1, M)

## right preconditioning
[y, fl] = tfqmr (A / M, b, [], 1)
x = M \ y # compare x and x_ref

@end group
@end example

Reference:

@nospell{Y. Saad}, @cite{Iterative Methods for Sparse Linear Systems},
2nd edition, SIAM, 2003.

@seealso{bicg, bicgstab, cgs, gmres, pcg, qmr, pcr}

@end deftypefn
