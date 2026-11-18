# realpow

```octave
function z = realpow (x, y)
```

@deftypefn {} {@var{z} =} realpow (@var{x}, @var{y})
Compute the real-valued, element-by-element power operator.

This is equivalent to @w{@code{@var{x} .^ @var{y}}}, except that
@code{realpow} reports an error if any return value is complex.
@seealso{power, reallog, realsqrt}
@end deftypefn
