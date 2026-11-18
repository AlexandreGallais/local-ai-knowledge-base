# qmr

```octave
function [x, flag, relres, iter, resvec] = qmr (A, b, rtol, maxit, M1, M2, x0)
```

@deftypefn  {} {@var{x} =} qmr (@var{A}, @var{b}, @var{rtol}, @var{maxit}, @var{M1}, @var{M2}, @var{x0})
@deftypefnx {} {@var{x} =} qmr (@var{A}, @var{b}, @var{rtol}, @var{maxit}, @var{P})
@deftypefnx {} {[@var{x}, @var{flag}, @var{relres}, @var{iter}, @var{resvec}] =} qmr (@var{A}, @var{b}, @dots{})
Solve @code{A x = b} using the Quasi-Minimal Residual iterative method
(without look-ahead).

@itemize @minus
@item @var{rtol} is the relative tolerance, if not given or set to [] the
default value 1e-6 is used.

@item @var{maxit} the maximum number of outer iterations, if not given or
set to [] the default value @code{min (20, numel (b))} is used.

@item @var{x0} the initial guess, if not given or set to [] the default
value @code{zeros (size (b))} is used.
@end itemize

@var{A} can be passed as a matrix or as a function handle or inline
function @code{f} such that @code{f(x, "notransp") = A*x} and
@code{f(x, "transp") = A'*x}.

The preconditioner @var{P} is given as @code{P = M1 * M2}.  Both @var{M1}
and @var{M2} can be passed as a matrix or as a function handle or inline
function @code{g} such that @code{g(x, "notransp") = M1 \ x} or
@code{g(x, "notransp") = M2 \ x} and @code{g(x, "transp") = M1' \ x} or
@code{g(x, "transp") = M2' \ x}.

If called with more than one output parameter

@itemize @minus
@item @var{flag} indicates the exit status:

@itemize @minus
@item 0: iteration converged to the within the chosen tolerance

@item 1: the maximum number of iterations was reached before convergence

@item 3: the algorithm reached stagnation
@end itemize

(the value 2 is unused but skipped for compatibility).

@item @var{relres} is the final value of the relative residual.

@item @var{iter} is the number of iterations performed.

@item @var{resvec} is a vector containing the residual norms at each
      iteration.
@end itemize

References:

@enumerate
@item
@nospell{R. Freund and N. Nachtigal}, "QMR: a quasi-minimal residual method
for non-Hermitian linear systems", @cite{@nospell{Numerische Mathematik}},
60, @w{pp.@: 315}--339, 1991.

@item
@nospell{R. Barrett, M. Berry, T. Chan, J. Demmel, J. Donato, J. Dongarra},
@nospell{V. Eijkhour, R. Pozo, C. Romine, and H. van der Vorst},
@cite{Templates for the solution of linear systems: Building blocks
for iterative methods}, SIAM, 2nd ed., 1994.
@end enumerate

@seealso{bicg, bicgstab, cgs, gmres, pcg}
@end deftypefn
