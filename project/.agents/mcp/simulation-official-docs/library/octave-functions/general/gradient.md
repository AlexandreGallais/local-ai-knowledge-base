# gradient

```octave
function varargout = gradient (m, varargin)
```

@deftypefn  {} {@var{dx} =} gradient (@var{m})
@deftypefnx {} {[@var{dx}, @var{dy}, @var{dz}, @dots{}] =} gradient (@var{m})
@deftypefnx {} {[@dots{}] =} gradient (@var{m}, @var{s})
@deftypefnx {} {[@dots{}] =} gradient (@var{m}, @var{sx}, @var{sy}, @var{sz}, @dots{})
@deftypefnx {} {[@dots{}] =} gradient (@var{f}, @var{x0})
@deftypefnx {} {[@dots{}] =} gradient (@var{f}, @var{x0}, @var{s})
@deftypefnx {} {[@dots{}] =} gradient (@var{f}, @var{x0}, @var{sx}, @var{sy}, @dots{})

Calculate the gradient of sampled data or a function.
@tex
$$
{\rm grad} \ F(x,y,z) \equiv \nabla F = \frac{\partial F_x}{\partial x} \hat{i} + \frac{\partial F_y}{\partial y} \hat{j} + \frac{\partial F_z}{\partial z} \hat{k}
$$
@end tex
@ifnottex

@group
@verbatim
                  d                d                 d
grad F(x,y,z)  =  -- F(x,y,z) i  + -- F(x,y,z) j  +  -- F(x,y,z) k
                  dx               dy                dz
@end verbatim
@end group

@end ifnottex

If @var{m} is a vector, calculate the one-dimensional numerical gradient of
@var{m}.  If @var{m} is a matrix the gradient is calculated for each
dimension.  The return argument(s) are the estimated partial derivatives
for each dimension at the specified sample points.

The default spacing of between data points is 1.  A constant spacing between
points can be specified with the @var{s} parameter.  If @var{s} is a scalar,
the single spacing value is used for all dimensions.  Otherwise, separate
values of the spacing can be supplied by the @var{sx}, @dots{} arguments.
Scalar values specify an equidistant spacing.  Vector values for the
@var{sx}, @dots{} arguments specify the coordinate for that dimension.  The
length must match the respective dimension of @var{m}.

If the first argument @var{f} is a function handle, the gradient of the
function is calculated for the points in @var{x0}.  As with sampled data,
the spacing values between the points from which the gradient is estimated
can be set via the @var{s} or @var{dx}, @var{dy}, @dots{} arguments.  By
default a spacing of 1 is used, however this is normally overly large unless
the function is very slowly varying, and it is often necessary to specify a
smaller sample spacing.

Example: numerical gradient of @code{cos} (analytically = @code{-sin})

@example
@group
gradient (@@cos, pi/2, .1)
@xresult{} -0.9983
-sin (pi/2)
@xresult{} -1
@end group
@end example

Programming Notes:
The value for interior data points is approximated using the central
difference.

@example
y'(i) = 1/2 * (y(i+1) - y(i-1)).
@end example

At boundary points a linear extrapolation is applied.

@example
y'(1) = y(2) - y(1).
@end example

@seealso{diff, del2}
@end deftypefn
