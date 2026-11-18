# interpn

```octave
function vi = interpn (varargin)
```

@deftypefn  {} {@var{vi} =} interpn (@var{x1}, @var{x2}, @dots{}, @var{v}, @var{y1}, @var{y2}, @dots{})
@deftypefnx {} {@var{vi} =} interpn (@var{v}, @var{y1}, @var{y2}, @dots{})
@deftypefnx {} {@var{vi} =} interpn (@var{v}, @var{m})
@deftypefnx {} {@var{vi} =} interpn (@var{v})
@deftypefnx {} {@var{vi} =} interpn (@dots{}, @var{method})
@deftypefnx {} {@var{vi} =} interpn (@dots{}, @var{method}, @var{extrapval})

Perform @var{n}-dimensional interpolation, where @var{n} is at least two.

Each element of the @var{n}-dimensional numeric array @var{v} represents a
value at a location given by the parameters @var{x1}, @var{x2}, @dots{},
@var{xn}.  The parameters @var{x1}, @var{x2}, @dots{}, @var{xn} are either
@var{n}-dimensional arrays of the same size as the array @var{v} in
the @qcode{"ndgrid"} format or vectors.

The parameters @var{y1}, @var{y2}, @dots{}, @var{yn} represent the points at
which the array @var{vi} is interpolated.  They can be vectors of the same
length and orientation in which case they are interpreted as coordinates of
scattered points.  If they are vectors of differing orientation or length,
they are used to form a grid in @qcode{"ndgrid"} format.  They can also be
@var{n}-dimensional arrays of equal size.

If @var{x1}, @dots{}, @var{xn} are omitted, they are assumed to be
@code{x1 = 1 : size (@var{v}, 1)}, etc.  If @var{m} is specified, then
the interpolation adds a point half way between each of the interpolation
points.  This process is performed @var{m} times.  If only @var{v} is
specified, then @var{m} is assumed to be @code{1}.

The interpolation @var{method} is one of:

@table @asis
@item @qcode{"nearest"}
Return the nearest neighbor.

@item @qcode{"linear"} (default)
Linear interpolation from nearest neighbors.

@item @qcode{"pchip"}
Piecewise cubic Hermite interpolating polynomial---shape-preserving
interpolation with smooth first derivative (not implemented yet).

@item @qcode{"cubic"}
Cubic interpolation (same as @qcode{"pchip"} [not implemented yet]).

@item @qcode{"spline"}
Cubic spline interpolation---smooth first and second derivatives
throughout the curve.
@end table

The default method is @qcode{"linear"}.

@var{extrapval} is a scalar number.  It replaces values beyond the endpoints
with @var{extrapval}.  Note that if @var{extrapval} is used, @var{method}
must be specified as well.  If @var{extrapval} is omitted and the
@var{method} is @qcode{"spline"}, then the extrapolated values of the
@qcode{"spline"} are used.  Otherwise the default @var{extrapval} value for
any other @var{method} is @code{NA}.
@seealso{interp1, interp2, interp3, spline, ndgrid}
@end deftypefn
