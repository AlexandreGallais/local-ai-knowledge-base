# sqp

```octave
function [x, obj, info, iter, nf, lambda] = sqp (x0, objf, cef, cif, lb, ub, maxiter, tolerance)
```

@deftypefn  {} {[@var{x}, @var{obj}, @var{info}, @var{iter}, @var{nf}, @var{lambda}] =} sqp (@var{x0}, @var{phi})
@deftypefnx {} {[@dots{}] =} sqp (@var{x0}, @var{phi}, @var{g})
@deftypefnx {} {[@dots{}] =} sqp (@var{x0}, @var{phi}, @var{g}, @var{h})
@deftypefnx {} {[@dots{}] =} sqp (@var{x0}, @var{phi}, @var{g}, @var{h}, @var{lb}, @var{ub})
@deftypefnx {} {[@dots{}] =} sqp (@var{x0}, @var{phi}, @var{g}, @var{h}, @var{lb}, @var{ub}, @var{maxiter})
@deftypefnx {} {[@dots{}] =} sqp (@var{x0}, @var{phi}, @var{g}, @var{h}, @var{lb}, @var{ub}, @var{maxiter}, @var{tolerance})
Minimize an objective function using sequential quadratic programming (SQP).

Solve the nonlinear program
@tex
$$
\min_x \phi (x)
$$
@end tex
@ifnottex

@example
@group
min phi (x)
 x
@end group
@end example

@end ifnottex
subject to
@tex
$$
 g(x) = 0 \qquad h(x) \geq 0 \qquad lb \leq x \leq ub
$$
@end tex
@ifnottex

@example
@group
g(x)  = 0
h(x) >= 0
lb <= x <= ub
@end group
@end example

@end ifnottex
@noindent
using a sequential quadratic programming method.

The first argument is the initial guess for the vector @var{x0}.

The second argument is a function handle pointing to the objective function
@var{phi}.  The objective function must accept one vector argument and
return a scalar.

The second argument may also be a 2- or 3-element cell array of function
handles.  The first element should point to the objective function, the
second should point to a function that computes the gradient of the
objective function, and the third should point to a function that computes
the Hessian of the objective function.  If the gradient function is not
supplied, the gradient is computed by finite differences.  If the Hessian
function is not supplied, a BFGS update formula is used to approximate the
Hessian.

When supplied, the gradient function @code{@var{phi}@{2@}} must accept one
vector argument and return a vector.  When supplied, the Hessian function
@code{@var{phi}@{3@}} must accept one vector argument and return a matrix.

The third and fourth arguments @var{g} and @var{h} are function handles
pointing to functions that compute the equality constraints and the
inequality constraints, respectively.  If the problem does not have
equality (or inequality) constraints, then use an empty matrix ([]) for
@var{g} (or @var{h}).  When supplied, these equality and inequality
constraint functions must accept one vector argument and return a vector.

The third and fourth arguments may also be 2-element cell arrays of
function handles.  The first element should point to the constraint
function and the second should point to a function that computes the
gradient of the constraint function:
@tex
$$
 \Bigg( {\partial f(x) \over \partial x_1},
        {\partial f(x) \over \partial x_2}, \ldots,
        {\partial f(x) \over \partial x_N} \Bigg)^T
$$
@end tex
@ifnottex

@example
@group
            [ d f(x)   d f(x)        d f(x) ]
transpose ( [ ------   -----   ...   ------ ] )
            [  dx_1     dx_2          dx_N  ]
@end group
@end example

@end ifnottex
The fifth and sixth arguments, @var{lb} and @var{ub}, contain lower and
upper bounds on @var{x} and when provided must be vectors of the same size
as the vector @var{x0}.  The bounds must be consistent with the
equality and inequality constraints @var{g} and @var{h}.

The seventh argument @var{maxiter} specifies the maximum number of
iterations.  The default value is 100.

The eighth argument @var{tolerance} specifies the tolerance for the stopping
criteria.  The default value is @code{sqrt (eps)}.

The value returned in @var{info} may be one of the following:

@table @asis
@item 101
The algorithm terminated normally.
All constraints meet the specified tolerance.

@item 102
The BFGS update failed.

@item 103
The maximum number of iterations was reached.

@item 104
The stepsize has become too small, i.e.,
@tex
$\Delta x,$
@end tex
@ifnottex
delta @var{x},
@end ifnottex
is less than @code{@var{tol} * norm (x)}.
@end table

An example of calling @code{sqp}:

@example
function r = g (x)
  r = [ sumsq(x)-10;
        x(2)*x(3)-5*x(4)*x(5);
        x(1)^3+x(2)^3+1 ];
endfunction

function obj = phi (x)
  obj = exp (prod (x)) - 0.5*(x(1)^3+x(2)^3+1)^2;
endfunction

x0 = [-1.8; 1.7; 1.9; -0.8; -0.8];

[x, obj, info, iter, nf, lambda] = sqp (x0, @@phi, @@g, [])

x =

  -1.71714
   1.59571
   1.82725
  -0.76364
  -0.76364

obj = 0.053950
info = 101
iter = 8
nf = 10
lambda =

  -0.0401627
   0.0379578
  -0.0052227
@end example

@seealso{qp}
@end deftypefn
