# fsolve

```octave
function [x, fval, info, output, fjac] = fsolve (fcn, x0, options = struct ())
```

@deftypefn  {} {@var{x} =} fsolve (@var{fcn}, @var{x0})
@deftypefnx {} {@var{x} =} fsolve (@var{fcn}, @var{x0}, @var{options})
@deftypefnx {} {[@var{x}, @var{fval}] =} fsolve (@dots{})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}] =} fsolve (@dots{})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}, @var{output}] =} fsolve (@dots{})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}, @var{output}, @var{fjac}] =} fsolve (@dots{})
Solve a system of nonlinear equations defined by the function @var{fcn}.

@var{fcn} is a function handle, inline function, or string containing the
name of the function to evaluate.  @var{fcn} should accept a vector (array)
defining the unknown variables, and return a vector of left-hand sides of
the equations.  Right-hand sides are defined to be zeros.  In other words,
this function attempts to determine a vector @var{x} such that
@code{@var{fcn} (@var{x})} gives (approximately) all zeros.

@var{x0} is an initial guess for the solution.  The shape of @var{x0} is
preserved in all calls to @var{fcn}, but otherwise is treated as a column
vector.

@var{options} is a structure specifying additional parameters which
control the algorithm.  Currently, @code{fsolve} recognizes these options:
@qcode{"AutoScaling"}, @qcode{"ComplexEqn"}, @qcode{"FinDiffType"},
@qcode{"FunValCheck"}, @qcode{"Jacobian"}, @qcode{"MaxFunEvals"},
@qcode{"MaxIter"}, @qcode{"OutputFcn"}, @qcode{"TolFun"}, @qcode{"TolX"},
@qcode{"TypicalX"}, and @qcode{"Updating"}.

If @qcode{"AutoScaling"} is @qcode{"on"}, the variables will be
automatically scaled according to the column norms of the (estimated)
Jacobian.  As a result, @qcode{"TolFun"} becomes scaling-independent.  By
default, this option is @qcode{"off"} because it may sometimes deliver
unexpected (though mathematically correct) results.

If @qcode{"ComplexEqn"} is @qcode{"on"}, @code{fsolve} will attempt to solve
complex equations in complex variables, assuming that the equations possess
a complex derivative (i.e., are holomorphic).  If this is not what you want,
you should unpack the real and imaginary parts of the system to get a real
system.

If @qcode{"Jacobian"} is @qcode{"on"}, it specifies that @var{fcn}---when
called with 2 output arguments---also returns the Jacobian matrix of
right-hand sides at the requested point.

@qcode{"MaxFunEvals"} proscribes the maximum number of function evaluations
before optimization is halted.  The default value is
@code{100 * number_of_variables}, i.e., @code{100 * length (@var{x0})}.
The value must be a positive integer.

If @qcode{"Updating"} is @qcode{"on"}, the function will attempt to use
@nospell{Broyden} updates to update the Jacobian, in order to reduce the
number of Jacobian calculations.  If your user function always calculates
the Jacobian (regardless of number of output arguments) then this option
provides no advantage and should be disabled.

@qcode{"TolX"} specifies the termination tolerance in the unknown variables,
while @qcode{"TolFun"} is a tolerance for equations.  Default is @code{1e-6}
for both @qcode{"TolX"} and @qcode{"TolFun"}.

For a description of the other options,
@pxref{XREFoptimset,,@code{optimset}}.  To initialize an options structure
with default values for @code{fsolve} use
@code{options = optimset ("fsolve")}.

The first output @var{x} is the solution while the second output @var{fval}
contains the value of the function @var{fcn} evaluated at @var{x} (ideally
a vector of all zeros).

The third output @var{info} reports whether the algorithm succeeded and may
take one of the following values:

@table @asis
@item 1
Converged to a solution point.  Relative residual error is less than
specified by @code{TolFun}.

@item 2
Last relative step size was less than @code{TolX}.

@item 3
Last relative decrease in residual was less than @code{TolFun}.

@item 0
Iteration limit (either @code{MaxIter} or @code{MaxFunEvals}) exceeded.

@item -1
Stopped by @code{OutputFcn}.

@item -2
The Jacobian became excessively small and the search stalled.

@item -3
The trust region radius became excessively small.
@end table

@var{output} is a structure containing runtime information about the
@code{fsolve} algorithm.  Fields in the structure are:

@table @code
@item iterations
 Number of iterations through loop.

@item successful
 Number of successful iterations.

@item @nospell{funcCount}
 Number of function evaluations.

@end table

The final output @var{fjac} contains the value of the Jacobian evaluated
at @var{x}.

Note: If you only have a single nonlinear equation of one variable, using
@code{fzero} is usually a much better idea.

Note about user-supplied Jacobians:
As an inherent property of the algorithm, a Jacobian is always requested for
a solution vector whose residual vector is already known, and it is the last
accepted successful step.  Often this will be one of the last two calls, but
not always.  If the savings by reusing intermediate results from residual
calculation in Jacobian calculation are significant, the best strategy is to
employ @code{OutputFcn}: After a vector is evaluated for residuals, if
@code{OutputFcn} is called with that vector, then the intermediate results
should be saved for future Jacobian evaluation, and should be kept until a
Jacobian evaluation is requested or until @code{OutputFcn} is called with a
different vector, in which case they should be dropped in favor of this most
recent vector.  A short example how this can be achieved follows:

@example
function [fval, fjac] = user_fcn (x, optimvalues, state)
persistent sav = [], sav0 = [];
if (nargin == 1)
  ## evaluation call
  if (nargout == 1)
    sav0.x = x;  # mark saved vector
    ## calculate fval, save results to sav0.
  elseif (nargout == 2)
    ## calculate fjac using sav.
  endif
else
  ## outputfcn call.
  if (all (x == sav0.x))
    sav = sav0;
  endif
  ## maybe output iteration status, etc.
endif
endfunction

## @dots{}

fsolve (@@user_fcn, x0, optimset ("OutputFcn", @@user_fcn, @dots{}))
@end example
@seealso{fzero, optimset}
@end deftypefn
