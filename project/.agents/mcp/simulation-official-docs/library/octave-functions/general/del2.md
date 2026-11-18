# del2

```octave
function L = del2 (M, varargin)
```

@deftypefn  {} {@var{L} =} del2 (@var{M})
@deftypefnx {} {@var{L} =} del2 (@var{M}, @var{h})
@deftypefnx {} {@var{L} =} del2 (@var{M}, @var{dx}, @var{dy}, @dots{})

Calculate the discrete Laplace
@tex
operator $( \nabla^2 )$.
@end tex
@ifnottex
operator.
@end ifnottex

For a 2-dimensional matrix @math{M(x, y)} this is defined as
@tex
$$L = {1 \over 4} \left( \frac{\partial^2 M}{\partial{x}^2} + \frac{\partial^2 M}{\partial{y}^2} \right)$$
@end tex
@ifnottex

@example
@group
      1    / d^2            d^2         \
L  = --- * | ---  M(x,y) +  ---  M(x,y) |
      4    \ dx^2           dy^2        /
@end group
@end example

@end ifnottex
For N-dimensional arrays the sum in parentheses is expanded to include
second derivatives over the additional higher dimensions.

The spacing between evaluation points may be defined by @var{h}, which is a
scalar defining the equidistant spacing in all dimensions.  Alternatively,
the spacing in each dimension may be defined separately by @var{dx},
@var{dy}, etc.  A scalar spacing argument defines equidistant spacing,
whereas a vector argument can be used to specify variable spacing.  The
length of the spacing vectors must match the respective dimension of
@var{M}.  The default spacing value is 1.

Dimensions with fewer than 3 data points are skipped.  Boundary points are
calculated from the linear extrapolation of interior points.

Example: Second derivative of 2*x^3

@example
@group
f = @@(x) 2*x.^3;
dd = @@(x) 12*x;
x = 1:6;
L = 4*del2 (f(x));
assert (L, dd (x));
@end group
@end example

@seealso{gradient, diff}
@end deftypefn
