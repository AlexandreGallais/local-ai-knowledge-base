# lsqnonneg

```octave
function [x, resnorm, residual, exitflag, output, lambda] = lsqnonneg (c, d, x0 = [], options = struct ())
```

@deftypefn  {} {@var{x} =} lsqnonneg (@var{c}, @var{d})
@deftypefnx {} {@var{x} =} lsqnonneg (@var{c}, @var{d}, @var{x0})
@deftypefnx {} {@var{x} =} lsqnonneg (@var{c}, @var{d}, @var{x0}, @var{options})
@deftypefnx {} {[@var{x}, @var{resnorm}] =} lsqnonneg (@dots{})
@deftypefnx {} {[@var{x}, @var{resnorm}, @var{residual}] =} lsqnonneg (@dots{})
@deftypefnx {} {[@var{x}, @var{resnorm}, @var{residual}, @var{exitflag}] =} lsqnonneg (@dots{})
@deftypefnx {} {[@var{x}, @var{resnorm}, @var{residual}, @var{exitflag}, @var{output}] =} lsqnonneg (@dots{})
@deftypefnx {} {[@var{x}, @var{resnorm}, @var{residual}, @var{exitflag}, @var{output}, @var{lambda}] =} lsqnonneg (@dots{})

Minimize @code{norm (@var{c}*@var{x} - @var{d})} subject to
@code{@var{x} >= 0}.

@var{c} and @var{d} must be real matrices.

@var{x0} is an optional initial guess for the solution @var{x}.

@var{options} is an options structure to change the behavior of the
algorithm (@pxref{XREFoptimset,,@code{optimset}}).  @code{lsqnonneg}
recognizes these options: @qcode{"MaxIter"}, @qcode{"TolX"}.

Outputs:

@table @var
@item resnorm
The squared 2-norm of the residual: @code{norm (@var{c}*@var{x}-@var{d})^2}

@item residual
The residual: @code{@var{d}-@var{c}*@var{x}}

@item exitflag
An indicator of convergence.  0 indicates that the iteration count was
exceeded, and therefore convergence was not reached; >0 indicates that the
algorithm converged.  (The algorithm is stable and will converge given
enough iterations.)

@item output
A structure with two fields:

@itemize @bullet
@item @qcode{"algorithm"}: The algorithm used (@qcode{"nnls"})

@item @qcode{"iterations"}: The number of iterations taken.
@end itemize

@item lambda
Lagrange multipliers.  If these are nonzero, the corresponding @var{x}
values should be zero, indicating the solution is pressed up against a
coordinate plane.  The magnitude indicates how much the residual would
improve if the @code{@var{x} >= 0} constraints were relaxed in that
direction.

@end table
@seealso{pqpnonneg, lscov, optimset}
@end deftypefn
