# peaks

```octave
function [X_out, Y_out, Z_out] = peaks (x, y)
```

@deftypefn  {} {} peaks ()
@deftypefnx {} {} peaks (@var{n})
@deftypefnx {} {} peaks (@var{x}, @var{y})
@deftypefnx {} {@var{z} =} peaks (@dots{})
@deftypefnx {} {[@var{x}, @var{y}, @var{z}] =} peaks (@dots{})
Plot a function with lots of local maxima and minima.

The function has the form
@tex
$$f(x,y) = 3 (1 - x) ^ 2 e ^ {\left(-x^2 - (y+1)^2\right)} - 10 \left({x \over 5} - x^3 - y^5\right) - {1 \over 3} e^{\left(-(x+1)^2 - y^2\right)}$$
@end tex
@ifnottex
@verbatim
f(x,y) = 3*(1-x)^2*exp(-x^2 - (y+1)^2) ...
         - 10*(x/5 - x^3 - y^5)*exp(-x^2-y^2) ...
         - 1/3*exp(-(x+1)^2 - y^2)
@end verbatim
@end ifnottex

Called without a return argument, @code{peaks} plots the surface of the
above function using @code{surf}.

If @var{n} is a scalar, @code{peaks} plots the value of the above
function on an @var{n}-by-@var{n} mesh over the range [-3,3].  The
default value for @var{n} is 49.

If @var{n} is a vector, then it represents the grid values over which
to calculate the function.  If @var{x} and @var{y} are specified then
the function value is calculated over the specified grid of vertices.

When called with output arguments, return the data for the function
evaluated over the meshgrid.  This can subsequently be plotted with
@code{surf (@var{x}, @var{y}, @var{z})}.

@seealso{sombrero, meshgrid, mesh, surf}
@end deftypefn
