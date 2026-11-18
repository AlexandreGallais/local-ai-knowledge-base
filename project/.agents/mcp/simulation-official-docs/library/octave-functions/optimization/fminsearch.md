# fminsearch

```octave
function [x, fval, exitflag, output] = fminsearch (varargin)
```

@deftypefn  {} {@var{x} =} fminsearch (@var{fcn}, @var{x0})
@deftypefnx {} {@var{x} =} fminsearch (@var{fcn}, @var{x0}, @var{options})
@deftypefnx {} {@var{x} =} fminsearch (@var{problem})
@deftypefnx {} {[@var{x}, @var{fval}, @var{exitflag}, @var{output}] =} fminsearch (@dots{})

Find a value of @var{x} which minimizes the multi-variable function
@var{fcn}.

@var{fcn} is a function handle, inline function, or string containing the
name of the function to evaluate.

The search begins at the point @var{x0} and iterates using the
@nospell{Nelder & Mead} Simplex algorithm (a derivative-free method).  This
algorithm is better-suited to functions which have discontinuities or for
which a gradient-based search such as @code{fminunc} fails.

Options for the search are provided in the parameter @var{options} using the
function @code{optimset}.  Currently, @code{fminsearch} accepts the options:
@qcode{"Display"}, @qcode{"FunValCheck"},@qcode{"MaxFunEvals"},
@qcode{"MaxIter"}, @qcode{"OutputFcn"}, @qcode{"TolFun"}, @qcode{"TolX"}.

@qcode{"MaxFunEvals"} proscribes the maximum number of function evaluations
before optimization is halted.  The default value is
@code{200 * number_of_variables}, i.e., @code{200 * length (@var{x0})}.
The value must be a positive integer.

@qcode{"MaxIter"} proscribes the maximum number of algorithm iterations
before optimization is halted.  The default value is
@code{200 * number_of_variables}, i.e., @code{200 * length (@var{x0})}.
The value must be a positive integer.

For a description of the other options,
@pxref{XREFoptimset,,@code{optimset}}.  To initialize an options structure
with default values for @code{fminsearch} use
@code{options = optimset ("fminsearch")}.

@code{fminsearch} may also be called with a single structure argument
with the following fields:

@table @code
@item objective
The objective function.

@item x0
The initial point.

@item solver
Must be set to @qcode{"fminsearch"}.

@item options
A structure returned from @code{optimset} or an empty matrix to
indicate that defaults should be used.
@end table

@noindent
The field @code{options} is optional.  All others are required.

On exit, the function returns @var{x}, the minimum point, and @var{fval},
the function value at the minimum.

The third output @var{exitflag} reports whether the algorithm succeeded and
may take one of the following values:

@table @asis
@item 1
if the algorithm converged
(size of the simplex is smaller than @code{TolX} @strong{AND} the step in
function value between iterations is smaller than @code{TolFun}).

@item 0
if the maximum number of iterations or the maximum number of function
evaluations are exceeded.

@item -1
if the iteration is stopped by the @qcode{"OutputFcn"}.
@end table

The fourth output is a structure @var{output} containing runtime
about the algorithm.  Fields in the structure are @code{funcCount}
containing the number of function calls to @var{fcn}, @code{iterations}
containing the number of iteration steps, @code{algorithm} with the name of
the search algorithm (always:
@nospell{@qcode{"Nelder-Mead simplex direct search"}}), and @code{message}
with the exit message.

Example:

@example
fminsearch (@@(x) (x(1)-5).^2+(x(2)-8).^4, [0;0])
@end example

Application Notes:
@enumerate
@item
If you need to find the minimum of a single variable function it is
probably better to use @code{fminbnd}.

@item
The legacy, undocumented syntax for passing parameters to @var{fcn} by
appending them to the input argument list after @var{options} has been
removed in Octave 10.  The cross-platform compatible method of passing
parameters to @var{fcn} is through the use of @ref{Anonymous Functions}.  For
specific examples of doing so for @code{fminsearch} and other minimization
functions see the @ref{Minimizers} section of the GNU Octave manual.
@end enumerate
@seealso{fminbnd, fminunc, optimset}
@end deftypefn
