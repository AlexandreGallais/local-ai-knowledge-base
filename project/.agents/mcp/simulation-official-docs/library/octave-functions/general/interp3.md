# interp3

```octave
function vi = interp3 (varargin)
```

@deftypefn  {} {@var{vi} =} interp3 (@var{x}, @var{y}, @var{z}, @var{v}, @var{xi}, @var{yi}, @var{zi})
@deftypefnx {} {@var{vi} =} interp3 (@var{v}, @var{xi}, @var{yi}, @var{zi})
@deftypefnx {} {@var{vi} =} interp3 (@var{v}, @var{n})
@deftypefnx {} {@var{vi} =} interp3 (@var{v})
@deftypefnx {} {@var{vi} =} interp3 (@dots{}, @var{method})
@deftypefnx {} {@var{vi} =} interp3 (@dots{}, @var{method}, @var{extrapval})

Three-dimensional interpolation.

Interpolate numeric reference data @var{x}, @var{y}, @var{z}, @var{v} to
determine @var{vi} at the coordinates @var{xi}, @var{yi}, @var{zi}.  The
reference data @var{x}, @var{y}, @var{z} can be matrices, as returned by
@code{meshgrid}, in which case the sizes of @var{x}, @var{y}, @var{z}, and
@var{v} must be equal.  If @var{x}, @var{y}, @var{z} are vectors describing
a cubic grid then @code{length (@var{x}) == columns (@var{v})},
@code{length (@var{y}) == rows (@var{v})}, and
@code{length (@var{z}) == size (@var{v}, 3)}.  In either case the input
data must be strictly monotonic.

If called without @var{x}, @var{y}, @var{z}, and just a single reference
data matrix @var{v}, the 3-D region
@code{@var{x} = 1:columns (@var{v}), @var{y} = 1:rows (@var{v}),
@var{z} = 1:size (@var{v}, 3)} is assumed.
This saves memory if the grid is regular and the distance between points is
not important.

If called with a single reference data matrix @var{v} and a refinement
value @var{n}, then perform interpolation over a 3-D grid where each
original interval has been recursively subdivided @var{n} times.  This
results in @code{2^@var{n}-1} additional points for every interval in the
original grid.  If @var{n} is omitted a value of 1 is used.  As an
example, the interval [0,1] with @code{@var{n}==2} results in a refined
interval with points at [0, 1/4, 1/2, 3/4, 1].

The interpolation @var{method} is one of:

@table @asis
@item @qcode{"nearest"}
Return the nearest neighbor.

@item @qcode{"linear"} (default)
Linear interpolation from nearest neighbors.

@item @qcode{"cubic"}
Piecewise cubic Hermite interpolating polynomial---shape-preserving
interpolation with smooth first derivative (not implemented yet).

@item @qcode{"spline"}
Cubic spline interpolation---smooth first and second derivatives
throughout the curve.
@end table

@var{extrapval} is a scalar number.  It replaces values beyond the endpoints
with @var{extrapval}.  Note that if @var{extrapval} is used, @var{method}
must be specified as well.  If @var{extrapval} is omitted and the
@var{method} is @qcode{"spline"}, then the extrapolated values of the
@qcode{"spline"} are used.  Otherwise the default @var{extrapval} value for
any other @var{method} is @qcode{"NA"}.
@seealso{interp1, interp2, interpn, meshgrid}
@end deftypefn
