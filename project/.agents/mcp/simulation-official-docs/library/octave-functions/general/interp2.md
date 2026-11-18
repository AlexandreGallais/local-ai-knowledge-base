# interp2

```octave
function ZI = interp2 (varargin)
```

@deftypefn  {} {@var{zi} =} interp2 (@var{x}, @var{y}, @var{z}, @var{xi}, @var{yi})
@deftypefnx {} {@var{zi} =} interp2 (@var{z}, @var{xi}, @var{yi})
@deftypefnx {} {@var{zi} =} interp2 (@var{z}, @var{n})
@deftypefnx {} {@var{zi} =} interp2 (@var{z})
@deftypefnx {} {@var{zi} =} interp2 (@dots{}, @var{method})
@deftypefnx {} {@var{zi} =} interp2 (@dots{}, @var{method}, @var{extrap})

Two-dimensional interpolation.

Interpolate numeric reference data @var{x}, @var{y}, @var{z} to determine
@var{zi} at the coordinates @var{xi}, @var{yi}.  The reference data
@var{x}, @var{y} can be matrices, as returned by @code{meshgrid}, in which
case the sizes of @var{x}, @var{y}, and @var{z} must be equal.  If @var{x},
@var{y} are vectors describing a grid then
@w{@code{length (@var{x}) == columns (@var{z})}}@ and
@w{@code{length (@var{y}) == rows (@var{z})}}.  In either case the input
data must be strictly monotonic.

If called without @var{x}, @var{y}, and just a single reference data matrix
@var{z}, the 2-D region
@code{@var{x} = 1:columns (@var{z}), @var{y} = 1:rows (@var{z})} is assumed.
This saves memory if the grid is regular and the distance between points is
not important.

If called with a single reference data matrix @var{z} and a refinement
value @var{n}, then perform interpolation over a grid where each original
interval has been recursively subdivided @var{n} times.  This results in
@code{2^@var{n}-1} additional points for every interval in the original
grid.  If @var{n} is omitted a value of 1 is used.  As an example, the
interval [0,1] with @code{@var{n}==2} results in a refined interval with
points at [0, 1/4, 1/2, 3/4, 1].

The interpolation @var{method} is one of:

@table @asis
@item @qcode{"nearest"}
Return the nearest neighbor.

@item @qcode{"linear"} (default)
Linear interpolation from nearest neighbors.

@item @qcode{"pchip"}
Piecewise cubic Hermite interpolating polynomial---shape-preserving
interpolation with smooth first derivative.

@item @qcode{"cubic"}
Cubic interpolation using a convolution kernel function---third order
method with smooth first derivative.

@item @qcode{"spline"}
Cubic spline interpolation---smooth first and second derivatives
throughout the curve.
@end table

@var{extrap} is a scalar number.  It replaces values beyond the endpoints
with @var{extrap}.  Note that if @var{extrap} is used, @var{method} must
be specified as well.  If @var{extrap} is omitted and the @var{method} is
@qcode{"spline"}, then the extrapolated values of the @qcode{"spline"} are
used.  Otherwise the default @var{extrap} value for any other @var{method}
is @qcode{"NA"}.
@seealso{interp1, interp3, interpn, meshgrid}
@end deftypefn
