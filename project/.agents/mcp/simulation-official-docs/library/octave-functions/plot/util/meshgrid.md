# meshgrid

```octave
function [xx, yy, zz] = meshgrid (x, y, z)
```

@deftypefn  {} {[@var{xx}, @var{yy}] =} meshgrid (@var{x}, @var{y})
@deftypefnx {} {[@var{xx}, @var{yy}, @var{zz}] =} meshgrid (@var{x}, @var{y}, @var{z})
@deftypefnx {} {[@var{xx}, @var{yy}] =} meshgrid (@var{x})
@deftypefnx {} {[@var{xx}, @var{yy}, @var{zz}] =} meshgrid (@var{x})
Given vectors of @var{x} and @var{y} coordinates, return matrices @var{xx}
and @var{yy} corresponding to a full 2-D grid.

The rows of @var{xx} are copies of @var{x}, and the columns of @var{yy} are
copies of @var{y}.  If @var{y} is omitted, then it is assumed to be the same
as @var{x}.

If the optional @var{z} input is given, or @var{zz} is requested, then the
output will be a full 3-D grid.  If @var{z} is omitted and @var{zz} is
requested, it is assumed to be the same as @var{y}.

@code{meshgrid} is most frequently used to produce input for a 2-D or 3-D
function that will be plotted.  The following example creates a surface
plot of the ``sombrero'' function.

@example
@group
f = @@(x,y) sin (sqrt (x.^2 + y.^2)) ./ sqrt (x.^2 + y.^2);
range = linspace (-8, 8, 41);
[@var{X}, @var{Y}] = meshgrid (range, range);
Z = f (X, Y);
surf (X, Y, Z);
@end group
@end example

Programming Note: @code{meshgrid} is restricted to 2-D or 3-D grid
generation.  The @code{ndgrid} function will generate 1-D through N-D
grids.  However, the functions are not completely equivalent.  If @var{x}
is a vector of length M and @var{y} is a vector of length N, then
@code{meshgrid} will produce an output grid which is NxM@.  @code{ndgrid}
will produce an output which is @nospell{MxN} (transpose) for the same
input.  Some core functions expect @code{meshgrid} input and others expect
@code{ndgrid} input.  Check the documentation for the function in question
to determine the proper input format.
@seealso{ndgrid, mesh, contour, surf}
@end deftypefn
