# sinint

```octave
function y = sinint (x)
```

@deftypefn {} {@var{y} =} sinint (@var{x})
Compute the sine integral function:
@tex
$$
{\rm Si} (x) = \int_0^x {\sin (t) \over t} dt
$$
@end tex
@ifnottex

@example
@group
           x
          /
Si (x) =  | sin (t) / t dt
          /
         0
@end group
@end example

@end ifnottex

Reference:
@nospell{M. Abramowitz and I.A. Stegun},
@cite{Handbook of Mathematical Functions}, 1964.

@seealso{cosint, expint, sin}
@end deftypefn
