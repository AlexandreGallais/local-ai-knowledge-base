# gammainc

```octave
function y = gammainc (x, a, tail = "lower")
```

@deftypefn  {} {@var{y} =} gammainc (@var{x}, @var{a})
@deftypefnx {} {@var{y} =} gammainc (@var{x}, @var{a}, @var{tail})
Compute the normalized incomplete gamma function.

This is defined as
@tex
$$
 \gamma (x, a) = {1 \over {\Gamma (a)}}\displaystyle{\int_0^x t^{a-1} e^{-t} dt}
$$
@end tex
@ifnottex

@example
@group
                                x
                       1       /
gammainc (x, a) = ---------    | exp (-t) t^(a-1) dt
                  gamma (a)    /
                            t=0
@end group
@end example

@end ifnottex
with the limiting value of 1 as @var{x} approaches infinity.
The standard notation is @math{P(a,x)}, e.g., @nospell{Abramowitz} and
@nospell{Stegun} (6.5.1).

If @var{a} is scalar, then @code{gammainc (@var{x}, @var{a})} is returned
for each element of @var{x} and vice versa.

If neither @var{x} nor @var{a} is scalar then the sizes of @var{x} and
@var{a} must agree, and @code{gammainc} is applied element-by-element.
The elements of @var{a} must be non-negative.

By default, @var{tail} is @qcode{"lower"} and the incomplete gamma function
integrated from 0 to @var{x} is computed.  If @var{tail} is @qcode{"upper"}
then the complementary function integrated from @var{x} to infinity is
calculated.

If @var{tail} is @qcode{"scaledlower"}, then the lower incomplete gamma
function is multiplied by
@tex
$\Gamma(a+1)\exp(x)x^{-a}$.
@end tex
@ifnottex
@math{gamma(a+1)*exp(x)/(x^a)}.
@end ifnottex
If @var{tail} is @qcode{"scaledupper"}, then the upper incomplete gamma
function is multiplied by the same quantity.

References:

@nospell{M. Abramowitz and I.A. Stegun},
@cite{Handbook of mathematical functions},
@nospell{Dover publications, Inc.}, 1972.

@nospell{W. Gautschi},
"A computational procedure for incomplete gamma functions",
@cite{@nospell{ACM Trans.@: Math Software}}, @w{Vol.@: 5}, @w{No.@: 4},
@w{pp.@: 466}--481, 2012.

@nospell{W. H. Press, S. A. Teukolsky, W. T. Vetterling, and B. P. Flannery},
@cite{Numerical Recipes in Fortran 77}, @w{Vol.@: 1}, @w{ch.@: 6.2}, 1992.

@seealso{gamma, gammaincinv, gammaln}
@end deftypefn
