# pcr

```octave
function [x, flag, relres, iter, resvec] = pcr (A, b, tol, maxit, m, x0, varargin)
```

@deftypefn  {} {@var{x} =} pcr (@var{A}, @var{b}, @var{tol}, @var{maxit}, @var{m}, @var{x0}, @dots{})
@deftypefnx {} {[@var{x}, @var{flag}, @var{relres}, @var{iter}, @var{resvec}] =} pcr (@dots{})

Solve the linear system of equations @code{@var{A} * @var{x} = @var{b}} by
means of the Preconditioned Conjugate Residuals iterative method.

The input arguments are

@itemize
@item
@var{A} can be either a square (preferably sparse) matrix or a function
handle, inline function or string containing the name of a function which
computes @code{@var{A} * @var{x}}.  In principle @var{A} should be
symmetric and non-singular; if @code{pcr} finds @var{A} to be numerically
singular, you will get a warning message and the @var{flag} output
parameter will be set.

@item
@var{b} is the right hand side vector.

@item
@var{tol} is the required relative tolerance for the residual error,
@code{@var{b} - @var{A} * @var{x}}.  The iteration stops if
@code{norm (@var{b} - @var{A} * @var{x}) <=
      @var{tol} * norm (@var{b} - @var{A} * @var{x0})}.
If @var{tol} is empty or is omitted, the function sets
@code{@var{tol} = 1e-6} by default.

@item
@var{maxit} is the maximum allowable number of iterations; if @code{[]} is
supplied for @var{maxit}, or @code{pcr} has less arguments, a default
value equal to 20 is used.

@item
@var{m} is the (left) preconditioning matrix, so that the iteration is
(theoretically) equivalent to solving by
@code{pcr} @code{@var{P} * @var{x} = @var{m} \ @var{b}}, with
@code{@var{P} = @var{m} \ @var{A}}.  Note that a proper choice of the
preconditioner may dramatically improve the overall performance of the
method.  Instead of matrix @var{m}, the user may pass a function which
returns the results of applying the inverse of @var{m} to a vector
(usually this is the preferred way of using the preconditioner).  If
@code{[]} is supplied for @var{m}, or @var{m} is omitted, no
preconditioning is applied.

@item
@var{x0} is the initial guess.  If @var{x0} is empty or omitted, the
function sets @var{x0} to a zero vector by default.
@end itemize

The arguments which follow @var{x0} are treated as parameters, and passed
in a proper way to any of the functions (@var{A} or @var{m}) which are
passed to @code{pcr}.  See the examples below for further details.

The output arguments are

@itemize
@item
@var{x} is the computed approximation to the solution of
@code{@var{A} * @var{x} = @var{b}}.

@item
@var{flag} reports on the convergence.  @code{@var{flag} = 0} means the
solution converged and the tolerance criterion given by @var{tol} is
satisfied.  @code{@var{flag} = 1} means that the @var{maxit} limit for the
iteration count was reached.  @code{@var{flag} = 3} reports a @code{pcr}
breakdown, see [1] for details.

@item
@var{relres} is the ratio of the final residual to its initial value,
measured in the Euclidean norm.

@item
@var{iter} is the actual number of iterations performed.

@item
@var{resvec} describes the convergence history of the method, so that
@code{@var{resvec} (i)} contains the Euclidean norms of the residual after
the (@var{i}-1)-th iteration, @code{@var{i} = 1,2, @dots{}, @var{iter}+1}.
@end itemize

Let us consider a trivial problem with a diagonal matrix (we exploit the
sparsity of A)

@example
@group
n = 10;
A = sparse (diag (1:n));
b = rand (N, 1);
@end group
@end example

@sc{Example 1:} Simplest use of @code{pcr}

@example
x = pcr (A, b)
@end example

@sc{Example 2:} @code{pcr} with a function which computes
@code{@var{A} * @var{x}}.

@example
@group
function y = apply_a (x)
  y = [1:10]' .* x;
endfunction

x = pcr ("apply_a", b)
@end group
@end example

@sc{Example 3:}  Preconditioned iteration, with full diagnostics.  The
preconditioner (quite strange, because even the original matrix
@var{A} is trivial) is defined as a function

@example
@group
function y = apply_m (x)
  k = floor (length (x) - 2);
  y = x;
  y(1:k) = x(1:k) ./ [1:k]';
endfunction

[x, flag, relres, iter, resvec] = ...
                   pcr (A, b, [], [], "apply_m")
semilogy ([1:iter+1], resvec);
@end group
@end example

@sc{Example 4:} Finally, a preconditioner which depends on a
parameter @var{k}.

@example
@group
function y = apply_m (x, varargin)
  k = varargin@{1@};
  y = x;
  y(1:k) = x(1:k) ./ [1:k]';
endfunction

[x, flag, relres, iter, resvec] = ...
                   pcr (A, b, [], [], "apply_m"', [], 3)
@end group
@end example

Reference:

@nospell{W. Hackbusch}, @cite{Iterative Solution of Large Sparse Systems of
Equations}, section 9.5.4, @nospell{Springer}, 1994.

@seealso{sparse, pcg}
@end deftypefn
