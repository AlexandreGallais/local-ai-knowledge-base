# skewness

```octave
function y = skewness (x, flag, dim)
```

@deftypefn  {} {@var{y} =} skewness (@var{x})
@deftypefnx {} {@var{y} =} skewness (@var{x}, @var{flag})
@deftypefnx {} {@var{y} =} skewness (@var{x}, @var{flag}, @var{dim})
@deftypefnx {} {@var{y} =} skewness (@var{x}, @var{flag}, @var{vecdim})
@deftypefnx {} {@var{y} =} skewness (@var{x}, @var{flag}, "all")
Compute the sample skewness of the input data @var{x}.

The sample skewness is defined as
@tex
$$
{\rm skewness} (@var{x}) = {{{1\over N}\,
         \sum_{i=1}^N (x_i - \bar{x})^3} \over \sigma^3},
$$
where $N$ is the length of @var{x}, $\bar{x}$ its mean and $\sigma$
its (uncorrected) standard deviation.
@end tex
@ifnottex

@example
@group
               mean ((@var{x} - mean (@var{x})).^3)
skewness (@var{X}) = ------------------------.
                      std (@var{x}).^3
@end group
@end example

@end ifnottex

@noindent
The optional argument @var{flag} controls which normalization is used.
If @var{flag} is equal to 1 (default value, used when @var{flag} is omitted
or empty), return the sample skewness as defined above.  If @var{flag} is
equal to 0, return the adjusted skewness coefficient instead:
@tex
$$
{\rm skewness} (@var{x}) = {\sqrt{N (N - 1)} \over N - 2} \times \,
  {{{1 \over N} \sum_{i=1}^N (x_i - \bar{x})^3} \over \sigma^3}
$$
@end tex
@ifnottex

@example
@group
                  sqrt (N*(N-1))   mean ((@var{x} - mean (@var{x})).^3)
skewness (@var{X}, 0) = -------------- * ------------------------.
                      (N - 2)             std (@var{x}).^3
@end group
@end example

@noindent
where @math{N} is the length of the @var{x} vector.

@end ifnottex
The adjusted skewness coefficient is obtained by replacing the sample second
and third central moments by their bias-corrected versions.

If @var{x} is a vector, then @code{skewness (@var{x})} computes the skewness
of the data in @var{x}.

If @var{x} is a matrix, then @code{skewness (@var{x})} returns a row vector
with each element containing the skewness of the data of the corresponding
column in @var{x}.

If @var{x} is an array, then @code{skewness (@var{x})} computes the skewness
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

Specifying the dimension as @qcode{"all"} will cause @code{skewness} to
operate on all elements of @var{x}, and is equivalent to
@code{skewness (@var{x}(:))}.
@seealso{var, kurtosis, moment}
@end deftypefn
