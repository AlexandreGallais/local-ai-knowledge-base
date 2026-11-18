# betaincinv

```octave
function x = betaincinv (y, a, b, tail = "lower")
```

@deftypefn  {} {@var{x} =} betaincinv (@var{y}, @var{a}, @var{b})
@deftypefnx {} {@var{x} =} betaincinv (@var{y}, @var{a}, @var{b}, "lower")
@deftypefnx {} {@var{x} =} betaincinv (@var{y}, @var{a}, @var{b}, "upper")
Compute the inverse of the normalized incomplete beta function.

The normalized incomplete beta function is defined as
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

If two inputs are scalar, then @code{betaincinv (@var{y}, @var{a}, @var{b})}
is returned for each of the other inputs.

If two or more inputs are not scalar, the sizes of them must agree, and
@code{betaincinv} is applied element-by-element.

The variable @var{y} must be in the interval [0,1], while @var{a} and
@var{b} must be real and strictly positive.

By default, @var{tail} is @qcode{"lower"} and the inverse of the incomplete
beta function integrated from 0 to @var{x} is computed.  If @var{tail} is
@qcode{"upper"} then the complementary function integrated from @var{x} to 1
is inverted.

The function is computed by standard Newton's method, by solving
@tex
$$
 y - I_x (a, b) = 0
$$
@end tex
@ifnottex

@example
@var{y} - betainc (@var{x}, @var{a}, @var{b}) = 0
@end example

@end ifnottex

@seealso{betainc, beta, betaln}
@end deftypefn
