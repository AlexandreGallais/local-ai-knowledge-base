# fzero

```octave
function [x, fval, info, output] = fzero (fcn, x0, options = struct ())
```

@deftypefn  {} {@var{x} =} fzero (@var{fcn}, @var{x0})
@deftypefnx {} {@var{x} =} fzero (@var{fcn}, @var{x0}, @var{options})
@deftypefnx {} {[@var{x}, @var{fval}] =} fzero (@dots{})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}] =} fzero (@dots{})
@deftypefnx {} {[@var{x}, @var{fval}, @var{info}, @var{output}] =} fzero (@dots{})
Find a zero of a univariate function.

@var{fcn} is a function handle, inline function, or string containing the
name of the function to evaluate.

@var{x0} should be a two-element vector specifying two points which bracket
a zero.  In other words, there must be a change in sign of the function
between @var{x0}(1) and @var{x0}(2).  More mathematically, the following
must hold

@example
sign (@var{fcn} (@var{x0}(1))) * sign (@var{fcn} (@var{x0}(2))) <= 0
@end example

If @var{x0} is a single scalar then several nearby and distant values are
probed in an attempt to obtain a valid bracketing.  If this is not
successful, the function fails.

@var{options} is a structure specifying additional options.  Currently,
@code{fzero} recognizes these options:
@qcode{"Display"}, @qcode{"FunValCheck"}, @qcode{"MaxFunEvals"},
@qcode{"MaxIter"}, @qcode{"OutputFcn"}, and @qcode{"TolX"}.

@qcode{"MaxFunEvals"} proscribes the maximum number of function evaluations
before the search is halted.  The default value is @code{Inf}.
The value must be a positive integer.

@qcode{"MaxIter"} proscribes the maximum number of algorithm iterations
before the search is halted.  The default value is @code{Inf}.
The value must be a positive integer.

@qcode{"TolX"} specifies the termination tolerance for the solution @var{x}.
The default value is @code{eps}.

For a description of the other options,
@pxref{XREFoptimset,,@code{optimset}}.
To initialize an options structure with default values for @code{fzero} use
@code{options = optimset ("fzero")}.

On exit, the function returns @var{x}, the approximate zero point, and
@var{fval}, the function evaluated at @var{x}.

The third output @var{info} reports whether the algorithm succeeded and
may take one of the following values:

@itemize
@item 1
 The algorithm converged to a solution.

@item 0
 Maximum number of iterations or function evaluations has been reached.

@item -1
 The algorithm has been terminated by a user @code{OutputFcn}.

@item -5
 The algorithm may have converged to a singular point.

@item -6
 No valid initial bracketing with a sign change found.
@end itemize

@var{output} is a structure containing runtime information about the
@code{fzero} algorithm.  Fields in the structure are:

@itemize
@item @nospell{intervaliterations}
 Number of iterations searching for a bracketing interval.

@item iterations
 Number of iterations searching for a zero.

@item @nospell{funcCount}
 Number of function evaluations.

@item algorithm
 The string @qcode{"bisection, interpolation"}.

@item message
 A string with the final status of the algorithm.

@item bracketx
 A two-element vector with the final bracketing of the zero along the
x-axis.

@item brackety
 A two-element vector with the final bracketing of the zero along the
y-axis.
@end itemize

Programming Notes: The algorithm relies on the function crossing the x-axis
and having both positive and negative values.  It will not generally work
for functions which only touch the x-axis, e.g., @math{x^2}.  The function
will generally be faster if a 2-element bracketing interval @var{x0} is
supplied since no interval search will be conducted.
@seealso{fsolve, fminbnd, optimset}
@end deftypefn
