# nextpow2

```octave
function n = nextpow2 (x)
```

@deftypefn {} {@var{n} =} nextpow2 (@var{x})
Compute the exponent of the next power of two not smaller than the input.

For each element in the input array @var{x}, return the smallest integer
@var{n} such that
@tex
$2^n \ge |x|$.
@end tex
@ifnottex
@code{2^@var{n} @geq{} abs (@var{x})}.
@end ifnottex
For input elements equal to zero, return zero.

@seealso{pow2, log2}
@end deftypefn
