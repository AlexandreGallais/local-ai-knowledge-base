# cosint

```octave
function y = cosint (x)
```

@deftypefn {} {@var{y} =} cosint (@var{x})
Compute the cosine integral function:
@tex
$$
{\rm Ci} (x) = - \int_x^\infty {{\cos (t)} \over t} dt
$$
@end tex
@ifnottex

@example
@group
            +oo
           /
Ci (x) = - | (cos (t)) / t dt
           /
          x
@end group
@end example

@end ifnottex
An equivalent definition is
@tex
$$
{\rm Ci} (x) = \gamma + \log (x) + \int_0^x {{\cos (t) - 1} \over t} dt
$$
@end tex
@ifnottex

@example
@group
                             x
                            /
                            |  cos (t) - 1
Ci (x) = gamma + log (x) +  | -------------  dt
                            |        t
                            /
                           0
@end group
@end example

@end ifnottex
Reference:

@nospell{M. Abramowitz and I.A. Stegun},
@cite{Handbook of Mathematical Functions}, 1964.

@seealso{sinint, expint, cos}

@end deftypefn
