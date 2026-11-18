# gammaincinv

```octave
function x = gammaincinv (y, a, tail = "lower")
```

@deftypefn  {} {@var{x} =} gammaincinv (@var{y}, @var{a})
@deftypefnx {} {@var{x} =} gammaincinv (@var{y}, @var{a}, @var{tail})
Compute the inverse of the normalized incomplete gamma function.

The normalized incomplete gamma function is defined as
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

and @code{gammaincinv (gammainc (@var{x}, @var{a}), @var{a}) = @var{x}}
for each non-negative value of @var{x}.  If @var{a} is scalar then
@code{gammaincinv (@var{y}, @var{a})} is returned for each element of
@var{y} and vice versa.

If neither @var{y} nor @var{a} is scalar then the sizes of @var{y} and
@var{a} must agree, and @code{gammaincinv} is applied element-by-element.
The variable @var{y} must be in the interval @math{[0,1]} while @var{a} must
be real and positive.

By default, @var{tail} is @qcode{"lower"} and the inverse of the incomplete
gamma function integrated from 0 to @var{x} is computed.  If @var{tail} is
@qcode{"upper"}, then the complementary function integrated from @var{x} to
infinity is inverted.

The function is computed with Newton's method by solving
@tex
$$
 y - \gamma (x, a) = 0
$$
@end tex
@ifnottex

@example
@var{y} - gammainc (@var{x}, @var{a}) = 0
@end example

@end ifnottex

Reference: @nospell{A. Gil, J. Segura, and N. M. Temme}, "Efficient and
accurate algorithms for the computation and inversion of the incomplete
gamma function ratios", @cite{@nospell{SIAM J. Sci.@: Computing}},
@w{Vol.@: 34}, @w{pp.@: A2965}--A2981, 2012.

@seealso{gammainc, gamma, gammaln}
@end deftypefn
