# odeget

```octave
function val = odeget (ode_opt, field, default = [])
```

@deftypefn  {} {@var{val} =} odeget (@var{ode_opt}, @var{field})
@deftypefnx {} {@var{val} =} odeget (@var{ode_opt}, @var{field}, @var{default})

Query the value of the property @var{field} in the ODE options structure
@var{ode_opt}.

If called with two input arguments and the first input argument
@var{ode_opt} is an ODE option structure and the second input argument
@var{field} is a string specifying an option name, then return the option
value @var{val} corresponding to @var{field} from @var{ode_opt}.

If called with an optional third input argument, and @var{field} is
not set in the structure @var{ode_opt}, then return the default value
@var{default} instead.
@seealso{odeset}
@end deftypefn
