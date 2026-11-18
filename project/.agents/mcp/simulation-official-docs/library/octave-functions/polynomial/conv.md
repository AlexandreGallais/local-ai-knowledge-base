# conv

```octave
function y = conv (a, b, shape = "full")
```

@deftypefn  {} {@var{y} =} conv (@var{a}, @var{b})
@deftypefnx {} {@var{y} =} conv (@var{a}, @var{b}, @var{shape})
Convolve two vectors @var{a} and @var{b}.

When @var{a} and @var{b} are the coefficient vectors of two polynomials, the
convolution represents the coefficient vector of the product polynomial.

The size of the result is determined by the optional @var{shape} argument
which takes the following values

@table @asis
@item @var{shape} = @qcode{"full"}
Return the full convolution.  (default)
The result is a vector with length equal to
@code{length (@var{a}) + length (@var{b}) - 1}.

@item @var{shape} = @qcode{"same"}
Return the central part of the convolution with the same size as @var{a}.

@item @var{shape} = @qcode{"valid"}
Return only the parts which do not include zero-padded edges.
The size of the result is
@code{max (size (@var{a}) - size (@var{b}) + 1, 0)}.
@end table

@seealso{deconv, conv2, convn, fftconv}
@end deftypefn
