# roots

```octave
function r = roots (c)
```

@deftypefn {} {@var{r} =} roots (@var{c})

Compute the roots of the polynomial @var{c}.

For a vector @var{c} with @math{N} components, return the roots of the
polynomial
@tex
$$
c_1 x^{N-1} + \cdots + c_{N-1} x + c_N.
$$
@end tex
@ifnottex

@example
c(1) * x^(N-1) + @dots{} + c(N-1) * x + c(N)
@end example

@end ifnottex

As an example, the following code finds the roots of the quadratic
polynomial
@tex
$$ p(x) = x^2 - 5. $$
@end tex
@ifnottex

@example
p(x) = x^2 - 5.
@end example

@end ifnottex

@example
@group
c = [1, 0, -5];
roots (c)
@xresult{}  2.2361
@xresult{} -2.2361
@end group
@end example

Note that the true result is
@tex
$\pm \sqrt{5}$
@end tex
@ifnottex
@math{+/- sqrt(5)}
@end ifnottex
which is roughly
@tex
$\pm 2.2361$.
@end tex
@ifnottex
@math{+/- 2.2361}.
@end ifnottex
@seealso{poly, compan, fzero}
@end deftypefn
