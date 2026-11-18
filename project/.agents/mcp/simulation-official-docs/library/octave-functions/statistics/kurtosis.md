# kurtosis

```octave
function y = kurtosis (x, flag, dim)
```

@deftypefn  {} {@var{y} =} kurtosis (@var{x})
@deftypefnx {} {@var{y} =} kurtosis (@var{x}, @var{flag})
@deftypefnx {} {@var{y} =} kurtosis (@var{x}, @var{flag}, @var{dim})
@deftypefnx {} {@var{y} =} kurtosis (@var{x}, @var{flag}, @var{vecdim})
@deftypefnx {} {@var{y} =} kurtosis (@var{x}, @var{flag}, "all")
Compute the sample kurtosis of the input data @var{x}.

The sample kurtosis is defined as
@tex
$$
\kappa_1 = {{{1 \over N} \sum_{i=1}^N (x_i - \bar{x})^4} \over \sigma^4},
$$
where $N$ is the length of @var{x}, $\bar{x}$ its mean, and $\sigma$ its
(uncorrected) standard deviation.
@end tex
@ifnottex

@example
@group
     mean ((@var{x} - mean (@var{x})).^4)
k1 = ------------------------
            std (@var{x}).^4
@end group
@end example

@end ifnottex

@noindent
The optional argument @var{flag} controls which normalization is used.
If @var{flag} is equal to 1 (default value, used when @var{flag} is omitted
or empty), return the sample kurtosis as defined above.  If @var{flag} is
equal to 0, return the @w{"bias-corrected"}@ kurtosis coefficient instead:
@tex
$$
\kappa_0 = 3 + {\scriptstyle N - 1 \over \scriptstyle (N - 2)(N - 3)} \,
    \left( (N + 1)\, \kappa_1 - 3 (N - 1) \right)
$$
@end tex
@ifnottex

@example
@group
              N - 1
k0 = 3 + -------------- * ((N + 1) * k1 - 3 * (N - 1))
         (N - 2)(N - 3)
@end group
@end example

@noindent
where @math{N} is the length of the @var{x} vector.

@end ifnottex
The bias-corrected kurtosis coefficient is obtained by replacing the sample
second and fourth central moments by their unbiased versions.  It is an
unbiased estimate of the population kurtosis for normal populations.

If @var{x} is a vector, then @code{kurtosis (@var{x})} computes the kurtosis
of the data in @var{x}.

If @var{x} is a matrix, then @code{kurtosis (@var{x})} returns a row vector
with each element containing the kurtosis of the data of the corresponding
column in @var{x}.

If @var{x} is an array, then @code{kurtosis (@var{x})} computes the kurtosis
of the data along the first non-singleton dimension of @var{x}.

The data in @var{x} must be numeric and any NaN values are ignored.
The size of @var{y} is equal to the size of @var{x} except for the operating
dimension, which becomes 1.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@code{@var{x}}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{kurtosis} to
operate on all elements of @var{x}, and is equivalent to
@code{kurtosis (@var{x}(:))}.

@seealso{var, skewness, moment}
@end deftypefn
