# betainc

```octave
function I = betainc (x, a, b, tail = "lower")
```

@deftypefn  {} {@var{I} =} betainc (@var{x}, @var{a}, @var{b})
@deftypefnx {} {@var{I} =} betainc (@var{x}, @var{a}, @var{b}, @var{tail})
Compute the incomplete beta function.

This is defined as
@tex
$$
I_x (a, b) = {1 \over {B(a,b)}} \displaystyle{\int_0^x t^{a-1} (1-t)^{b-1} dt}
$$
@end tex
@ifnottex

@example
@group
                          x
                         /
                 1       |
I_x (a, b) = ----------  | t^(a-1) (1-t)^(b-1) dt
             beta (a,b)  |
                         /
                        0
@end group
@end example

@end ifnottex

with real @var{x} in the range [0,1].  The inputs @var{a} and @var{b} must
be real and strictly positive (> 0).  If one of the inputs is not a scalar
then the other inputs must be scalar or of compatible dimensions.

By default, @var{tail} is @qcode{"lower"} and the incomplete beta function
integrated from 0 to @var{x} is computed.  If @var{tail} is @qcode{"upper"}
then the complementary function integrated from @var{x} to 1 is calculated.
The two choices are related by

betainc (@var{x}, @var{a}, @var{b}, @qcode{"upper"}) =
1 - betainc (@var{x}, @var{a}, @var{b}, @qcode{"lower"}).

@code{betainc} uses a more sophisticated algorithm than subtraction to
get numerically accurate results when the @qcode{"lower"} value is small.

Reference: @nospell{A. Cuyt, V. Brevik Petersen, B. Verdonk, H. Waadeland,
W.B. Jones}, @cite{Handbook of Continued Fractions for Special Functions},
@w{ch.@: 18}.

@seealso{beta, betaincinv, betaln}
@end deftypefn
