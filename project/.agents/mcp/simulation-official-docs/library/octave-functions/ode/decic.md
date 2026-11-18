# decic

```octave
function [y0_new, yp0_new, resnorm] = decic (fcn, t0,
```

@deftypefn  {} {[@var{y0_new}, @var{yp0_new}] =} decic (@var{fcn}, @var{t0}, @var{y0}, @var{fixed_y0}, @var{yp0}, @var{fixed_yp0})
@deftypefnx {} {[@var{y0_new}, @var{yp0_new}] =} decic (@var{fcn}, @var{t0}, @var{y0}, @var{fixed_y0}, @var{yp0}, @var{fixed_yp0}, @var{options})
@deftypefnx {} {[@var{y0_new}, @var{yp0_new}, @var{resnorm}] =} decic (@dots{})

Compute consistent implicit ODE initial conditions @var{y0_new} and
@var{yp0_new} given initial guesses @var{y0} and @var{yp0}.

A maximum of @code{length (@var{y0})} components between @var{fixed_y0} and
@var{fixed_yp0} may be chosen as fixed values.

@var{fcn} is a function handle.  The function must accept three inputs where
the first is time @var{t}, the second is a column vector of unknowns
@var{y}, and the third is a column vector of unknowns @var{yp}.

@var{t0} is the initial time such that
@code{@var{fcn}(@var{t0}, @var{y0_new}, @var{yp0_new}) = 0}, specified as a
scalar.

@var{y0} is a vector used as the initial guess for @var{y}.

@var{fixed_y0} is a vector which specifies the components of @var{y0} to
hold fixed.  Choose a maximum of @code{length (@var{y0})} components between
@var{fixed_y0} and @var{fixed_yp0} as fixed values.
Set @var{fixed_y0}(i) component to 1 if you want to fix the value of
@var{y0}(i).
Set @var{fixed_y0}(i) component to 0 if you want to allow the value of
@var{y0}(i) to change.

@var{yp0} is a vector used as the initial guess for @var{yp}.

@var{fixed_yp0} is a vector which specifies the components of @var{yp0} to
hold fixed.  Choose a maximum of @code{length (@var{yp0})} components
between @var{fixed_y0} and @var{fixed_yp0} as fixed values.
Set @var{fixed_yp0}(i) component to 1 if you want to fix the value of
@var{yp0}(i).
Set @var{fixed_yp0}(i) component to 0 if you want to allow the value of
@var{yp0}(i) to change.

The optional seventh argument @var{options} is a structure array.  Use
@code{odeset} to generate this structure.  The relevant options are
@code{RelTol} and @code{AbsTol} which specify the error thresholds used to
compute the initial conditions.

The function typically returns two outputs.  Variable @var{y0_new} is a
column vector and contains the consistent initial value of @var{y}.  The
output @var{yp0_new} is a column vector and contains the consistent initial
value of @var{yp}.

The optional third output @var{resnorm} is the norm of the vector of
residuals.  If @var{resnorm} is small, @code{decic} has successfully
computed the initial conditions.  If the value of @var{resnorm} is large,
use @code{RelTol} and @code{AbsTol} to adjust it.

Example: Compute initial conditions for @nospell{Robertson's} equations:

@smallexample
@group
function r = robertson_dae (@var{t}, @var{y}, @var{yp})
  r = [ -(@var{yp}(1) + 0.04*@var{y}(1) - 1e4*@var{y}(2)*@var{y}(3))
        -(@var{yp}(2) - 0.04*@var{y}(1) + 1e4*@var{y}(2)*@var{y}(3) + 3e7*@var{y}(2)^2)
       @var{y}(1) + @var{y}(2) + @var{y}(3) - 1 ];
endfunction
@end group
[@var{y0_new},@var{yp0_new}] = decic (@@robertson_dae, 0, [1; 0; 0], [1; 1; 0],
[-1e-4; 1; 0], [0; 0; 0]);
@end smallexample
@seealso{ode15i, odeset}
@end deftypefn
