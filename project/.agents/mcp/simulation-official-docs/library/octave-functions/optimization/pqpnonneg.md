# pqpnonneg

```octave
function [x, minval, exitflag, output, lambda] = pqpnonneg (c, d, x0 = [],
```

@deftypefn  {} {@var{x} =} pqpnonneg (@var{c}, @var{d})
@deftypefnx {} {@var{x} =} pqpnonneg (@var{c}, @var{d}, @var{x0})
@deftypefnx {} {@var{x} =} pqpnonneg (@var{c}, @var{d}, @var{x0}, @var{options})
@deftypefnx {} {[@var{x}, @var{minval}] =} pqpnonneg (@dots{})
@deftypefnx {} {[@var{x}, @var{minval}, @var{exitflag}] =} pqpnonneg (@dots{})
@deftypefnx {} {[@var{x}, @var{minval}, @var{exitflag}, @var{output}] =} pqpnonneg (@dots{})
@deftypefnx {} {[@var{x}, @var{minval}, @var{exitflag}, @var{output}, @var{lambda}] =} pqpnonneg (@dots{})

Minimize @code{ (1/2 * @var{x}' * @var{c} * @var{x} + @var{d}' * @var{x}) }
subject to @code{@var{x} >= 0}.

@var{c} and @var{d} must be real matrices, and @var{c} must be symmetric and
positive definite.

@var{x0} is an optional initial guess for the solution @var{x}.

@var{options} is an options structure to change the behavior of the
algorithm (@pxref{XREFoptimset,,@code{optimset}}).  @code{pqpnonneg}
recognizes one option: @qcode{"MaxIter"}.

Outputs:

@table @var

@item x
The solution matrix

@item minval
The minimum attained model value,
@code{1/2*@var{xmin}'*@var{c}*@var{xmin} + @var{d}'*@var{xmin}}

@item exitflag
An indicator of convergence.  0 indicates that the iteration count was
exceeded, and therefore convergence was not reached; >0 indicates that the
algorithm converged.  (The algorithm is stable and will converge given
enough iterations.)

@item output
A structure with two fields:

@itemize @bullet
@item @qcode{"algorithm"}: The algorithm used (@nospell{@qcode{"nnls"}})

@item @qcode{"iterations"}: The number of iterations taken.
@end itemize

@item lambda
Lagrange multipliers.  If these are nonzero, the corresponding @var{x}
values should be zero, indicating the solution is pressed up against a
coordinate plane.  The magnitude indicates how much the residual would
improve if the @code{@var{x} >= 0} constraints were relaxed in that
direction.

@end table
@seealso{lsqnonneg, qp, optimset}
@end deftypefn
