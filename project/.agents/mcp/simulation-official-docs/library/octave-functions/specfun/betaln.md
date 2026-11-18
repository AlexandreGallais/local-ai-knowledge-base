# betaln

```octave
function lnb = betaln (a, b)
```

@deftypefn {} {@var{lnb} =} betaln (@var{a}, @var{b})
Compute the natural logarithm of the Beta function for real inputs @var{a}
and @var{b}.

@code{betaln} is defined as
@tex
$$
 {\rm betaln} (a, b) = \ln (B (a,b)) \equiv \ln ({\Gamma (a) \Gamma (b) \over \Gamma (a + b)}).
$$
@end tex
@ifnottex

@example
betaln (a, b) = log (beta (a, b))
@end example

@end ifnottex
and is calculated in a way to reduce the occurrence of underflow.

The Beta function can grow quite large and it is often more useful to work
with the logarithm of the output rather than the function directly.
@seealso{beta, betainc, betaincinv, gammaln}
@end deftypefn
