# odeplot

```octave
function stop_solve = odeplot (t, y, flag)
```

@deftypefn {} {@var{stop_solve} =} odeplot (@var{t}, @var{y}, @var{flag})

Open a new figure window and plot the solution of an ode problem at each
time step during the integration.

The types and values of the input parameters @var{t} and @var{y} depend on
the input @var{flag} that is of type string.  Valid values of @var{flag}
are:

@table @option
@item @qcode{"init"}
The input @var{t} must be a column vector of length 2 with the first and
last time step (@code{[@var{tfirst} @var{tlast}]}.  The input @var{y}
contains the initial conditions for the ode problem (@var{y0}).

@item @qcode{""}
The input @var{t} must be a scalar double or vector specifying the time(s)
for which the solution in input @var{y} was calculated.

@item @qcode{"done"}
The inputs should be empty, but are ignored if they are present.
@end table

@code{odeplot} always returns false, i.e., don't stop the ode solver.

Example: solve an anonymous implementation of the
@nospell{@qcode{"Van der Pol"}} equation and display the results while
solving.

@example
@group
fvdp = @@(t,y) [y(2); (1 - y(1)^2) * y(2) - y(1)];

opt = odeset ("OutputFcn", @@odeplot, "RelTol", 1e-6);
sol = ode45 (fvdp, [0 20], [2 0], opt);
@end group
@end example

Background Information:
This function is called by an ode solver function if it was specified in
the @qcode{"OutputFcn"} property of an options structure created with
@code{odeset}.  The ode solver will initially call the function with the
syntax @code{odeplot ([@var{tfirst}, @var{tlast}], @var{y0}, "init")}.  The
function initializes internal variables, creates a new figure window, and
sets the x limits of the plot.  Subsequently, at each time step during the
integration the ode solver calls @code{odeplot (@var{t}, @var{y}, [])}.
At the end of the solution the ode solver calls
@code{odeplot ([], [], "done")} so that odeplot can perform any clean-up
actions required.
@seealso{odeset, odeget, ode23, ode45}
@end deftypefn
