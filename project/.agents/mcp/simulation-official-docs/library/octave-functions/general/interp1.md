# interp1

```octave
function yi = interp1 (x, y, varargin)
```

@deftypefn  {} {@var{yi} =} interp1 (@var{x}, @var{y}, @var{xi})
@deftypefnx {} {@var{yi} =} interp1 (@var{y}, @var{xi})
@deftypefnx {} {@var{yi} =} interp1 (@dots{}, @var{method})
@deftypefnx {} {@var{yi} =} interp1 (@dots{}, @var{extrap})
@deftypefnx {} {@var{yi} =} interp1 (@dots{}, "left")
@deftypefnx {} {@var{yi} =} interp1 (@dots{}, "right")
@deftypefnx {} {@var{pp} =} interp1 (@dots{}, "pp")

One-dimensional interpolation.

Interpolate input data to determine the value of @var{yi} at the points
@var{xi}.  If not specified, @var{x} is taken to be the indices of @var{y}
(@code{1:length (@var{y})}).  If @var{y} is a matrix or an N-dimensional
array, the interpolation is performed on each column of @var{y}.

The interpolation @var{method} is one of:

@table @asis
@item @qcode{"nearest"}
Return the nearest neighbor.

@item @qcode{"previous"}
Return the previous neighbor.

@item @qcode{"next"}
Return the next neighbor.

@item @qcode{"linear"} (default)
Linear interpolation from nearest neighbors.

@item @qcode{"pchip"}
Piecewise cubic Hermite interpolating polynomial---shape-preserving
interpolation with smooth first derivative.

@item @qcode{"cubic"}
Cubic interpolation (same as @qcode{"pchip"}).

@item @qcode{"spline"}
Cubic spline interpolation---smooth first and second derivatives
throughout the curve.
@end table

Adding '*' to the start of any method above forces @code{interp1}
to assume that @var{x} is uniformly spaced, and only @code{@var{x}(1)}
and @code{@var{x}(2)} are referenced.  This is usually faster,
and is never slower.  The default method is @qcode{"linear"}.

If @var{extrap} is the string @qcode{"extrap"}, then extrapolate values
beyond the endpoints using the current @var{method}.  If @var{extrap} is a
number, then replace values beyond the endpoints with that number.  When
unspecified, @var{extrap} defaults to @code{NA}.

If the string argument @qcode{"pp"} is specified, then @var{xi} should not
be supplied and @code{interp1} returns a piecewise polynomial object.  This
object can later be used with @code{ppval} to evaluate the interpolation.
There is an equivalence, such that @code{ppval (interp1 (@var{x},
@var{y}, @var{method}, @qcode{"pp"}), @var{xi}) == interp1 (@var{x},
@var{y}, @var{xi}, @var{method}, @qcode{"extrap"})}.

Duplicate points in @var{x} specify a discontinuous interpolant.  There
may be at most 2 consecutive points with the same value.
If @var{x} is increasing, the default discontinuous interpolant is
right-continuous.  If @var{x} is decreasing, the default discontinuous
interpolant is left-continuous.
The continuity condition of the interpolant may be specified by using
the options @qcode{"left"} or @qcode{"right"} to select a left-continuous
or right-continuous interpolant, respectively.
Discontinuous interpolation is only allowed for @qcode{"nearest"} and
@qcode{"linear"} methods; in all other cases, the @var{x}-values must be
unique.

An example of the use of @code{interp1} is

@example
@group
xf = [0:0.05:10];
yf = sin (2*pi*xf/5);
xp = [0:10];
yp = sin (2*pi*xp/5);
lin = interp1 (xp, yp, xf);
near = interp1 (xp, yp, xf, "nearest");
pch = interp1 (xp, yp, xf, "pchip");
spl = interp1 (xp, yp, xf, "spline");
plot (xf,yf,"r", xf,near,"g", xf,lin,"b", xf,pch,"c", xf,spl,"m",
      xp,yp,"r*");
legend ("original", "nearest", "linear", "pchip", "spline");
@end group
@end example

@seealso{pchip, spline, interpft, interp2, interp3, interpn}
@end deftypefn
