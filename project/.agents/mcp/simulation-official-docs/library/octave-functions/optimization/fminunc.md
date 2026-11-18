# fminunc

```octave
function [x, fval, info, output, grad, hess] = fminunc (fcn, x0, options = struct ())
```

@deftypefn  {} {@var{x} =} fminunc (@var{fcn}, @var{x0})
@deftypefnx {} {@var{x} =} fminunc (@var{fcn}, @var{x0}, @var{options})
@deftypefnx {} {[@var{x}, @var{fval}] =} fminunc (@var{fcn}, @dots{})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}] =} fminunc (@var{fcn}, @dots{})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}, @var{output}] =} fminunc (@var{fcn}, @dots{})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}, @var{output}, @var{grad}] =} fminunc (@var{fcn}, @dots{})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}, @var{output}, @var{grad}, @var{hess}] =} fminunc (@var{fcn}, @dots{})
Solve an unconstrained optimization problem defined by the function
@var{fcn}.

@code{fminunc} attempts to determine a vector @var{x} such that
@code{@var{fcn} (@var{x})} is a local minimum.

@var{fcn} is a function handle, inline function, or string containing the
name of the function to evaluate.  @var{fcn} should accept a vector (array)
defining the unknown variables, and return the objective function value,
optionally with gradient.

@var{x0} determines a starting guess.  The shape of @var{x0} is preserved in
all calls to @var{fcn}, but otherwise is treated as a column vector.

@var{options} is a structure specifying additional parameters which
control the algorithm.  Currently, @code{fminunc} recognizes these options:
@qcode{"AutoScaling"}, @qcode{"FinDiffType"}, @qcode{"FunValCheck"},
@qcode{"GradObj"}, @qcode{"MaxFunEvals"}, @qcode{"MaxIter"},
@qcode{"OutputFcn"}, @qcode{"TolFun"}, @qcode{"TolX"}, @qcode{"TypicalX"}.

If @qcode{"AutoScaling"} is @qcode{"on"}, the variables will be
automatically scaled according to the column norms of the (estimated)
Jacobian.  As a result, @qcode{"TolFun"} becomes scaling-independent.  By
default, this option is @qcode{"off"} because it may sometimes deliver
unexpected (though mathematically correct) results.

If @qcode{"GradObj"} is @qcode{"on"}, it specifies that @var{fcn}---when
called with two output arguments---also returns the Jacobian matrix of
partial first derivatives at the requested point.

@qcode{"MaxFunEvals"} proscribes the maximum number of function evaluations
before optimization is halted.  The default value is
@code{100 * number_of_variables}, i.e., @code{100 * length (@var{x0})}.
The value must be a positive integer.

@qcode{"MaxIter"} proscribes the maximum number of algorithm iterations
before optimization is halted.  The default value is 400.
The value must be a positive integer.

@qcode{"TolX"} specifies the termination tolerance for the unknown variables
@var{x}, while @qcode{"TolFun"} is a tolerance for the objective function
value @var{fval}.  The default is @code{1e-6} for both options.

For a description of the other options,
@pxref{XREFoptimset,,@code{optimset}}.

On return, @var{x} is the location of the minimum and @var{fval} contains
the value of the objective function at @var{x}.

@var{info} may be one of the following values:

@table @asis
@item 1
Converged to a solution point.  Relative gradient error is less than
specified by @code{TolFun}.

@item 2
Last relative step size was less than @code{TolX}.

@item 3
Last relative change in function value was less than @code{TolFun}.

@item 0
Iteration limit exceeded---either maximum number of algorithm iterations
@code{MaxIter} or maximum number of function evaluations @code{MaxFunEvals}.

@item -1
Algorithm terminated by @code{OutputFcn}.

@item -3
The trust region radius became excessively small.
@end table

Optionally, @code{fminunc} can return a structure with convergence
statistics (@var{output}), the output gradient (@var{grad}) at the
solution @var{x}, and approximate Hessian (@var{hess}) at the solution
@var{x}.

Application Notes:
@enumerate
@item
If the objective function is a single nonlinear equation
of one variable then using @code{fminbnd} is usually a better choice.

@item
The algorithm used by @code{fminunc} is a gradient search which depends
on the objective function being differentiable.  If the function has
discontinuities it may be better to use a derivative-free algorithm such as
@code{fminsearch}.

@item
Use @ref{Anonymous Functions} to pass additional parameters to @var{fcn}.
For specific examples of doing so for @code{fminunc} and other
minimization functions see the @ref{Minimizers} section of the GNU Octave
manual.
@end enumerate
@seealso{fminbnd, fminsearch, optimset}
@end deftypefn
