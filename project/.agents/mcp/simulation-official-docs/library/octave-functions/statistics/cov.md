# cov

```octave
function c = cov (x, varargin)
```

@deftypefn  {} {@var{c} =} cov (@var{x})
@deftypefnx {} {@var{c} =} cov (@var{x}, @var{y})
@deftypefnx {} {@var{c} =} cov (@dots{}, @var{opt})
@deftypefnx {} {@var{c} =} cov (@dots{}, @var{nanflag})
Compute the covariance matrix.

The covariance between two variable vectors @var{A} and  @var{B} is
calculated as:
@tex
$$
\sigma_{ij} = {1 \over N-1} \sum_{i=1}^N (a_i - \bar{a})(b_i - \bar{b})
$$
where $\bar{a}$ and $\bar{b}$ are the mean values of $a$ and $b$ and $N$ is
the length of the vectors $a$ and $b$.
@end tex
@ifnottex

@example
cov (@var{a},@var{b}) = 1/(N-1) * SUM_i (@var{a}(i) - mean (@var{a})) * (@var{b}(i) - mean (@var{b}))
@end example

@noindent
where @math{N} is the length of the vectors @var{a} and @var{b}.
@end ifnottex

If called with one argument, compute @code{cov (@var{x}, @var{x})}.  If
@var{x} is a vector, this is the scalar variance of @var{x}.  If @var{x} is
a matrix, each row of @var{x} is treated as an observation, and each column
as a variable, and the @w{(@var{i}, @var{j})-th}@ entry of
@code{cov (@var{x})} is the covariance between the @var{i}-th and
@var{j}-th columns in @var{x}.  If @var{x} has dimensions n x m, the output
@var{c} will be a m x m square covariance matrix.

If called with two arguments, compute @code{cov (@var{x}, @var{y})}, the
covariance between two random variables @var{x} and @var{y}.  @var{x} and
@var{y} must have the same number of elements, and will be treated as
vectors with the covariance computed as
@code{cov (@var{x}(:), @var{y}(:))}.  The output will be a 2 x 2
covariance matrix.

The optional argument @var{opt} determines the type of normalization to
use.  Valid values are

@table @asis
@item 0 [default]:
  Normalize with @math{N-1}.  This provides the best unbiased estimator of
the covariance.

@item 1:
  Normalize with @math{N}.  This provides the second moment around the
mean.  @var{opt} is set to 1 for N = 1.
@end table

The optional argument @var{nanflag} must appear last in the argument list
and controls how NaN values are handled by @code{cov}.  The three valid
values are:

@table @asis
@item includenan [default]:
  Leave NaN values in @var{x} and @var{y}.  Output will follow the normal
rules for handling NaN values in arithmetic operations.

@item omitrows:
  Rows containing NaN values are trimmed from both @var{x} and @var{y}
prior to calculating the covariance.  A NaN in one variable will remove
that row from both @var{x} and @var{y}.

@item partialrows:
  Rows containing NaN values are ignored from both @var{x} and @var{y}
  independently for each @var{i}-th and @var{j}-th covariance
  calculation.  This may result in a different number of observations,
  @math{N}, being used to calculated each element of the covariance matrix.
@end table

Compatibility Note: Before Octave v9.1.0, @code{cov} treated rows
@var{x} and @var{y} as multivariate random variables.  Newer versions
attempt to maintain full compatibility with @sc{matlab} by treating
@var{x} and @var{y} as two univariate distributions regardless of shape,
resulting in a 2x2 output matrix.  Code relying on Octave's previous
definition will need to be modified when running this newer version of
@code{cov}.  The previous behavior can be obtained by using the
NaN package's @code{covm} function as @code{covm (@var{x}, @var{y}, "D")}.
@seealso{corr}
@end deftypefn
