# quantile

```octave
function q = quantile (x, p = [], dim, method = 5)
```

@deftypefn  {} {@var{q} =} quantile (@var{x})
@deftypefnx {} {@var{q} =} quantile (@var{x}, @var{p})
@deftypefnx {} {@var{q} =} quantile (@var{x}, @var{n})
@deftypefnx {} {@var{q} =} quantile (@var{x}, @dots{}, @var{dim})
@deftypefnx {} {@var{q} =} quantile (@var{x}, @dots{}, @var{vecdim})
@deftypefnx {} {@var{q} =} quantile (@var{x}, @dots{}, "all")
@deftypefnx {} {@var{q} =} quantile (@var{x}, @var{p}, @dots{}, @var{method})
@deftypefnx {} {@var{q} =} quantile (@var{x}, @var{n}, @dots{}, @var{method})
Compute the quantiles of the input data @var{x}.

If @var{x} is a vector, then @code{quantile (@var{x})} computes the quantiles
specified by @var{p} of the data in @var{x}.

If @var{x} is a matrix, then @code{quantile (@var{x})} returns a matrix such
that the i-th row of @var{q} contains the @var{p}(i)th quantiles of each
column of @var{x}.

If @var{x} is an array, then @code{quantile (@var{x})} computes the quantiles
specified by @var{p} along the first non-singleton dimension of @var{x}.

The data in @var{x} must be numeric and any NaN values are ignored.  The
size of @var{q} is equal to the size of @var{x} except for the operating
dimension, which equals to the number of quantiles specified by @var{p}
or @var{n}.

@var{p} is a numeric vector specifying the percentiles to be computed, which
correspond to the cumulative probabilities of the data .  All elements of
@var{p} must be in the range from 0 to 1.  If @var{p} is unspecified, return
the percentiles for @code{[0.00 0.25 0.50 0.75 1.00]}.  Alternatively, the
second input argument may be specified as a positive integer value @var{n},
in which case @code{quantile} returns the quantiles for @var{n} evenly
spaced cumulative probabilities computed as (1/(@var{n} + 1), 2/(@var{n}
+ 1), @dots{}, @var{n}/(@var{n} + 1)) for @code{@var{n} > 1}.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return N
copies of @var{x} along the operating dimension, where N is the number of
specified quantiles.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.  If all dimensions in
@var{vecdim} are greater than @code{ndims (@var{x})}, then @code{quantile}
will return N copies of @var{x} along the smallest dimension in
@var{vecdim}.

Specifying the dimension as @qcode{"all"} will cause @code{iqr} to operate
on all elements of @var{x}, and is equivalent to @code{iqr (@var{x}(:))}.

The fourth input argument, @var{methods}, determines the method to calculate
the quantiles specified by @var{p} or @var{n}.  The methods available to
calculate sample quantiles are the nine methods used by R
(@url{https://www.r-project.org/}) and can be specified by the corresponding
integer value.  The default value is @w{@var{method} = 5}.

Discontinuous sample quantile methods 1, 2, and 3

@enumerate 1
@item Method 1: Inverse of empirical distribution function.

@item Method 2: Similar to method 1 but with averaging at discontinuities.

@item Method 3: SAS definition: nearest even order statistic.
@end enumerate

Continuous sample quantile methods 4 through 9, where
@tex
$p(k)$
@end tex
@ifnottex
@var{p}(k)
@end ifnottex
is the linear
interpolation function respecting each method's representative cdf.

@enumerate 4
@item Method 4:
@tex
$p(k) = k / N$.
@end tex
@ifnottex
@var{p}(k) = k / N.
@end ifnottex
That is, linear interpolation of the empirical cdf, where @math{N} is the
length of @var{P}.

@item Method 5:
@tex
$p(k) = (k - 0.5) / N$.
@end tex
@ifnottex
@var{p}(k) = (k - 0.5) / N.
@end ifnottex
That is, a piecewise linear function where the knots are the values midway
through the steps of the empirical cdf.

@item Method 6:
@tex
$p(k) = k / (N + 1)$.
@end tex
@ifnottex
@var{p}(k) = k / (N + 1).
@end ifnottex

@item Method 7:
@tex
$p(k) = (k - 1) / (N - 1)$.
@end tex
@ifnottex
@var{p}(k) = (k - 1) / (N - 1).
@end ifnottex

@item Method 8:
@tex
$p(k) = (k - 1/3) / (N + 1/3)$.
@end tex
@ifnottex
@var{p}(k) = (k - 1/3) / (N + 1/3).
@end ifnottex
The resulting quantile estimates are approximately median-unbiased
regardless of the distribution of @var{x}.

@item Method 9:
@tex
$p(k) = (k - 3/8) / (N + 1/4)$.
@end tex
@ifnottex
@var{p}(k) = (k - 3/8) / (N + 1/4).
@end ifnottex
The resulting quantile estimates are approximately unbiased for the
expected order statistics if @var{x} is normally distributed.
@end enumerate

@nospell{Hyndman and Fan} (1996) recommend method 8.  Maxima, S, and R
(versions prior to 2.0.0) use 7 as their default.  Minitab and SPSS
use method 6.  @sc{matlab} uses method 5.

References:

@itemize @bullet
@item @nospell{R. A. Becker, J. M. Chambers, and A. R. Wilks},
@cite{The New S Language}, @nospell{Wadsworth & Brooks/Cole}, 1988.

@item @nospell{R. J. Hyndman, and Y. Fan}, "Sample quantiles in statistical
packages", @cite{American Statistician}, 50, @w{pp.@: 361}--365, 1996.

@item @cite{R: A Language and Environment for Statistical Computing},
@url{https://cran.r-project.org/doc/manuals/fullrefman.pdf}.
@end itemize

Examples:
@c Set example in small font to prevent overfull line

@smallexample
@group
x = randi (1000, [10, 1]);  # Create empirical data in range 1-1000
q = quantile (x, [0, 1]);   # Return minimum, maximum of distribution
q = quantile (x, [0.25 0.5 0.75]); # Return quartiles of distribution
@end group
@end smallexample
@seealso{prctile}
@end deftypefn
