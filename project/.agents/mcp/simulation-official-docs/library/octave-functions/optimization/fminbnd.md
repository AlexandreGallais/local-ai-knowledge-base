# fminbnd

```octave
function [x, fval, info, output] = fminbnd (fcn, a, b, options = struct ())
```

@deftypefn  {} {@var{x} =} fminbnd (@var{fcn}, @var{a}, @var{b})
@deftypefnx {} {@var{x} =} fminbnd (@var{fcn}, @var{a}, @var{b}, @var{options})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}, @var{output}] =} fminbnd (@dots{})
Find a minimum point of a univariate function.

@var{fcn} is a function handle, inline function, or string containing the
name of the function to evaluate.

The starting interval is specified by @var{a} (left boundary) and @var{b}
(right boundary).  The endpoints must be finite.

@var{options} is a structure specifying additional parameters which
control the algorithm.  Currently, @code{fminbnd} recognizes these options:
@qcode{"Display"}, @qcode{"FunValCheck"}, @qcode{"MaxFunEvals"},
@qcode{"MaxIter"}, @qcode{"OutputFcn"}, @qcode{"TolX"}.

@qcode{"MaxFunEvals"} proscribes the maximum number of function evaluations
before optimization is halted.  The default value is 500.
The value must be a positive integer.

@qcode{"MaxIter"} proscribes the maximum number of algorithm iterations
before optimization is halted.  The default value is 500.
The value must be a positive integer.

@qcode{"TolX"} specifies the termination tolerance for the solution @var{x}.
The default is @code{1e-4}.

For a description of the other options,
@pxref{XREFoptimset,,@code{optimset}}.
To initialize an options structure with default values for @code{fminbnd}
use @code{options = optimset ("fminbnd")}.

On exit, the function returns @var{x}, the approximate minimum point, and
@var{fval}, the function evaluated @var{x}.

The third output @var{info} reports whether the algorithm succeeded and may
take one of the following values:

@itemize
@item 1
The algorithm converged to a solution.

@item 0
Iteration limit (either @code{MaxIter} or @code{MaxFunEvals}) exceeded.

@item -1
The algorithm was terminated by a user @code{OutputFcn}.
@end itemize

Application Notes:
@enumerate
@item
The search for a minimum is restricted to be in the
finite interval bound by @var{a} and @var{b}.  If you have only one initial
point to begin searching from then you will need to use an unconstrained
minimization algorithm such as @code{fminunc} or @code{fminsearch}.
@code{fminbnd} internally uses a Golden Section search strategy.

@item
Use @ref{Anonymous Functions} to pass additional parameters to @var{fcn}.
For specific examples of doing so for @code{fminbnd} and other
minimization functions see the @ref{Minimizers} section of the GNU Octave
manual.
@end enumerate
@seealso{fzero, fminunc, fminsearch, optimset}
@end deftypefn
