# odeset

```octave
function odestruct = odeset (varargin)
```

@deftypefn  {} {@var{odestruct} =} odeset ()
@deftypefnx {} {@var{odestruct} =} odeset (@var{"field1"}, @var{value1}, @var{"field2"}, @var{value2}, @dots{})
@deftypefnx {} {@var{odestruct} =} odeset (@var{oldstruct}, @var{"field1"}, @var{value1}, @var{"field2"}, @var{value2}, @dots{})
@deftypefnx {} {@var{odestruct} =} odeset (@var{oldstruct}, @var{newstruct})
@deftypefnx {} {} odeset ()

Create or modify an ODE options structure.

When called with no input argument and one output argument, return a new ODE
options structure that contains all possible fields initialized to their
default values.  If no output argument is requested, display a list of
the common ODE solver options along with their default value.

If called with name-value input argument pairs @var{"field1"},
@var{"value1"}, @var{"field2"}, @var{"value2"}, @dots{} return a new
ODE options structure with all the most common option fields
initialized, @strong{and} set the values of the fields @var{"field1"},
@var{"field2"}, @dots{} to the values @var{value1}, @var{value2},
@enddots{}

If called with an input structure @var{oldstruct} then overwrite the
values of the options @var{"field1"}, @var{"field2"}, @dots{} with
new values @var{value1}, @var{value2}, @dots{} and return the
modified structure.

When called with two input ODE options structures @var{oldstruct} and
@var{newstruct} overwrite all values from the structure
@var{oldstruct} with new values from the structure @var{newstruct}.
Empty values in @var{newstruct} will not overwrite values in
@var{oldstruct}.

The most commonly used ODE options, which are always assigned a value
by @code{odeset}, are the following:

@table @asis
@item @code{AbsTol}: positive scalar | vector, def. @code{1e-6}
Absolute error tolerance.

@item @code{BDF}: @{@qcode{"off"}@} | @qcode{"on"}
Use BDF formulas in implicit multistep methods.
@emph{Note}: This option is not yet implemented.

@item @code{Events}: function_handle
Event function.  An event function must have the form
@code{[value, isterminal, direction] = my_events_f (t, y)}

@item @code{InitialSlope}: vector
Consistent initial slope vector for DAE solvers.

@item @code{InitialStep}: positive scalar
Initial time step size.

@item @code{Jacobian}: matrix | function_handle
Jacobian matrix, specified as a constant matrix or a function of
time and state.

@item @code{JConstant}: @{@qcode{"off"}@} | @qcode{"on"}
Specify whether the Jacobian is a constant matrix or depends on the
state.

@item @code{JPattern}: sparse matrix
If the Jacobian matrix is sparse and non-constant but maintains a
constant sparsity pattern, specify the sparsity pattern.

@item @code{Mass}: matrix | function_handle
Mass matrix, specified as a constant matrix or a function of
time and state.

@item @code{MassSingular}: @{@qcode{"maybe"}@} | @qcode{"yes"} | @qcode{"on"}
Specify whether the mass matrix is singular.

@item @code{MaxOrder}: @{@qcode{5}@} | @qcode{4} | @qcode{3} | @qcode{2} | @qcode{1}
Maximum order of formula.

@item @code{MaxStep}: positive scalar
Maximum time step value.

@item @code{MStateDependence}: @{@qcode{"weak"}@} | @qcode{"none"} | @qcode{"strong"}
Specify whether the mass matrix depends on the state or only on time.

@item @code{MvPattern}: sparse matrix
If the mass matrix is sparse and non-constant but maintains a
constant sparsity pattern, specify the sparsity pattern.
@emph{Note}: This option is not yet implemented.

@item @code{NonNegative}: scalar | vector
Specify elements of the state vector that are expected to remain
non-negative during the simulation.

@item @code{NormControl}: @{@qcode{"off"}@} | @qcode{"on"}
Control error relative to the 2-norm of the solution, rather than its
absolute value.

@item @code{OutputFcn}: function_handle
Function to monitor the state during the simulation.  For the form of
the function to use @pxref{XREFodeplot,,@code{odeplot}}.

@item @code{OutputSel}: scalar | vector
Indices of elements of the state vector to be passed to the output
monitoring function.

@item @code{Refine}: positive scalar
Specify whether output should be returned only at the end of each
time step or also at intermediate time instances.  The value should be
a scalar indicating the number of equally spaced time points to use
within each timestep at which to return output.

@item @code{RelTol}: positive scalar
Relative error tolerance.

@item @code{Stats}: @{@qcode{"off"}@} | @qcode{"on"}
Print solver statistics after simulation.

@item @code{Vectorized}: @{@qcode{"off"}@} | @qcode{"on"}
Specify whether @code{odefcn} can be passed multiple values of the
state at once.

@end table

Field names that are not in the above list are also accepted and
added to the result structure.

@seealso{odeget}
@end deftypefn
