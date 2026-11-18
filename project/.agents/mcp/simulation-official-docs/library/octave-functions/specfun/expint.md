# expint

```octave
function E1 = expint (x)
```

@deftypefn {} {@var{y} =} expint (@var{x})
Compute the exponential integral.

The exponential integral is defined as:
@tex
$$
{\rm E_1} (x) = \int_x^\infty {e^{-t} \over t} dt
$$
@end tex
@ifnottex

@example
@group
           +oo
          /
          | exp (-t)
E_1 (x) = | -------- dt
          |    t
          /
         x
@end group
@end example

@end ifnottex

Note: For compatibility, this function uses the @sc{matlab} definition
of the exponential integral.  Most other sources refer to this particular
value as @math{E_1 (x)}, and the exponential integral as
@tex
$$
{\rm Ei} (x) = - \int_{-x}^\infty {e^{-t} \over t} dt.
$$
@end tex
@ifnottex

@example
@group
            +oo
           /
           | exp (-t)
Ei (x) = - | -------- dt
           |    t
           /
         -x
@end group
@end example

@end ifnottex
The two definitions are related, for positive real values of @var{x}, by
@tex
$
E_1 (-x) = -{\rm Ei} (x) - i\pi.
$
@end tex
@ifnottex
@w{@code{E_1 (-x) = -Ei (x) - i*pi}}.
@end ifnottex

References:

@nospell{M. Abramowitz and I.A. Stegun},
@cite{Handbook of Mathematical Functions}, 1964.

@nospell{N. Bleistein and R.A. Handelsman},
@cite{Asymptotic expansions of integrals}, 1986.

@seealso{cosint, sinint, exp}
@end deftypefn
