# splinefit

```octave
function pp = splinefit (x, y, breaks, varargin)
```

@deftypefn  {} {@var{pp} =} splinefit (@var{x}, @var{y}, @var{breaks})
@deftypefnx {} {@var{pp} =} splinefit (@var{x}, @var{y}, @var{p})
@deftypefnx {} {@var{pp} =} splinefit (@dots{}, "periodic", @var{periodic})
@deftypefnx {} {@var{pp} =} splinefit (@dots{}, "robust", @var{robust})
@deftypefnx {} {@var{pp} =} splinefit (@dots{}, "beta", @var{beta})
@deftypefnx {} {@var{pp} =} splinefit (@dots{}, "order", @var{order})
@deftypefnx {} {@var{pp} =} splinefit (@dots{}, "constraints", @var{constraints})

Fit a piecewise cubic spline with breaks (knots) @var{breaks} to the
noisy data, @var{x} and @var{y}.

@var{x} is a vector, and @var{y} is a vector or N-D array.  If @var{y} is an
N-D array, then @var{x}(j) is matched to @var{y}(:,@dots{},:,j).

@var{p} is a positive integer defining the number of intervals along
@var{x}, and @var{p}+1 is the number of breaks.  The number of points in
each interval differ by no more than 1.

The optional property @var{periodic} is a logical value which specifies
whether a periodic boundary condition is applied to the spline.  The
length of the period is @code{max (@var{breaks}) - min (@var{breaks})}.
The default value is @code{false}.

The optional property @var{robust} is a logical value which specifies
if robust fitting is to be applied to reduce the influence of outlying
data points.  Three iterations of weighted least squares are performed.
Weights are computed from previous residuals.  The sensitivity of outlier
identification is controlled by the property @var{beta}.  The value of
@var{beta} is restricted to the range, 0 < @var{beta} < 1.  The default
value is @var{beta} = 1/2.  Values close to 0 give all data equal
weighting.  Increasing values of @var{beta} reduce the influence of
outlying data.  Values close to unity may cause instability or rank
deficiency.

The fitted spline is returned as a piecewise polynomial, @var{pp}, and
may be evaluated using @code{ppval}.

The splines are constructed of polynomials with degree @var{order}.
The default is a cubic, @var{order}=3.  A spline with P pieces has
P+@var{order} degrees of freedom.  With periodic boundary conditions
the degrees of freedom are reduced to P.

The optional property, @var{constraints}, is a structure specifying linear
constraints on the fit.  The structure has three fields, @qcode{"xc"},
@qcode{"yc"}, and @qcode{"cc"}.

@table @asis
@item @qcode{"xc"}
Vector of the x-locations of the constraints.

@item @qcode{"yc"}
Constraining values at the locations @var{xc}.
The default is an array of zeros.

@item @qcode{"cc"}
Coefficients (matrix).  The default is an array of ones.  The number of
rows is limited to the order of the piecewise polynomials, @var{order}.
@end table

Constraints are linear combinations of derivatives of order 0 to
@var{order}-1 according to

@example
@group
@tex
$cc(1,j) \cdot y(xc(j)) + cc(2,j) \cdot y\prime(xc(j)) + ... = yc(:,\dots,:,j)$.
@end tex
@ifnottex
cc(1,j) * y(xc(j)) + cc(2,j) * y'(xc(j)) + ... = yc(:,...,:,j).
@end ifnottex
@end group
@end example

@seealso{interp1, unmkpp, ppval, spline, pchip, ppder, ppint, ppjumps}
@end deftypefn
