# optimset

```octave
function retval = optimset (varargin)
```

@deftypefn  {} {} optimset ()
@deftypefnx {} {@var{options} =} optimset ()
@deftypefnx {} {@var{options} =} optimset (@var{par}, @var{val}, @dots{})
@deftypefnx {} {@var{options} =} optimset (@var{old}, @var{par}, @var{val}, @dots{})
@deftypefnx {} {@var{options} =} optimset (@var{old}, @var{new})
Create options structure for optimization functions.

When called without any input or output arguments, @code{optimset} prints
a list of all valid optimization parameters.

When called with one output and no inputs, return an options structure with
all valid option parameters initialized to @code{[]}.

When called with a list of parameter/value pairs, return an options
structure with only the named parameters initialized.

When the first input is an existing options structure @var{old}, the values
are updated from either the @var{par}/@var{val} list or from the options
structure @var{new}.

If @var{par} does not exactly match the name of a standard parameter,
@code{optimset} will attempt to match @var{par} to a standard parameter
and will set the value of that parameter if a match is found.  Matching is
case insensitive and is based on character matching at the start of the
parameter name.  @code{optimset} produces an error if it finds multiple
ambiguous matches.  If no standard parameter matches are found a warning is
issued and the non-standard parameter is created.

Standard list of valid parameters:

@table @asis
@item AutoScaling

@item ComplexEqn

@item Display
Request verbose display of results from optimizations.  Values are:

@table @asis
@item @qcode{"off"} [default]
No display.

@item @qcode{"iter"}
Display intermediate results for every loop iteration.

@item @qcode{"final"}
Display the result of the final loop iteration.

@item @qcode{"notify"}
Display the result of the final loop iteration if the function has
failed to converge.
@end table

@item FinDiffType

@item FunValCheck
When enabled, display an error if the objective function returns an invalid
value (a complex number, NaN, or Inf).  Must be set to @qcode{"on"} or
@qcode{"off"} [default].  Note: the functions @code{fzero} and
@code{fminbnd} correctly handle Inf values and only complex values or NaN
will cause an error in this case.

@item GradObj
When set to @qcode{"on"}, the function to be minimized must return a
second argument which is the gradient, or first derivative, of the
function at the point @var{x}.  If set to @qcode{"off"} [default], the
gradient is computed via finite differences.

@item Jacobian
When set to @qcode{"on"}, the function to be minimized must return a
second argument which is the Jacobian, or first derivative, of the
function at the point @var{x}.  If set to @qcode{"off"} [default], the
Jacobian is computed via finite differences.

@item MaxFunEvals
Maximum number of function evaluations before optimization stops.
Must be a positive integer.

@item MaxIter
Maximum number of algorithm iterations before optimization stops.
Must be a positive integer.

@item OutputFcn
A user-defined function executed once per algorithm iteration.

@item TolFun
Termination criterion for the function output.  If the difference in the
calculated objective function between one algorithm iteration and the next
is less than @code{TolFun} the optimization stops.  Must be a positive
scalar.

@item TolX
Termination criterion for the function input.  If the difference in @var{x},
the current search point, between one algorithm iteration and the next is
less than @code{TolX} the optimization stops.  Must be a positive scalar.

@item TypicalX

@item Updating
@end table

This list can be extended by the user or other loaded Octave packages.  An
updated valid parameters list can be queried using the no-argument form of
@code{optimset}.

Note 1: Only parameter names from the standard list are considered when
matching short parameter names, and @var{par} will always be expanded
to match a standard parameter even if an exact non-standard match exists.
The value of a non-standard parameter that is ambiguous with one or more
standard parameters cannot be set by @code{optimset} and can only be set
using @code{setfield} or dot notation for structs.

Note 2: The optimization options structure is primarily intended for
manipulation of known parameters by @code{optimset} and @code{optimget}.
Unpredictable behavior on future calls to @code{optimset} or
@code{optimget} can result from creating non-standard or ambiguous
parameters or from loading/unloading packages that change the known
parameter list after creation of an optimization options structure.
@seealso{optimget}
@end deftypefn
