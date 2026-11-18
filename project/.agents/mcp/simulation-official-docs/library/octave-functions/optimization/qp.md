# qp

```octave
function [x, obj, INFO, lambda] = qp (x0, H, varargin)
```

@deftypefn  {} {[@var{x}, @var{obj}, @var{info}, @var{lambda}] =} qp (@var{x0}, @var{H})
@deftypefnx {} {[@var{x}, @var{obj}, @var{info}, @var{lambda}] =} qp (@var{x0}, @var{H}, @var{q})
@deftypefnx {} {[@var{x}, @var{obj}, @var{info}, @var{lambda}] =} qp (@var{x0}, @var{H}, @var{q}, @var{A}, @var{b})
@deftypefnx {} {[@var{x}, @var{obj}, @var{info}, @var{lambda}] =} qp (@var{x0}, @var{H}, @var{q}, @var{A}, @var{b}, @var{lb}, @var{ub})
@deftypefnx {} {[@var{x}, @var{obj}, @var{info}, @var{lambda}] =} qp (@var{x0}, @var{H}, @var{q}, @var{A}, @var{b}, @var{lb}, @var{ub}, @var{A_lb}, @var{A_in}, @var{A_ub})
@deftypefnx {} {[@var{x}, @var{obj}, @var{info}, @var{lambda}] =} qp (@dots{}, @var{options})
Solve a quadratic program (QP).

Solve the quadratic program defined by
@tex
$$
 \min_x {1 \over 2} x^T H x + x^T q
$$
@end tex
@ifnottex

@example
@group
min 0.5 x'*H*x + x'*q
 x
@end group
@end example

@end ifnottex
subject to
@tex
$$
 A x = b \qquad lb \leq x \leq ub \qquad A_{lb} \leq A_{in} x \leq A_{ub}
$$
@end tex
@ifnottex

@example
@group
A*x = b
lb <= x <= ub
A_lb <= A_in*x <= A_ub
@end group
@end example

@end ifnottex
@noindent
using a null-space active-set method.

Any bound (@var{A}, @var{b}, @var{lb}, @var{ub}, @var{A_in}, @var{A_lb},
@var{A_ub}) may be set to the empty matrix (@code{[]}) if not present.  The
constraints @var{A} and @var{A_in} are matrices with each row representing
a single constraint.  The other bounds are scalars or vectors depending on
the number of constraints.  The algorithm is faster if the initial guess is
feasible.

@var{options} is a structure specifying additional parameters which
control the algorithm.  Currently, @code{qp} recognizes these options:
@qcode{"MaxIter"}, @qcode{"TolX"}, @qcode{"AllowSemidefinite"}.

@qcode{"MaxIter"} sets the maximum number of algorithm iterations before
optimization is halted.  The default value is 200.
The value must be a positive integer.

@qcode{"TolX"} specifies the termination tolerance for the unknown variables
@var{x}.  The default is @code{sqrt (eps)} or approximately 1e-8.

@qcode{"AllowSemidefinite"} is a boolean flag: @code{true} allows positive
semi-definite problems (one or more eigenvalues of the Hessian are zero).
@code{false} requires positive definiteness (all eigenvalues positive).
The default is @code{false}.

On return, @var{x} is the location of the minimum and @var{fval} contains
the value of the objective function at @var{x}.

@table @var
@item info
Structure containing run-time information about the algorithm.  The
following fields are defined:

@table @code
@item solveiter
The number of iterations required to find the solution.

@item info
An integer indicating the status of the solution.

@table @asis
@item 0
The problem is feasible and convex.  Global solution found.

@item 1
The problem is not convex.  Local solution found.

@item 2
The problem is not convex and unbounded.

@item 3
Maximum number of iterations reached.

@item 6
The problem is infeasible.
@end table
@end table
@end table
@seealso{sqp}
@end deftypefn
