# beta

```octave
function y = beta (a, b)
```

@deftypefn {} {@var{y} =} beta (@var{a}, @var{b})
Compute the Beta function for real inputs @var{a} and @var{b}.

The Beta function definition is
@tex
$$
 B (a, b) = {\Gamma (a) \Gamma (b) \over \Gamma (a + b)}.
$$
@end tex
@ifnottex

@example
beta (a, b) = gamma (a) * gamma (b) / gamma (a + b).
@end example

@end ifnottex

The Beta function can grow quite large and it is often more useful to work
with the logarithm of the output rather than the function directly.
@xref{XREFbetaln,,betaln}, for computing the logarithm of the Beta
function in an efficient manner.
@seealso{betaln, betainc, betaincinv}
@end deftypefn
